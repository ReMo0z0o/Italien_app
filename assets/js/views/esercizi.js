/* ===== Exercices ======================================================= */
APP.views.esercizi = (function () {
  'use strict';
  var E = APP.util.esc, U = APP.ui;
  var S = null, size = 10;

  function groups() { return DATA.exercises; }
  function groupOf(topic) { return groups().filter(function (g) { return g.topic === topic; })[0]; }

  function pool(topic) {
    if (topic === 'tutto') {
      var all = [];
      groups().forEach(function (g) {
        g.items.forEach(function (i) { all.push(Object.assign({}, i, { _g: g.title, _t: g.topic })); });
      });
      return all;
    }
    if (/^ue[123]$/.test(topic)) {
      var ue = topic.toUpperCase(), out = [];
      groups().filter(function (g) { return g.ue === ue; }).forEach(function (g) {
        g.items.forEach(function (i) { out.push(Object.assign({}, i, { _g: g.title, _t: g.topic })); });
      });
      return out;
    }
    var g = groupOf(topic);
    return g ? g.items.map(function (i) { return Object.assign({}, i, { _g: g.title, _t: g.topic }); }) : [];
  }

  /* ---------- Choix ---------- */
  function chooser() {
    var total = groups().reduce(function (a, g) { return a + g.items.length; }, 0);
    var h = U.pageHead('Apprendre', 'Exercices ✏️',
      total + ' exercices corrigés : QCM, textes à trous, vrai/faux et traductions. ' +
      'Chaque série est courte et se termine par une correction expliquée.');

    h += '<div class="card"><label class="field">Longueur de la série</label><div class="row">' +
      U.sizePicker(size, [5, 10, 15, 20], 'data-n') + '</div></div>';

    h += '<h2 class="mt2">Séries rapides</h2><div class="grid c4">' +
      [['tutto', '🎲', 'Mélange général', total + ' exercices'],
       ['ue1', '1️⃣', 'Tout l’UE1', pool('ue1').length + ' exercices'],
       ['ue2', '2️⃣', 'Tout l’UE2', pool('ue2').length + ' exercices'],
       ['ue3', '3️⃣', 'Tout l’UE3', pool('ue3').length + ' exercices']]
      .map(function (d) {
        return '<a class="tile" href="#/esercizi/' + d[0] + '"><div class="ic">' + d[1] + '</div>' +
          '<h3>' + d[2] + '</h3><div class="meta">' + d[3] + '</div></a>';
      }).join('') + '</div>';

    ['UE1', 'UE2', 'UE3'].forEach(function (ue) {
      var set = groups().filter(function (g) { return g.ue === ue; });
      if (!set.length) return;
      h += '<h2 class="mt2">' + U.ueTag(ue) + ' Par point du programme</h2><div class="grid c3">' +
        set.map(function (g) {
          var les = DATA.grammar.filter(function (x) { return x.id === g.topic; })[0];
          return '<div class="card" style="padding:14px"><div class="row between" style="align-items:flex-start">' +
            '<div style="flex:1"><b>' + E(g.title) + '</b>' +
            '<div class="xs muted">' + g.items.length + ' exercices</div></div></div>' +
            '<div class="row mt" style="gap:6px">' +
            '<a class="btn sm primary" href="#/esercizi/' + g.topic + '">S’entraîner</a>' +
            (les ? '<a class="btn sm ghost" href="#/lezioni/' + g.topic + '">📖 Leçon</a>' : '') +
            '</div></div>';
        }).join('') + '</div>';
    });
    return h;
  }

  /* ---------- Rendu d'une question ---------- */
  function questionHtml(q, idx) {
    var body = '';
    if (q.t === 'qcm') {
      body = '<div class="q-text">' + fmtQ(q.q) + '</div><div class="opts">' +
        q.opts.map(function (o, i) {
          return '<button class="opt" data-i="' + i + '"><span class="key">' + (i + 1) + '</span>' + E(o) + '</button>';
        }).join('') + '</div>';
    } else if (q.t === 'vf') {
      body = '<div class="q-text">' + fmtQ(q.q) + '</div><div class="opts">' +
        '<button class="opt" data-i="1"><span class="key">V</span>Vrai</button>' +
        '<button class="opt" data-i="0"><span class="key">F</span>Faux</button></div>';
    } else if (q.t === 'trad') {
      body = '<div class="small muted">Traduisez en italien</div>' +
        '<div class="q-text">' + E(q.fr) + '</div>' +
        '<form class="answer-row" id="f"><input type="text" id="in" autocomplete="off" autocapitalize="off" ' +
        'autocorrect="off" spellcheck="false" placeholder="Écrivez en italien…"><button class="btn primary" type="submit">Valider</button></form>';
    } else { /* fill */
      body = '<div class="q-text">' + fmtQ(q.q) + '</div>' +
        '<form class="answer-row" id="f"><input type="text" id="in" autocomplete="off" autocapitalize="off" ' +
        'autocorrect="off" spellcheck="false" placeholder="Complétez…"><button class="btn primary" type="submit">Valider</button></form>';
    }
    return body;
  }

  function fmtQ(t) {
    return E(t).replace(/___+/g, '<span class="gap"></span>')
               .replace(/\(([^)]+)\)/g, '<span class="muted small">($1)</span>');
  }

  function draw(root) {
    var q = S.qs[S.i];
    root.innerHTML =
      '<div class="row between" style="margin-bottom:12px">' +
        '<a class="btn ghost sm" href="#/esercizi">← Changer de série</a>' +
        '<span class="chip">' + E(S.label) + '</span></div>' +
      '<div class="card q-card">' +
      U.progressHead(S.i, S.qs.length, '<span class="cnt" id="sc">✅ ' + S.score + '</span>') +
      (q._g && S.mixed ? '<div class="small muted" style="margin-bottom:6px">' + E(q._g) + '</div>' : '') +
      questionHtml(q, S.i) +
      '<div id="fb"></div></div>';

    if (q.t === 'qcm' || q.t === 'vf') {
      root.querySelectorAll('.opt').forEach(function (b) {
        b.addEventListener('click', function () { judgeChoice(root, +b.getAttribute('data-i')); });
      });
    } else {
      var input = root.querySelector('#in');
      input.focus();
      root.querySelector('#f').addEventListener('submit', function (e) {
        e.preventDefault();
        if (!input.value.trim()) return;
        judgeText(root, input.value);
      });
    }
  }

  function correctIndex(q) { return q.t === 'vf' ? (q.a ? 1 : 0) : q.a; }

  function judgeChoice(root, chosen) {
    var q = S.qs[S.i], right = correctIndex(q), ok = chosen === right;
    root.querySelectorAll('.opt').forEach(function (b, i) {
      b.disabled = true;
      var bi = +b.getAttribute('data-i');
      if (bi === right) b.classList.add('ok');
      else if (bi === chosen) b.classList.add('ko');
    });
    var label = q.t === 'vf' ? (q.a ? 'Vrai' : 'Faux') : q.opts[right];
    show(root, ok, label, q.why);
    record(q, ok, q.t === 'vf' ? (chosen ? 'Vrai' : 'Faux') : q.opts[chosen], label);
  }

  function judgeText(root, given) {
    var q = S.qs[S.i];
    var r = APP.util.check(given, q.a, q.alts);
    show(root, r.ok, q.a, q.why, r.near);
    record(q, r.ok, given, q.a);
  }

  function record(q, ok, given, expected) {
    if (ok) S.score++;
    S.review.push({ ok: ok, q: q.t === 'trad' ? q.fr : q.q, given: given, a: expected, why: q.why, topic: q._t });
  }

  function show(root, ok, answer, why, near) {
    var sc = root.querySelector('#sc');
    if (sc) sc.textContent = '✅ ' + S.score;
    var fb = root.querySelector('#fb');
    var cls = ok ? (near === 'accent' ? 'near' : 'ok') : 'ko';
    var head = ok ? (near === 'accent' ? '✅ Juste — mais attention aux accents' : '✅ Esatto!')
                  : (near === 'typo' ? '❌ Presque ! Une faute de frappe' : '❌ Non, la bonne réponse est :');
    fb.innerHTML = '<div class="feedback ' + cls + '"><b>' + head + '</b>' +
      '<div style="font-size:1.05em">' + E(answer) + ' ' + APP.speech.btn(APP.util.firstForm(answer)) + '</div>' +
      (why ? '<div class="small mt">💡 ' + why + '</div>' : '') + '</div>' +
      '<button class="btn primary block lg mt" id="nx">' + (S.i + 1 >= S.qs.length ? 'Voir le résultat' : 'Suivant →') + '</button>';

    if (!ok || !near) APP.speech.say(APP.util.firstForm(answer));
    var b = root.querySelector('#nx');
    b.focus();
    b.addEventListener('click', function () {
      S.i++;
      if (S.i >= S.qs.length) results(root); else draw(root);
    });
  }

  function results(root) {
    APP.store.logSession('esercizi', 'Exercices — ' + S.label, S.score, S.qs.length);
    var bad = S.review.filter(function (r) { return !r.ok; });
    var topics = {};
    bad.forEach(function (r) { if (r.topic) topics[r.topic] = (topics[r.topic] || 0) + 1; });

    var reviewHtml = bad.length ? bad.map(function (r) {
      return '<div class="review-item ko"><div>' + fmtQ(r.q) + '</div>' +
        '<div class="mt" style="margin-top:4px">✅ <b>' + E(r.a) + '</b>' +
        (r.given ? ' <span class="muted xs">· vous : ' + E(r.given) + '</span>' : '') + '</div>' +
        (r.why ? '<div class="xs muted">' + r.why + '</div>' : '') + '</div>';
    }).join('') : '<p class="muted">Aucune erreur — perfetto ! 🎉</p>';

    if (Object.keys(topics).length) {
      reviewHtml += '<p class="small muted mt">Points à retravailler : ' +
        Object.keys(topics).map(function (t) {
          var g = DATA.grammar.filter(function (x) { return x.id === t; })[0];
          return g ? '<a class="chip" href="#/lezioni/' + t + '">' + E(g.title) + '</a>' : '';
        }).join(' ') + '</p>';
    }

    root.innerHTML = U.pageHead('Exercices', 'Résultat — ' + E(S.label), '') +
      U.results(S.score, S.qs.length, reviewHtml,
        '<button class="btn primary" id="again">↻ Nouvelle série</button>' +
        (bad.length ? '<button class="btn" id="redo">🎯 Refaire mes erreurs</button>' : '') +
        '<a class="btn" href="#/esercizi">Changer de point</a>' +
        '<a class="btn ghost" href="#/sessione">⏱ Session complète</a>');

    root.querySelector('#again').addEventListener('click', function () { begin(root, S.topic); });
    var rd = root.querySelector('#redo');
    if (rd) rd.addEventListener('click', function () {
      var items = S.qs.filter(function (q, i) { return !S.review[i].ok; });
      S = { qs: APP.util.shuffle(items), i: 0, score: 0, review: [], label: S.label + ' (reprise)', topic: S.topic, mixed: S.mixed };
      draw(root);
    });
  }

  function begin(root, topic) {
    var p = pool(topic);
    if (!p.length) { root.innerHTML = U.empty('Série introuvable.'); return; }
    var mixed = topic === 'tutto' || /^ue[123]$/.test(topic);
    var g = groupOf(topic);
    var label = mixed ? (topic === 'tutto' ? 'Mélange général' : 'Tout l’' + topic.toUpperCase()) : (g ? g.title : topic);
    S = { qs: APP.util.sample(p, Math.min(size, p.length)), i: 0, score: 0, review: [], label: label, topic: topic, mixed: mixed };
    draw(root);
  }

  function render(p) { return p[0] ? '<div></div>' : chooser(); }

  function mount(root, p) {
    if (!p[0]) {
      root.querySelectorAll('[data-n]').forEach(function (b) {
        b.addEventListener('click', function () {
          root.querySelectorAll('[data-n]').forEach(function (x) { x.classList.remove('on'); });
          b.classList.add('on'); size = +b.getAttribute('data-n');
        });
      });
      return;
    }
    begin(root, p[0]);
  }

  function unmount() { S = null; }

  return { title: 'Exercices', render: render, mount: mount, unmount: unmount };
})();
