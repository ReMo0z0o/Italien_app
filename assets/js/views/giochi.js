/* ===== Jeux ============================================================ */
APP.views.giochi = (function () {
  'use strict';
  var E = APP.util.esc, U = APP.ui, ut = APP.util;
  var G = null, tick = null;

  /* ---------- sources communes ---------- */
  function vocabPool(ue) {
    var out = [];
    DATA.vocab.forEach(function (t) {
      if (ue && t.ue !== ue) return;
      t.items.forEach(function (i) { out.push({ it: i.it, fr: i.fr, theme: t.title, tid: t.id, note: i.note }); });
    });
    return out;
  }

  function sentencePool() {
    var out = [];
    DATA.exercises.forEach(function (g) {
      g.items.forEach(function (i) { if (i.t === 'trad') out.push({ it: i.a, fr: i.fr }); });
    });
    DATA.dialogues.forEach(function (d) {
      d.lines.forEach(function (l) { out.push({ it: l.it, fr: l.fr }); });
    });
    DATA.grammar.forEach(function (g) {
      (g.blocks || []).forEach(function (b) {
        if (b.t === 'ex') b.items.forEach(function (x) { out.push({ it: x.it, fr: x.fr }); });
      });
    });
    return out.filter(function (s) {
      var w = s.it.split(/\s+/).length;
      return w >= 4 && w <= 9;
    });
  }

  var GAMES = [
    { id: 'abbinamento', ic: '🧠', t: 'Abbinamento', d: 'Reliez chaque mot italien à sa traduction. Six paires, le plus vite possible.' },
    { id: 'cronometro', ic: '⚡', t: 'Contro il tempo', d: '60 secondes pour enchaîner un maximum de traductions justes.' },
    { id: 'impiccato', ic: '🔤', t: 'L’impiccato', d: 'Devinez le mot italien lettre par lettre, à partir de sa traduction.' },
    { id: 'intruso', ic: '🕵️', t: 'L’intruso', d: 'Un mot ne fait pas partie du thème : trouvez-le.' },
    { id: 'ordine', ic: '🧩', t: 'Rimetti in ordine', d: 'Remettez les mots dans le bon ordre pour reconstruire la phrase.' },
    { id: 'duello', ic: '⚔️', t: 'Duello di coniugazione', d: 'Conjugaison éclair : 90 secondes, un maximum de formes justes.' }
  ];

  function menu() {
    var h = U.pageHead('Apprendre', 'Jeux 🎮',
      'Six façons de réviser sans avoir l’impression de réviser. Chaque partie dure 2 à 5 minutes.');
    h += '<div class="grid c3">' + GAMES.map(function (g) {
      return '<a class="tile" href="#/giochi/' + g.id + '"><div class="ic">' + g.ic + '</div>' +
        '<h3>' + E(g.t) + '</h3><p>' + E(g.d) + '</p><div class="meta">Jouer →</div></a>';
    }).join('') + '</div>';
    h += '<div class="card mt2"><h3>💡 Conseil</h3><p class="small mb0">Les jeux tirent leurs mots dans tout le lexique du programme. ' +
      'Pour cibler un thème précis, commencez par les <a href="#/flashcards">flashcards</a> du thème, ' +
      'puis revenez jouer : les mots vous sembleront déjà familiers.</p></div>';
    return h;
  }

  function head(g, right) {
    return '<div class="row between" style="margin-bottom:12px">' +
      '<a class="btn ghost sm" href="#/giochi">← Tous les jeux</a>' +
      '<div class="row">' + (right || '') + '</div></div>' +
      '<h1 style="margin-bottom:14px">' + g.ic + ' ' + E(g.t) + '</h1>';
  }

  function stopTick() { if (tick) { clearInterval(tick); tick = null; } }

  /* ================= 1. ABBINAMENTO ================= */
  function abbinamento(root) {
    var g = GAMES[0];
    function newRound(pairsDone, t0) {
      var pool = ut.sample(vocabPool(), 6);
      var cards = [];
      pool.forEach(function (p, i) {
        cards.push({ k: i, side: 'it', txt: p.it });
        cards.push({ k: i, side: 'fr', txt: p.fr });
      });
      cards = ut.shuffle(cards);
      var sel = null, done = 0, errors = 0;

      root.innerHTML = head(g, '<span class="timer-pill" id="tm">⏱ 0:00</span>' +
        '<span class="chip">Manche ' + (pairsDone + 1) + '</span>') +
        '<div class="card"><p class="small muted">Cliquez sur un mot italien puis sur sa traduction.</p>' +
        '<div class="mem-grid" id="grid">' + cards.map(function (c, i) {
          return '<button class="mem-card ' + (c.side === 'it' ? 'it' : '') + '" data-i="' + i + '">' + E(c.txt) + '</button>';
        }).join('') + '</div>' +
        '<div class="row mt"><span class="muted small" id="info">0 / 6 paires</span></div></div>';

      var start = t0 || Date.now();
      stopTick();
      tick = setInterval(function () {
        var el = root.querySelector('#tm');
        if (!el) return stopTick();
        el.textContent = '⏱ ' + ut.fmtTime(Math.floor((Date.now() - start) / 1000));
      }, 500);

      root.querySelectorAll('.mem-card').forEach(function (b) {
        b.addEventListener('click', function () {
          var i = +b.getAttribute('data-i'), c = cards[i];
          if (b.classList.contains('done')) return;
          if (sel === null) {
            if (c.side !== 'it') { APP.ui.toast('Commencez par un mot italien'); return; }
            sel = i; b.classList.add('sel');
            APP.speech.say(ut.firstForm(c.txt));
            return;
          }
          if (sel === i) { b.classList.remove('sel'); sel = null; return; }
          var a = cards[sel];
          if (c.side === 'it') {
            root.querySelector('[data-i="' + sel + '"]').classList.remove('sel');
            sel = i; b.classList.add('sel'); return;
          }
          if (a.k === c.k) {
            root.querySelector('[data-i="' + sel + '"]').classList.add('done');
            b.classList.add('done'); done++;
            root.querySelector('#info').textContent = done + ' / 6 paires';
            sel = null;
            if (done === 6) {
              stopTick();
              var secs = Math.floor((Date.now() - start) / 1000);
              APP.store.logSession('gioco', 'Abbinamento', 6, 6 + errors);
              root.querySelector('#info').innerHTML =
                '<b>Terminé en ' + ut.fmtTime(secs) + '</b> · ' + errors + ' erreur(s)';
              var row = document.createElement('div');
              row.className = 'row mt';
              row.innerHTML = '<button class="btn primary" id="next">↻ Nouvelle manche</button>' +
                '<a class="btn" href="#/giochi">Autres jeux</a>';
              root.querySelector('.card').appendChild(row);
              root.querySelector('#next').addEventListener('click', function () { newRound(pairsDone + 1, null); });
            }
          } else {
            errors++;
            b.classList.add('bad');
            var prev = root.querySelector('[data-i="' + sel + '"]');
            prev.classList.add('bad');
            setTimeout(function () { b.classList.remove('bad', 'sel'); prev.classList.remove('bad', 'sel'); }, 500);
            sel = null;
          }
        });
      });
    }
    newRound(0, null);
  }

  /* ================= 2. CONTRO IL TEMPO ================= */
  function cronometro(root) {
    var g = GAMES[1];
    var pool = vocabPool();
    var score = 0, asked = 0, left = 60, best = [];

    function question() {
      var right = ut.pick(pool);
      var wrong = ut.sample(pool.filter(function (p) { return p.fr !== right.fr; }), 3);
      var opts = ut.shuffle([right].concat(wrong));
      root.querySelector('#play').innerHTML =
        '<div class="q-text center">' + E(right.it) + ' ' + APP.speech.btn(ut.firstForm(right.it)) + '</div>' +
        '<div class="opts">' + opts.map(function (o, i) {
          return '<button class="opt" data-ok="' + (o.fr === right.fr ? 1 : 0) + '"><span class="key">' + (i + 1) + '</span>' + E(o.fr) + '</button>';
        }).join('') + '</div>';
      root.querySelectorAll('.opt').forEach(function (b) {
        b.addEventListener('click', function () {
          asked++;
          if (b.getAttribute('data-ok') === '1') { score++; b.classList.add('ok'); }
          else {
            b.classList.add('ko');
            best.push({ it: right.it, fr: right.fr });
            root.querySelectorAll('.opt').forEach(function (x) { if (x.getAttribute('data-ok') === '1') x.classList.add('ok'); });
          }
          root.querySelector('#sc').textContent = score;
          setTimeout(function () { if (left > 0) question(); }, 320);
        });
      });
    }

    root.innerHTML = head(g, '<span class="timer-pill" id="tm">⏱ 1:00</span>' +
      '<span class="chip">Score : <b id="sc">0</b></span>') +
      '<div class="card q-card"><div id="play"></div></div>';

    question();
    stopTick();
    tick = setInterval(function () {
      left--;
      var t = root.querySelector('#tm');
      if (!t) return stopTick();
      t.textContent = '⏱ ' + ut.fmtTime(Math.max(0, left));
      t.classList.toggle('warn', left <= 10);
      if (left <= 0) {
        stopTick();
        APP.store.logSession('gioco', 'Contro il tempo', score, asked);
        root.innerHTML = head(g) + U.results(score, asked || 1,
          best.length ? '<p class="small muted">Mots ratés :</p>' + best.slice(0, 12).map(function (b) {
            return '<div class="review-item ko"><b>' + E(b.it) + '</b> — ' + E(b.fr) + '</div>';
          }).join('') : '<p class="muted">Aucune erreur ! 🏆</p>',
          '<button class="btn primary" id="again">↻ Rejouer</button><a class="btn" href="#/giochi">Autres jeux</a>');
        root.querySelector('#again').addEventListener('click', function () { cronometro(root); });
      }
    }, 1000);
  }

  /* ================= 3. IMPICCATO ================= */
  function impiccato(root) {
    var g = GAMES[2];
    var pool = vocabPool().filter(function (p) {
      var w = ut.stripArticle(ut.firstForm(p.it));
      return /^[a-zàèéìòùA-Z]{4,12}$/.test(w) && w.indexOf(' ') < 0;
    });

    function newWord() {
      var p = ut.pick(pool);
      var word = ut.stripArticle(ut.firstForm(p.it)).toLowerCase();
      var plain = word.normalize('NFD').replace(/[̀-ͯ]/g, '');
      var found = {}, lives = 7;

      function draw() {
        var shown = word.split('').map(function (ch, i) {
          return found[plain[i]] ? ch : '_';
        }).join(' ');
        var win = word.split('').every(function (ch, i) { return found[plain[i]]; });
        root.innerHTML = head(g, '<span class="chip">' + E(p.theme) + '</span>') +
          '<div class="card"><p class="small muted">Indice : <b>' + E(p.fr) + '</b>' +
          (p.note ? ' · ' + E(p.note) : '') + '</p>' +
          '<div class="hangman"><div style="flex:1;min-width:240px">' +
            '<div class="hm-word">' + shown + '</div>' +
            '<div class="hm-lives mt">' + '❤️'.repeat(Math.max(0, lives)) + '🖤'.repeat(Math.max(0, 7 - lives)) + '</div>' +
          '</div>' +
          '<div class="hm-keys">' + 'abcdefghijklmnopqrstuvwxyz'.split('').map(function (l) {
            var used = found[l] !== undefined;
            var cls = used ? (found[l] ? 'used-ok' : 'used-ko') : '';
            return '<button class="hm-key ' + cls + '" data-l="' + l + '"' + (used ? ' disabled' : '') + '>' + l + '</button>';
          }).join('') + '</div></div>';

        if (win || lives <= 0) {
          stopTick();
          APP.store.logSession('gioco', 'L’impiccato', win ? 1 : 0, 1);
          var res = '<div class="feedback ' + (win ? 'ok' : 'ko') + '"><b>' +
            (win ? '🎉 Bravo !' : '💀 Perdu — le mot était :') + '</b>' +
            '<div style="font-size:1.3em">' + E(p.it) + ' ' + APP.speech.btn(ut.firstForm(p.it)) + '</div>' +
            '<div class="muted">' + E(p.fr) + '</div></div>' +
            '<div class="row mt"><button class="btn primary" id="next">↻ Un autre mot</button>' +
            '<a class="btn" href="#/giochi">Autres jeux</a></div>';
          root.querySelector('.card').insertAdjacentHTML('beforeend', res);
          APP.speech.say(ut.firstForm(p.it));
          root.querySelector('#next').addEventListener('click', newWord);
          return;
        }

        root.querySelectorAll('.hm-key').forEach(function (b) {
          b.addEventListener('click', function () {
            var l = b.getAttribute('data-l');
            var hit = plain.indexOf(l) >= 0;
            found[l] = hit;
            if (!hit) lives--;
            draw();
          });
        });
      }
      draw();
    }
    newWord();
  }

  /* ================= 4. INTRUSO ================= */
  function intruso(root) {
    var g = GAMES[3];
    var themes = DATA.vocab.filter(function (t) { return t.items.length >= 6; });
    var score = 0, n = 0, total = 8, review = [];

    function question() {
      if (n >= total) {
        APP.store.logSession('gioco', 'L’intruso', score, total);
        root.innerHTML = head(g) + U.results(score, total,
          review.length ? review.map(function (r) {
            return '<div class="review-item ko">Thème « ' + E(r.theme) + ' » → l’intrus était <b>' + E(r.it) + '</b> (' + E(r.fr) + ')</div>';
          }).join('') : '<p class="muted">Sans faute ! 🕵️</p>',
          '<button class="btn primary" id="again">↻ Rejouer</button><a class="btn" href="#/giochi">Autres jeux</a>');
        root.querySelector('#again').addEventListener('click', function () { intruso(root); });
        return;
      }
      var t = ut.pick(themes);
      var others = DATA.vocab.filter(function (x) { return x.id !== t.id; });
      var intr = ut.pick(ut.pick(others).items);
      var good = ut.sample(t.items, 3);
      var opts = ut.shuffle(good.map(function (i) { return { it: i.it, fr: i.fr, bad: false }; })
        .concat([{ it: intr.it, fr: intr.fr, bad: true }]));

      root.innerHTML = head(g, '<span class="chip">' + (n + 1) + ' / ' + total + '</span>' +
        '<span class="chip">✅ ' + score + '</span>') +
        '<div class="card q-card"><div class="small muted">Thème</div>' +
        '<div class="q-text">' + t.icon + ' ' + E(t.title) + '</div>' +
        '<p class="small muted">Quel mot n’appartient pas à ce thème ?</p>' +
        '<div class="opts">' + opts.map(function (o, i) {
          return '<button class="opt" data-b="' + (o.bad ? 1 : 0) + '"><span class="key">' + (i + 1) + '</span>' +
            '<span><b>' + E(o.it) + '</b> <span class="muted small">— ' + E(o.fr) + '</span></span></button>';
        }).join('') + '</div><div id="fb"></div></div>';

      root.querySelectorAll('.opt').forEach(function (b) {
        b.addEventListener('click', function () {
          var ok = b.getAttribute('data-b') === '1';
          root.querySelectorAll('.opt').forEach(function (x) {
            x.disabled = true;
            if (x.getAttribute('data-b') === '1') x.classList.add('ok');
          });
          if (ok) score++; else { b.classList.add('ko'); review.push({ theme: t.title, it: intr.it, fr: intr.fr }); }
          n++;
          root.querySelector('#fb').innerHTML =
            '<button class="btn primary block lg mt" id="nx">' + (n >= total ? 'Résultat' : 'Suivant →') + '</button>';
          root.querySelector('#nx').addEventListener('click', question);
        });
      });
    }
    question();
  }

  /* ================= 5. RIMETTI IN ORDINE ================= */
  function ordine(root) {
    var g = GAMES[4];
    var pool = sentencePool();
    var score = 0, n = 0, total = 6, review = [];

    function question() {
      if (n >= total) {
        APP.store.logSession('gioco', 'Rimetti in ordine', score, total);
        root.innerHTML = head(g) + U.results(score, total,
          review.length ? review.map(function (r) {
            return '<div class="review-item ko"><b>' + E(r.it) + '</b><div class="muted xs">' + E(r.fr) + '</div></div>';
          }).join('') : '<p class="muted">Toutes justes ! 🧩</p>',
          '<button class="btn primary" id="again">↻ Rejouer</button><a class="btn" href="#/giochi">Autres jeux</a>');
        root.querySelector('#again').addEventListener('click', function () { ordine(root); });
        return;
      }
      var s = ut.pick(pool);
      var words = s.it.split(/\s+/);
      var bank = ut.shuffle(words.map(function (w, i) { return { w: w, i: i }; }));
      var placed = [];

      function paint() {
        root.querySelector('#slot').innerHTML = placed.length
          ? placed.map(function (p, i) { return '<button class="word-chip" data-p="' + i + '">' + E(p.w) + '</button>'; }).join('')
          : '<span class="muted small">Cliquez les mots dans le bon ordre…</span>';
        root.querySelector('#bank').innerHTML = bank.map(function (b, i) {
          return placed.indexOf(b) >= 0 ? '' : '<button class="word-chip" data-b="' + i + '">' + E(b.w) + '</button>';
        }).join('');
        bindChips();
        root.querySelector('#chk').disabled = placed.length !== words.length;
      }

      function bindChips() {
        root.querySelectorAll('[data-b]').forEach(function (b) {
          b.addEventListener('click', function () { placed.push(bank[+b.getAttribute('data-b')]); paint(); });
        });
        root.querySelectorAll('[data-p]').forEach(function (b) {
          b.addEventListener('click', function () { placed.splice(+b.getAttribute('data-p'), 1); paint(); });
        });
      }

      root.innerHTML = head(g, '<span class="chip">' + (n + 1) + ' / ' + total + '</span>' +
        '<span class="chip">✅ ' + score + '</span>') +
        '<div class="card q-card"><div class="small muted">Reconstruisez la phrase</div>' +
        '<div class="q-text" style="font-size:1.02rem">' + E(s.fr) + '</div>' +
        '<div class="word-slot" id="slot"></div><div class="word-bank" id="bank"></div>' +
        '<button class="btn primary block lg mt" id="chk" disabled>Vérifier</button>' +
        '<div id="fb"></div></div>';

      paint();
      root.querySelector('#chk').addEventListener('click', function () {
        var got = placed.map(function (p) { return p.w; }).join(' ');
        var ok = ut.norm(got) === ut.norm(s.it);
        if (ok) score++; else review.push(s);
        n++;
        root.querySelector('#fb').innerHTML = '<div class="feedback ' + (ok ? 'ok' : 'ko') + '"><b>' +
          (ok ? '✅ Perfetto!' : '❌ La phrase correcte est :') + '</b>' + E(s.it) + ' ' + APP.speech.btn(s.it) + '</div>' +
          '<button class="btn primary block lg mt" id="nx">' + (n >= total ? 'Résultat' : 'Suivant →') + '</button>';
        APP.speech.say(s.it);
        root.querySelectorAll('.word-chip').forEach(function (b) { b.disabled = true; });
        root.querySelector('#chk').disabled = true;
        root.querySelector('#nx').addEventListener('click', question);
      });
    }
    question();
  }

  /* ================= 6. DUELLO DI CONIUGAZIONE ================= */
  function duello(root) {
    var g = GAMES[5];
    var V = DATA.verbs;
    var core = V.all.filter(function (v) {
      return ['essere', 'avere', 'fare', 'andare', 'venire', 'stare', 'dare', 'dire', 'potere', 'dovere',
        'volere', 'sapere', 'uscire', 'bere', 'parlare', 'credere', 'dormire', 'finire', 'prendere',
        'vedere', 'mettere', 'leggere', 'partire', 'mangiare', 'pagare'].indexOf(v.inf) >= 0;
    });
    var tenses = [['presente', 'présent'], ['passato', 'passé composé'], ['imperfetto', 'imparfait'], ['futuro', 'futur']];
    var score = 0, asked = 0, left = 90, miss = [];

    function question() {
      var v = ut.pick(core), t = ut.pick(tenses), p = Math.floor(Math.random() * 6);
      var ans = v[t[0]][p];
      root.querySelector('#play').innerHTML =
        '<div class="small muted center">' + t[1] + '</div>' +
        '<div class="q-text center">' + E(v.inf) + ' — <span style="color:var(--verde)">' + E(V.persons[p]) + '</span></div>' +
        '<form class="answer-row" id="f"><input type="text" id="in" autocomplete="off" autocapitalize="off" ' +
        'autocorrect="off" spellcheck="false" placeholder="Conjuguez…"><button class="btn primary" type="submit">OK</button></form>' +
        '<div id="mini" class="small center mt"></div>';
      var input = root.querySelector('#in'); input.focus();
      root.querySelector('#f').addEventListener('submit', function (e) {
        e.preventDefault();
        if (!input.value.trim()) return;
        asked++;
        var r = ut.check(input.value, ans);
        var mini = root.querySelector('#mini');
        if (r.ok) { score++; mini.innerHTML = '<span style="color:var(--verde)">✅ ' + E(ans) + '</span>'; }
        else { mini.innerHTML = '<span style="color:var(--rosso)">❌ ' + E(ans) + '</span>'; miss.push(v.inf + ' (' + t[1] + ', ' + V.persons[p] + ') → ' + ans); }
        root.querySelector('#sc').textContent = score;
        setTimeout(function () { if (left > 0) question(); }, 620);
      });
    }

    root.innerHTML = head(g, '<span class="timer-pill" id="tm">⏱ 1:30</span>' +
      '<span class="chip">Score : <b id="sc">0</b></span>') +
      '<div class="card q-card"><div id="play"></div></div>';
    question();

    stopTick();
    tick = setInterval(function () {
      left--;
      var t = root.querySelector('#tm');
      if (!t) return stopTick();
      t.textContent = '⏱ ' + ut.fmtTime(Math.max(0, left));
      t.classList.toggle('warn', left <= 15);
      if (left <= 0) {
        stopTick();
        APP.store.logSession('gioco', 'Duello di coniugazione', score, asked);
        root.innerHTML = head(g) + U.results(score, asked || 1,
          miss.length ? '<p class="small muted">À revoir :</p>' + miss.slice(0, 14).map(function (m) {
            return '<div class="review-item ko">' + E(m) + '</div>';
          }).join('') : '<p class="muted">Impeccable ! ⚔️</p>',
          '<button class="btn primary" id="again">↻ Rejouer</button>' +
          '<a class="btn" href="#/verbi">Tableaux de conjugaison</a>' +
          '<a class="btn ghost" href="#/giochi">Autres jeux</a>');
        root.querySelector('#again').addEventListener('click', function () { duello(root); });
      }
    }, 1000);
  }

  var RUN = { abbinamento: abbinamento, cronometro: cronometro, impiccato: impiccato,
              intruso: intruso, ordine: ordine, duello: duello };

  function render(p) { return p[0] && RUN[p[0]] ? '<div></div>' : menu(); }

  function mount(root, p) {
    if (p[0] && RUN[p[0]]) RUN[p[0]](root);
  }

  function unmount() { stopTick(); }

  return { title: 'Jeux', render: render, mount: mount, unmount: unmount };
})();
