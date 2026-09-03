/* ===== Session guidée de 5 / 10 / 15 minutes =========================== */
APP.views.sessione = (function () {
  'use strict';
  var E = APP.util.esc, U = APP.ui, ut = APP.util;
  var S = null, clock = null;

  var PLANS = {
    5:  [{ k: 'cards', n: 6 }, { k: 'qcm', n: 5 }, { k: 'trad', n: 2 }],
    10: [{ k: 'cards', n: 8 }, { k: 'qcm', n: 6 }, { k: 'fill', n: 5 }, { k: 'match', n: 6 }, { k: 'trad', n: 3 }],
    15: [{ k: 'cards', n: 10 }, { k: 'qcm', n: 8 }, { k: 'fill', n: 6 }, { k: 'conj', n: 6 },
         { k: 'match', n: 6 }, { k: 'trad', n: 4 }]
  };

  var LABELS = {
    cards: { t: 'Échauffement — flashcards', ic: '🗂', d: 'Découvrez ou révisez les mots avant de les utiliser.' },
    qcm:   { t: 'Grammaire — choix multiples', ic: '🎯', d: 'Une réponse par question, correction immédiate.' },
    fill:  { t: 'Grammaire — textes à trous', ic: '✍️', d: 'Écrivez la forme exacte.' },
    conj:  { t: 'Conjugaison', ic: '🔤', d: 'Conjuguez à la personne demandée.' },
    match: { t: 'Jeu — appariement', ic: '🧠', d: 'Reliez chaque mot italien à sa traduction.' },
    trad:  { t: 'Production — traduction', ic: '🇮🇹', d: 'Formulez la phrase entière en italien.' }
  };

  /* ---------- sources ---------- */
  function exItems(filterUE, types) {
    var out = [];
    DATA.exercises.forEach(function (g) {
      if (filterUE && g.ue !== filterUE) return;
      g.items.forEach(function (i) {
        if (types.indexOf(i.t) < 0) return;
        out.push(Object.assign({}, i, { _g: g.title, _t: g.topic }));
      });
    });
    return out;
  }

  function vocabItems(filterUE) {
    var out = [];
    DATA.vocab.forEach(function (t) {
      if (filterUE && t.ue !== filterUE) return;
      t.items.forEach(function (i) { out.push({ it: i.it, fr: i.fr, note: i.note, theme: t.title }); });
    });
    return out;
  }

  function build(minutes, ue) {
    var plan = PLANS[minutes].map(function (b) {
      var o = { k: b.k, n: b.n, items: [] };
      if (b.k === 'cards' || b.k === 'match') o.items = ut.sample(vocabItems(ue), b.n);
      else if (b.k === 'qcm') o.items = ut.sample(exItems(ue, ['qcm', 'vf']), b.n);
      else if (b.k === 'fill') o.items = ut.sample(exItems(ue, ['fill']), b.n);
      else if (b.k === 'trad') o.items = ut.sample(exItems(ue, ['trad']), b.n);
      else if (b.k === 'conj') {
        var V = DATA.verbs, tenses = ['presente', 'passato', 'imperfetto', 'futuro'];
        var core = V.all.filter(function (v) {
          return ['essere', 'avere', 'fare', 'andare', 'venire', 'potere', 'dovere', 'volere',
            'parlare', 'finire', 'prendere', 'vedere', 'dire', 'sapere', 'mangiare', 'pagare'].indexOf(v.inf) >= 0;
        });
        for (var i = 0; i < b.n; i++) {
          var v = ut.pick(core), t = ut.pick(tenses), p = Math.floor(Math.random() * 6);
          o.items.push({ inf: v.inf, fr: v.fr, tense: t, person: p, a: v[t][p] });
        }
      }
      return o;
    }).filter(function (b) { return b.items.length; });

    return { minutes: minutes, ue: ue, plan: plan, b: 0, i: 0, score: 0, total: 0,
             review: [], started: Date.now(), flipped: false };
  }

  /* ---------- écran de configuration ---------- */
  function setup() {
    var h = U.pageHead('Apprendre', 'Session guidée ⏱',
      'Un parcours complet et varié : vocabulaire, grammaire, conjugaison, jeu et production écrite. ' +
      'Idéal quand vous ne savez pas par où commencer.');

    h += '<div class="card q-card"><label class="field">Durée</label><div class="row" id="dur">' +
      [5, 10, 15].map(function (m) {
        return '<button class="chip ' + (m === 10 ? 'on' : '') + '" data-m="' + m + '">' + m + ' minutes</button>';
      }).join('') + '</div>' +
      '<label class="field mt">Programme ciblé</label><div class="row" id="ue">' +
        '<button class="chip on" data-u="">Tout le programme</button>' +
        '<button class="chip" data-u="UE1">UE1</button>' +
        '<button class="chip" data-u="UE2">UE2</button>' +
        '<button class="chip" data-u="UE3">UE3</button>' +
      '</div>' +
      '<div class="divider"></div><div id="preview" class="small muted"></div>' +
      '<button class="btn primary block lg mt" id="go">Commencer la session</button></div>';

    h += '<div class="card"><h3>Ce que contient une session de 10 minutes</h3>' +
      '<ul class="small" style="padding-left:18px;line-height:1.9;margin:0">' +
      PLANS[10].map(function (b) {
        return '<li><b>' + LABELS[b.k].ic + ' ' + LABELS[b.k].t + '</b> (' + b.n + ') — ' + LABELS[b.k].d + '</li>';
      }).join('') + '</ul></div>';
    return h;
  }

  /* ---------- barre de progression des étapes ---------- */
  function steps() {
    return '<div class="step-list">' + S.plan.map(function (b, i) {
      return '<div class="step-dot ' + (i < S.b ? 'done' : i === S.b ? 'now' : '') + '" title="' + LABELS[b.k].t + '"></div>';
    }).join('') + '</div>';
  }

  function frame(inner, blockTitle) {
    var el = Math.floor((Date.now() - S.started) / 1000);
    return '<div class="row between" style="margin-bottom:10px">' +
      '<a class="btn ghost sm" href="#/sessione">← Quitter</a>' +
      '<div class="row"><span class="timer-pill">⏱ ' + ut.fmtTime(el) + '</span>' +
      '<span class="chip" id="sc">✅ ' + S.score + ' / ' + S.total + '</span></div></div>' +
      steps() +
      '<div class="card q-card"><div class="small muted">Étape ' + (S.b + 1) + ' / ' + S.plan.length + '</div>' +
      '<h2 style="margin:2px 0 4px">' + blockTitle + '</h2>' + inner + '</div>';
  }

  /* ---------- avancement ---------- */
  function advance(root) {
    S.i++;
    var b = S.plan[S.b];
    if (S.i >= b.items.length) { S.b++; S.i = 0; }
    if (S.b >= S.plan.length) finish(root); else drawBlock(root);
  }

  function record(ok, label, answer, given, why) {
    S.total++; if (ok) S.score++;
    if (!ok) S.review.push({ q: label, a: answer, given: given, why: why });
    var sc = document.getElementById('sc');
    if (sc) sc.textContent = '✅ ' + S.score + ' / ' + S.total;
  }

  function nextBtn(root, last) {
    return '<button class="btn primary block lg mt" id="nx">' + (last ? 'Étape suivante →' : 'Suivant →') + '</button>';
  }

  function bindNext(root) {
    var b = root.querySelector('#nx');
    if (!b) return;
    b.focus();
    b.addEventListener('click', function () { advance(root); });
  }

  function fmtQ(t) {
    return E(t).replace(/___+/g, '<span class="gap"></span>')
               .replace(/\(([^)]+)\)/g, '<span class="muted small">($1)</span>');
  }

  /* ---------- blocs ---------- */
  function drawBlock(root) {
    var b = S.plan[S.b], L = LABELS[b.k], it = b.items[S.i];
    var title = L.ic + ' ' + L.t + ' <span class="muted small">(' + (S.i + 1) + '/' + b.items.length + ')</span>';

    if (b.k === 'cards') {
      S.flipped = false;
      root.innerHTML = frame(
        '<p class="small muted">' + L.d + '</p>' +
        '<div class="fc-stage"><div class="flashcard" id="fc"><div class="fc-inner">' +
          '<div class="fc-face"><span class="fc-lang">italiano</span>' +
            '<div class="fc-audio">' + APP.speech.btn(ut.firstForm(it.it)) + '</div>' +
            '<div class="fc-word">' + E(it.it) + '</div>' +
            '<div class="fc-hint">Cliquez pour voir la traduction</div></div>' +
          '<div class="fc-face back"><span class="fc-lang">français</span>' +
            '<div class="fc-word">' + E(it.fr) + '</div>' +
            (it.note ? '<div class="fc-note">💡 ' + E(it.note) + '</div>' : '') +
            '<div class="fc-note">' + E(it.theme) + '</div></div>' +
        '</div></div>' +
        '<div class="row" id="rate" style="justify-content:center;visibility:hidden">' +
          '<button class="btn danger" data-r="0">↻ À revoir</button>' +
          '<button class="btn primary" data-r="1">✅ Je savais</button></div></div>', title);

      var fc = root.querySelector('#fc'), rate = root.querySelector('#rate');
      APP.speech.say(ut.firstForm(it.it));
      fc.addEventListener('click', function () {
        if (S.flipped) return;
        S.flipped = true; fc.classList.add('flipped'); rate.style.visibility = 'visible';
      });
      rate.querySelectorAll('[data-r]').forEach(function (x) {
        x.addEventListener('click', function () {
          var known = x.getAttribute('data-r') === '1';
          record(known, it.it, it.fr, '', null);
          advance(root);
        });
      });
      return;
    }

    if (b.k === 'match') {
      var pairs = b.items;
      var cards = ut.shuffle(pairs.reduce(function (a, p, i) {
        return a.concat([{ k: i, s: 'it', t: p.it }, { k: i, s: 'fr', t: p.fr }]);
      }, []));
      var sel = null, done = 0;
      root.innerHTML = frame('<p class="small muted">' + L.d + '</p>' +
        '<div class="mem-grid" id="grid">' + cards.map(function (c, i) {
          return '<button class="mem-card ' + (c.s === 'it' ? 'it' : '') + '" data-i="' + i + '">' + E(c.t) + '</button>';
        }).join('') + '</div><div id="fb"></div>', L.ic + ' ' + L.t);

      root.querySelectorAll('.mem-card').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var i = +btn.getAttribute('data-i'), c = cards[i];
          if (btn.classList.contains('done')) return;
          if (sel === null) { sel = i; btn.classList.add('sel'); if (c.s === 'it') APP.speech.say(ut.firstForm(c.t)); return; }
          if (sel === i) { btn.classList.remove('sel'); sel = null; return; }
          var a = cards[sel], prev = root.querySelector('[data-i="' + sel + '"]');
          if (a.k === c.k && a.s !== c.s) {
            prev.classList.add('done'); btn.classList.add('done'); done++;
            record(true, 'Appariement : ' + pairs[a.k].it, pairs[a.k].fr, '', null);
            sel = null;
            if (done === pairs.length) {
              root.querySelector('#fb').innerHTML = '<div class="feedback ok"><b>✅ Toutes les paires trouvées !</b></div>' + nextBtn(root, true);
              S.i = b.items.length - 1;
              bindNext(root);
            }
          } else {
            record(false, 'Appariement : ' + a.t, pairs[a.k] ? (a.s === 'it' ? pairs[a.k].fr : pairs[a.k].it) : '', c.t, null);
            btn.classList.add('bad'); prev.classList.add('bad');
            setTimeout(function () { btn.classList.remove('bad', 'sel'); prev.classList.remove('bad', 'sel'); }, 480);
            sel = null;
          }
        });
      });
      return;
    }

    if (b.k === 'qcm') {
      var isVf = it.t === 'vf';
      var opts = isVf ? ['Vrai', 'Faux'] : it.opts;
      var right = isVf ? (it.a ? 0 : 1) : it.a;
      root.innerHTML = frame('<div class="q-text">' + fmtQ(it.q) + '</div><div class="opts">' +
        opts.map(function (o, i) {
          return '<button class="opt" data-i="' + i + '"><span class="key">' + (i + 1) + '</span>' + E(o) + '</button>';
        }).join('') + '</div><div id="fb"></div>', title);

      root.querySelectorAll('.opt').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var chosen = +btn.getAttribute('data-i'), ok = chosen === right;
          root.querySelectorAll('.opt').forEach(function (x) {
            x.disabled = true;
            if (+x.getAttribute('data-i') === right) x.classList.add('ok');
            else if (+x.getAttribute('data-i') === chosen) x.classList.add('ko');
          });
          record(ok, it.q, opts[right], opts[chosen], it.why);
          root.querySelector('#fb').innerHTML = '<div class="feedback ' + (ok ? 'ok' : 'ko') + '"><b>' +
            (ok ? '✅ Esatto!' : '❌ Réponse : ' + E(opts[right])) + '</b>' +
            (it.why ? '<div class="small">💡 ' + it.why + '</div>' : '') + '</div>' +
            nextBtn(root, S.i + 1 >= b.items.length);
          bindNext(root);
        });
      });
      return;
    }

    if (b.k === 'fill' || b.k === 'trad' || b.k === 'conj') {
      var prompt, expected, alts = null, hint = '';
      if (b.k === 'conj') {
        prompt = '<div class="small muted">' + { presente: 'Présent', passato: 'Passé composé', imperfetto: 'Imparfait', futuro: 'Futur simple' }[it.tense] + '</div>' +
          '<div class="q-text">' + E(it.inf) + ' <span class="muted small">(' + E(it.fr) + ')</span><br>' +
          '<span style="color:var(--verde)">' + E(DATA.verbs.persons[it.person]) + '</span> → <span class="gap"></span></div>';
        expected = it.a;
      } else if (b.k === 'trad') {
        prompt = '<div class="small muted">Traduisez en italien</div><div class="q-text">' + E(it.fr) + '</div>';
        expected = it.a; alts = it.alts;
      } else {
        prompt = '<div class="q-text">' + fmtQ(it.q) + '</div>';
        expected = it.a; alts = it.alts;
      }
      root.innerHTML = frame(prompt +
        '<form class="answer-row" id="f"><input type="text" id="in" autocomplete="off" autocapitalize="off" ' +
        'autocorrect="off" spellcheck="false" placeholder="Votre réponse…"><button class="btn primary" type="submit">Valider</button></form>' +
        '<div class="row mt"><button class="btn ghost sm" id="skip">Passer</button></div><div id="fb"></div>', title);

      var input = root.querySelector('#in'); input.focus();
      function judge(given) {
        var r = ut.check(given, expected, alts);
        record(!!r.ok, b.k === 'trad' ? it.fr : (b.k === 'conj' ? it.inf + ' — ' + DATA.verbs.persons[it.person] : it.q),
               expected, given, it.why);
        root.querySelector('#fb').innerHTML = '<div class="feedback ' + (r.ok ? (r.near ? 'near' : 'ok') : 'ko') + '"><b>' +
          (r.ok ? (r.near ? '✅ Juste — attention aux accents' : '✅ Esatto!') : '❌ Réponse attendue :') + '</b>' +
          '<div style="font-size:1.05em">' + E(expected) + ' ' + APP.speech.btn(ut.firstForm(expected)) + '</div>' +
          (it.why ? '<div class="small mt">💡 ' + it.why + '</div>' : '') + '</div>' +
          nextBtn(root, S.i + 1 >= b.items.length);
        APP.speech.say(ut.firstForm(expected));
        root.querySelector('#f').innerHTML = '';
        bindNext(root);
      }
      root.querySelector('#f').addEventListener('submit', function (e) {
        e.preventDefault(); if (!input.value.trim()) return; judge(input.value);
      });
      root.querySelector('#skip').addEventListener('click', function () { judge(''); });
      return;
    }

    advance(root);
  }

  /* ---------- bilan ---------- */
  function finish(root) {
    var secs = Math.floor((Date.now() - S.started) / 1000);
    APP.store.logSession('sessione', 'Session ' + S.minutes + ' min' + (S.ue ? ' — ' + S.ue : ''), S.score, S.total);
    root.innerHTML = U.pageHead('Session terminée', '🎉 Bilan de votre session',
      'Durée réelle : <b>' + ut.fmtTime(secs) + '</b> · ' + S.plan.length + ' étapes enchaînées.') +
      U.results(S.score, S.total,
        S.review.length ? '<p class="small muted">Les points à revoir :</p>' + S.review.map(function (r) {
          return '<div class="review-item ko"><div>' + fmtQ(r.q) + '</div>' +
            '<div style="margin-top:3px">✅ <b>' + E(r.a) + '</b>' +
            (r.given ? ' <span class="muted xs">· vous : ' + E(r.given) + '</span>' : '') + '</div>' +
            (r.why ? '<div class="xs muted">' + r.why + '</div>' : '') + '</div>';
        }).join('') : '<p class="muted">Parcours sans faute — complimenti ! 🏆</p>',
        '<button class="btn primary" id="again">↻ Nouvelle session</button>' +
        '<a class="btn" href="#/esercizi">✏️ Exercices ciblés</a>' +
        '<a class="btn" href="#/giochi">🎮 Un jeu pour finir</a>' +
        '<a class="btn ghost" href="#/">Accueil</a>');
    root.querySelector('#again').addEventListener('click', function () {
      S = build(S.minutes, S.ue); drawBlock(root);
    });
  }

  /* ---------- cycle de vie ---------- */
  function render() { return setup(); }

  function mount(root) {
    var minutes = 10, ue = '';
    function preview() {
      var p = PLANS[minutes];
      root.querySelector('#preview').innerHTML = 'Au programme : ' +
        p.map(function (b) { return LABELS[b.k].ic + ' ' + b.n + ' ' + LABELS[b.k].t.split('—').pop().trim(); }).join(' · ') +
        (ue ? ' — ciblé <b>' + ue + '</b>' : '');
    }
    root.querySelectorAll('[data-m]').forEach(function (b) {
      b.addEventListener('click', function () {
        root.querySelectorAll('[data-m]').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on'); minutes = +b.getAttribute('data-m'); preview();
      });
    });
    root.querySelectorAll('[data-u]').forEach(function (b) {
      b.addEventListener('click', function () {
        root.querySelectorAll('[data-u]').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on'); ue = b.getAttribute('data-u'); preview();
      });
    });
    preview();
    root.querySelector('#go').addEventListener('click', function () {
      S = build(minutes, ue);
      if (!S.plan.length) { U.toast('Pas assez de contenu pour ce filtre'); return; }
      drawBlock(root);
    });
  }

  function unmount() { S = null; if (clock) { clearInterval(clock); clock = null; } }

  return { title: 'Session', render: render, mount: mount, unmount: unmount };
})();
