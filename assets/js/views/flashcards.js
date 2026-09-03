/* ===== Flashcards ====================================================== */
APP.views.flashcards = (function () {
  'use strict';
  var E = APP.util.esc, U = APP.ui;
  var S = null;   /* session en cours */
  var cfg = { size: 10, dir: 'it-fr', auto: true };

  /* ---------- Construction des piles ---------- */
  function deckFromTheme(t) {
    return t.items.map(function (i) {
      return { a: i.it, b: i.fr, note: i.note, ex: i.ex, sayA: APP.util.firstForm(i.it) };
    });
  }

  function allCards() {
    var out = [];
    DATA.vocab.forEach(function (t) { out = out.concat(deckFromTheme(t)); });
    return out;
  }

  function verbDeck() {
    return DATA.verbs.all.map(function (v) {
      return { a: v.inf, b: v.fr, note: 'participe : ' + v.participio + ' · aux. ' + (v.aux === 'both' ? 'avere/essere' : v.aux),
               sayA: v.inf };
    });
  }

  function ppDeck() {
    return DATA.verbs.all.filter(function (v) {
      var raw = DATA.verbs.raw.filter(function (r) { return r.inf === v.inf; })[0];
      return raw && raw.pp;
    }).map(function (v) {
      return { a: v.inf, b: v.participio, note: 'participe passé irrégulier — ' + v.fr, sayA: v.inf };
    });
  }

  function getDeck(id) {
    if (id === 'tutto') return { title: 'Mélange général', icon: '🎲', ue: '', cards: allCards() };
    if (id === 'verbi') return { title: 'Verbes — infinitif / sens', icon: '🔤', ue: '', cards: verbDeck() };
    if (id === 'participi') return { title: 'Participes passés irréguliers', icon: '🧩', ue: 'UE2', cards: ppDeck() };
    if (/^ue[123]$/.test(id)) {
      var ue = id.toUpperCase(), c = [];
      DATA.vocab.filter(function (t) { return t.ue === ue; }).forEach(function (t) { c = c.concat(deckFromTheme(t)); });
      return { title: 'Tout le vocabulaire ' + ue, icon: '📚', ue: ue, cards: c };
    }
    var t = DATA.vocab.filter(function (x) { return x.id === id; })[0];
    return t ? { title: t.title, icon: t.icon, ue: t.ue, cards: deckFromTheme(t), sub: t.subtitle } : null;
  }

  /* ---------- Écran de choix ---------- */
  function chooser() {
    var h = U.pageHead('Apprendre', 'Flashcards 🗂',
      'Choisissez un thème : l’application tire une petite pile (5 à 20 cartes) au hasard. ' +
      'Retournez la carte, jugez-vous honnêtement, et les cartes ratées reviennent à la fin.');

    h += '<div class="card"><div class="row"><div><label class="field">Taille de la pile</label>' +
      '<div class="row" id="sz">' + U.sizePicker(cfg.size, [5, 10, 15, 20], 'data-n') + '</div></div>' +
      '<div style="margin-left:20px"><label class="field">Sens</label><div class="row" id="dir">' +
        '<button class="chip ' + (cfg.dir === 'it-fr' ? 'on' : '') + '" data-d="it-fr">🇮🇹 → 🇫🇷</button>' +
        '<button class="chip ' + (cfg.dir === 'fr-it' ? 'on' : '') + '" data-d="fr-it">🇫🇷 → 🇮🇹</button>' +
        '<button class="chip ' + (cfg.dir === 'mix' ? 'on' : '') + '" data-d="mix">Alterné</button>' +
      '</div></div></div></div>';

    h += '<h2 class="mt2">Piles rapides</h2><div class="grid c4">' +
      [['tutto', '🎲', 'Mélange général', DATA.vocab.reduce(function (a, t) { return a + t.items.length; }, 0) + ' mots'],
       ['ue1', '1️⃣', 'Vocabulaire UE1', ''], ['ue2', '2️⃣', 'Vocabulaire UE2', ''], ['ue3', '3️⃣', 'Vocabulaire UE3', ''],
       ['verbi', '🔤', 'Verbes', DATA.verbs.all.length + ' verbes'],
       ['participi', '🧩', 'Participes irréguliers', '']
      ].map(function (d) {
        var deck = getDeck(d[0]);
        return '<a class="tile" href="#/flashcards/' + d[0] + '"><div class="ic">' + d[1] + '</div>' +
          '<h3>' + d[2] + '</h3><div class="meta">' + (d[3] || deck.cards.length + ' cartes') + '</div></a>';
      }).join('') + '</div>';

    ['UE1', 'UE2', 'UE3'].forEach(function (ue) {
      var set = DATA.vocab.filter(function (t) { return t.ue === ue; });
      if (!set.length) return;
      h += '<h2 class="mt2">' + U.ueTag(ue) + ' Thèmes</h2><div class="grid c3">' +
        set.map(function (t) {
          return '<a class="tile" href="#/flashcards/' + t.id + '"><div class="ic">' + t.icon + '</div>' +
            '<h3>' + E(t.title) + '</h3><p>' + E(t.subtitle) + '</p>' +
            '<div class="meta">' + t.items.length + ' mots</div></a>';
        }).join('') + '</div>';
    });
    return h;
  }

  /* ---------- Session ---------- */
  function start(deckId) {
    var d = getDeck(deckId);
    if (!d) return null;
    var cards = APP.util.sample(d.cards, Math.min(cfg.size, d.cards.length));
    return { deck: d, id: deckId, cards: cards, i: 0, known: 0, again: [], flipped: false, round: 1 };
  }

  function faceOf(card, i) {
    var dir = cfg.dir === 'mix' ? (i % 2 ? 'fr-it' : 'it-fr') : cfg.dir;
    return dir === 'it-fr'
      ? { front: card.a, frontLang: 'italiano', back: card.b, backLang: 'français', say: card.sayA || card.a }
      : { front: card.b, frontLang: 'français', back: card.a, backLang: 'italiano', say: card.sayA || card.a };
  }

  function drawCard(root) {
    var c = S.cards[S.i], f = faceOf(c, S.i);
    root.innerHTML =
      '<div class="row between" style="margin-bottom:12px">' +
        '<a class="btn ghost sm" href="#/flashcards">← Changer de pile</a>' +
        '<div class="row"><span class="chip">' + S.deck.icon + ' ' + E(S.deck.title) + '</span>' +
        (S.round > 1 ? '<span class="chip on">Reprise ' + S.round + '</span>' : '') + '</div>' +
      '</div>' +
      '<div class="card">' + U.progressHead(S.i, S.cards.length,
        '<span class="cnt">✅ ' + S.known + ' · ↻ ' + S.again.length + '</span>') +
      '<div class="fc-stage">' +
        '<div class="flashcard" id="fc"><div class="fc-inner">' +
          '<div class="fc-face"><span class="fc-lang">' + f.frontLang + '</span>' +
            '<div class="fc-audio">' + APP.speech.btn(f.say) + '</div>' +
            '<div class="fc-word">' + E(f.front) + '</div>' +
            '<div class="fc-hint">Cliquez ou appuyez sur Espace pour retourner</div></div>' +
          '<div class="fc-face back"><span class="fc-lang">' + f.backLang + '</span>' +
            '<div class="fc-audio">' + APP.speech.btn(f.say) + '</div>' +
            '<div class="fc-word">' + E(f.back) + '</div>' +
            (c.note ? '<div class="fc-note">💡 ' + E(c.note) + '</div>' : '') +
            (c.ex ? '<div class="fc-note it">« ' + E(c.ex) + ' »</div>' : '') +
          '</div>' +
        '</div></div>' +
        '<div class="row" id="rate" style="justify-content:center;visibility:hidden">' +
          '<button class="btn danger" data-r="0">↻ À revoir <span class="xs">(1)</span></button>' +
          '<button class="btn primary" data-r="1">✅ Je savais <span class="xs">(2)</span></button>' +
        '</div>' +
        '<div class="xs muted">Espace : retourner · 1 : à revoir · 2 : je savais</div>' +
      '</div></div>';

    var fc = root.querySelector('#fc'), rate = root.querySelector('#rate');
    function flip() {
      if (S.flipped) return;
      S.flipped = true; fc.classList.add('flipped'); rate.style.visibility = 'visible';
      if (cfg.auto && f.frontLang === 'français') APP.speech.say(f.say);
    }
    fc.addEventListener('click', flip);
    if (cfg.auto && f.frontLang === 'italiano') APP.speech.say(f.say);

    rate.querySelectorAll('[data-r]').forEach(function (b) {
      b.addEventListener('click', function () { answer(root, b.getAttribute('data-r') === '1'); });
    });
    root._flip = flip;
  }

  function answer(root, known) {
    if (!S.flipped) return;
    if (known) S.known++; else S.again.push(S.cards[S.i]);
    S.i++; S.flipped = false;
    if (S.i >= S.cards.length) finish(root); else drawCard(root);
  }

  function finish(root) {
    var total = S.cards.length;
    APP.store.logSession('flashcards', 'Flashcards — ' + S.deck.title, S.known, total);
    var again = S.again;
    root.innerHTML = U.pageHead('Flashcards', S.deck.icon + ' ' + E(S.deck.title), '') +
      U.results(S.known, total,
        again.length ? '<p class="small muted">' + APP.util.plural(again.length, 'carte') + ' à revoir :</p>' +
          again.map(function (c) {
            return '<div class="review-item ko"><b>' + E(c.a) + '</b> — ' + E(c.b) + '</div>';
          }).join('')
        : '<p class="muted">Toutes les cartes sont acquises ! 🎉</p>',
        (again.length ? '<button class="btn primary" id="redo">↻ Revoir les ' + again.length + ' cartes ratées</button>' : '') +
        '<button class="btn" id="newpile">🎲 Nouvelle pile du même thème</button>' +
        '<a class="btn" href="#/esercizi">✏️ Passer aux exercices</a>' +
        '<a class="btn ghost" href="#/flashcards">Changer de thème</a>');

    var r = root.querySelector('#redo');
    if (r) r.addEventListener('click', function () {
      S = { deck: S.deck, id: S.id, cards: APP.util.shuffle(again), i: 0, known: 0, again: [], flipped: false, round: S.round + 1 };
      drawCard(root);
    });
    root.querySelector('#newpile').addEventListener('click', function () {
      S = start(S.id); drawCard(root);
    });
  }

  /* ---------- Cycle de vie ---------- */
  function render(p) { return p[0] ? '<div id="fcroot"></div>' : chooser(); }

  function keyHandler(e) {
    if (!S) return;
    var root = document.getElementById('main');
    if (e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); if (root._flip) root._flip(); }
    else if (e.key === '1') answer(root, false);
    else if (e.key === '2') answer(root, true);
  }

  function mount(root, p) {
    if (!p[0]) {
      root.querySelectorAll('[data-n]').forEach(function (b) {
        b.addEventListener('click', function () {
          root.querySelectorAll('[data-n]').forEach(function (x) { x.classList.remove('on'); });
          b.classList.add('on'); cfg.size = +b.getAttribute('data-n');
        });
      });
      root.querySelectorAll('[data-d]').forEach(function (b) {
        b.addEventListener('click', function () {
          root.querySelectorAll('[data-d]').forEach(function (x) { x.classList.remove('on'); });
          b.classList.add('on'); cfg.dir = b.getAttribute('data-d');
        });
      });
      return;
    }
    S = start(p[0]);
    if (!S) { root.innerHTML = U.empty('Pile introuvable.'); return; }
    drawCard(root);
    document.addEventListener('keydown', keyHandler);
  }

  function unmount() { S = null; document.removeEventListener('keydown', keyHandler); }

  return { title: 'Flashcards', render: render, mount: mount, unmount: unmount };
})();
