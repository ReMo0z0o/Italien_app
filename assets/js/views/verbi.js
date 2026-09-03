/* ===== Conjugaison : tableaux + entraînement =========================== */
APP.views.verbi = (function () {
  'use strict';
  var E = APP.util.esc, U = APP.ui, V = null;
  var drill = null;

  function vb() { return DATA.verbs; }

  /* ---------- Liste ---------- */
  function list() {
    V = vb();
    var h = U.pageHead('Réviser', 'Conjugaison',
      V.all.length + ' verbes conjugués à 6 temps : présent, passé composé, imparfait, futur simple, ' +
      'subjonctif présent et conditionnel — plus l’impératif, le participe et le gérondif.',
      '<a class="btn primary" href="#/verbi/drill">🎯 S’entraîner</a> <a class="btn" href="#/stampa/verbes">🖨 Tableaux</a>');

    h += '<div class="card"><div class="row"><input type="search" id="vq" placeholder="Chercher un verbe (italien ou français)…" style="max-width:360px">' +
      '<button class="chip on" data-f="">Tous</button>' +
      '<button class="chip" data-f="irr">Irréguliers</button>' +
      '<button class="chip" data-f="are">-ARE</button>' +
      '<button class="chip" data-f="ere">-ERE</button>' +
      '<button class="chip" data-f="ire">-IRE</button>' +
      '<button class="chip" data-f="isc">-ISC-</button>' +
      '<button class="chip" data-f="essere">Auxiliaire essere</button></div>' +
      '<div class="divider"></div><div id="vlist" class="lesson-index"></div></div>';
    return h;
  }

  function isIrr(v) {
    var raw = V.raw.filter(function (r) { return r.inf === v.inf; })[0];
    return !!(raw && (raw.presente || raw.pp || raw.futStem || raw.congiuntivo || raw.imperfetto || raw.impTu));
  }

  function drawList(root, q, f) {
    var items = V.all.filter(function (v) {
      if (q && APP.util.norm(v.inf + ' ' + v.fr).indexOf(APP.util.norm(q)) < 0) return false;
      if (f === 'irr') return isIrr(v);
      if (f === 'essere') return v.aux === 'essere' || v.aux === 'both';
      if (f && f !== 'irr') return v.group === f;
      return true;
    });
    root.querySelector('#vlist').innerHTML = items.length ? items.map(function (v) {
      return '<a href="#/verbi/' + encodeURIComponent(v.inf) + '">' +
        '<span class="ic">' + (isIrr(v) ? '⚡' : '✅') + '</span>' +
        '<span style="flex:1"><span class="t">' + E(v.inf) + '</span>' +
        '<div class="s">' + E(v.fr) + ' · ' + v.group.toUpperCase() + ' · aux. ' + E(v.aux) +
        ' · pp. <b>' + E(v.participio) + '</b></div></span><span class="muted">›</span></a>';
    }).join('') : U.empty('Aucun verbe trouvé.');
  }

  /* ---------- Détail ---------- */
  function box(title, forms) {
    return '<div class="conj-box"><h4>' + title + '</h4><ol>' +
      forms.map(function (f, i) {
        return '<li><span>' + E(V.persons[i]) + '</span><b>' + E(f) + '</b></li>';
      }).join('') + '</ol></div>';
  }

  function detail(inf) {
    V = vb();
    var v = V.find(inf);
    if (!v) return U.empty('Verbe introuvable.') + '<div class="mt"><a class="btn" href="#/verbi">← Tous les verbes</a></div>';

    var h = '<div class="row between" style="margin-bottom:14px">' +
      '<a class="btn ghost sm" href="#/verbi">← Tous les verbes</a>' +
      '<a class="btn primary sm" href="#/verbi/drill">🎯 S’entraîner</a></div>';

    h += '<div class="card"><div class="row between">' +
      '<div><h1 style="margin:0 0 4px">' + E(v.inf) + ' ' + APP.speech.btn(v.inf) + '</h1>' +
      '<p class="muted mb0">' + E(v.fr) + '</p></div>' +
      '<div class="row" style="gap:6px">' +
        '<span class="tag neutral">' + v.group.toUpperCase() + '</span>' +
        '<span class="tag ' + (v.aux === 'essere' ? 'ue3' : 'ue1') + '">aux. ' + E(v.aux === 'both' ? 'avere / essere' : v.aux) + '</span>' +
        (isIrr(v) ? '<span class="tag ue2">irrégulier</span>' : '<span class="tag ue1">régulier</span>') +
      '</div></div>' +
      '<div class="divider"></div>' +
      '<div class="row" style="gap:18px">' +
        '<div><span class="muted xs">Participe passé</span><div style="font-weight:650">' + E(v.participio) + '</div></div>' +
        '<div><span class="muted xs">Gérondif</span><div style="font-weight:650">' + E(v.gerundio) + '</div></div>' +
        '<div><span class="muted xs">Impératif (tu / Lei)</span><div style="font-weight:650">' + E(v.imperativo.tu) + ' / ' + E(v.imperativo.Lei) + '</div></div>' +
        '<div><span class="muted xs">Impératif négatif (tu)</span><div style="font-weight:650">' + E(v.imperativo.negTu) + '</div></div>' +
      '</div></div>';

    h += '<div class="card"><h3>Tous les temps</h3><div class="conj-grid">' +
      box('Indicativo presente', v.presente) +
      box('Passato prossimo', v.passato) +
      box('Imperfetto', v.imperfetto) +
      box('Futuro semplice', v.futuro) +
      box('Congiuntivo presente', v.congiuntivo) +
      box('Condizionale presente', v.condizionale) +
      '</div>' +
      '<div class="conj-box mt"><h4>Imperativo</h4><ol>' +
        '<li><span>tu</span><b>' + E(v.imperativo.tu) + '</b></li>' +
        '<li><span>Lei</span><b>' + E(v.imperativo.Lei) + '</b></li>' +
        '<li><span>noi</span><b>' + E(v.imperativo.noi) + '</b></li>' +
        '<li><span>voi</span><b>' + E(v.imperativo.voi) + '</b></li>' +
        '<li><span>négatif (tu)</span><b>' + E(v.imperativo.negTu) + '</b></li>' +
      '</ol></div></div>';
    return h;
  }

  /* ---------- Entraînement ---------- */
  var TENSES = [
    { id: 'presente', label: 'Indicativo presente' },
    { id: 'passato', label: 'Passato prossimo' },
    { id: 'imperfetto', label: 'Imperfetto' },
    { id: 'futuro', label: 'Futuro semplice' },
    { id: 'congiuntivo', label: 'Congiuntivo presente' },
    { id: 'condizionale', label: 'Condizionale presente' }
  ];

  function buildDrill(cfg) {
    V = vb();
    var pool = V.all.filter(function (v) {
      if (cfg.scope === 'irr') return isIrr(v);
      if (cfg.scope === 'core') return ['essere', 'avere', 'fare', 'andare', 'venire', 'stare', 'dare', 'dire',
        'potere', 'dovere', 'volere', 'sapere', 'uscire', 'bere', 'rimanere', 'vedere', 'prendere', 'mettere'].indexOf(v.inf) >= 0;
      return true;
    });
    var qs = [];
    for (var i = 0; i < cfg.n; i++) {
      var v = APP.util.pick(pool);
      var t = APP.util.pick(cfg.tenses);
      var p = Math.floor(Math.random() * 6);
      var ans = v[t.id][p];
      qs.push({ inf: v.inf, fr: v.fr, tense: t, person: p, a: ans });
    }
    return { qs: qs, i: 0, score: 0, review: [] };
  }

  function drillSetup() {
    return U.pageHead('Entraînement', 'Duel de conjugaison 🎯',
      'Conjuguez le verbe demandé. Les accents manquants sont tolérés (mais signalés).') +
      '<div class="card q-card"><label class="field">Temps à travailler</label>' +
      '<div class="row" style="margin-bottom:14px">' +
        TENSES.map(function (t, i) {
          return '<button class="chip ' + (i < 1 ? 'on' : '') + '" data-t="' + t.id + '">' + t.label + '</button>';
        }).join('') + '</div>' +
      '<label class="field">Verbes</label><div class="row" style="margin-bottom:14px">' +
        '<button class="chip on" data-s="core">Les 18 essentiels</button>' +
        '<button class="chip" data-s="irr">Irréguliers</button>' +
        '<button class="chip" data-s="all">Tous</button></div>' +
      '<label class="field">Nombre de questions</label><div class="row" style="margin-bottom:18px" id="sz">' +
        U.sizePicker(10, [5, 10, 15, 20], 'data-n') + '</div>' +
      '<button class="btn primary block lg" id="start">Commencer</button></div>';
  }

  function drillQuestion(root) {
    var q = drill.qs[drill.i];
    root.innerHTML = U.pageHead('Entraînement', 'Duel de conjugaison 🎯', '') +
      '<div class="card q-card">' +
      U.progressHead(drill.i, drill.qs.length, '<span class="cnt" id="sc">✅ ' + drill.score + '</span>') +
      '<div class="small muted">' + E(q.tense.label) + '</div>' +
      '<div class="q-text">' + E(q.inf) + ' <span class="muted small">(' + E(q.fr) + ')</span><br>' +
      '<span style="color:var(--verde)">' + E(V.persons[q.person]) + '</span> → <span class="gap"></span></div>' +
      '<form class="answer-row" id="f"><input type="text" id="in" autocomplete="off" autocapitalize="off" ' +
      'autocorrect="off" spellcheck="false" placeholder="Votre réponse…"><button class="btn primary" type="submit">Valider</button></form>' +
      '<div id="fb"></div>' +
      '<div class="row mt"><button class="btn ghost sm" id="skip">Passer / voir la réponse</button></div></div>';

    var input = root.querySelector('#in');
    input.focus();

    function judge(given) {
      var r = APP.util.check(given, q.a);
      var fb = root.querySelector('#fb');
      if (r.ok) {
        drill.score++;
        fb.innerHTML = '<div class="feedback ' + (r.near ? 'near' : 'ok') + '"><b>' +
          (r.near ? '✅ Juste — attention aux accents' : '✅ Esatto!') + '</b>' + E(q.a) + '</div>';
      } else {
        fb.innerHTML = '<div class="feedback ko"><b>❌ La bonne réponse est :</b>' + E(q.a) +
          (r.near ? '<div class="xs mt">Vous n’étiez pas loin — juste une faute de frappe.</div>' : '') + '</div>';
      }
      drill.review.push({ ok: !!r.ok, q: q.inf + ' — ' + q.tense.label + ' (' + V.persons[q.person] + ')', a: q.a, given: given });
      var sc = root.querySelector('#sc');
      if (sc) sc.textContent = '✅ ' + drill.score;
      APP.speech.say(APP.util.firstForm(q.a));
      next(root);
    }

    root.querySelector('#f').addEventListener('submit', function (e) {
      e.preventDefault(); if (!input.value.trim()) return; judge(input.value);
    });
    root.querySelector('#skip').addEventListener('click', function () { judge(''); });
  }

  function next(root) {
    var f = root.querySelector('#f');
    f.innerHTML = '<button class="btn primary block lg" id="nx">Suivant →</button>';
    var b = root.querySelector('#nx'); b.focus();
    b.addEventListener('click', function () {
      drill.i++;
      if (drill.i >= drill.qs.length) drillResults(root); else drillQuestion(root);
    });
    document.addEventListener('keydown', function once(e) {
      if (e.key === 'Enter') { document.removeEventListener('keydown', once); b.click(); }
    });
  }

  function drillResults(root) {
    APP.store.logSession('verbi', 'Conjugaison', drill.score, drill.qs.length);
    var bad = drill.review.filter(function (r) { return !r.ok; });
    root.innerHTML = U.pageHead('Entraînement', 'Résultat', '') +
      U.results(drill.score, drill.qs.length,
        bad.length ? bad.map(function (r) {
          return '<div class="review-item ko"><b>' + E(r.q) + '</b> → ' + E(r.a) +
            (r.given ? ' <span class="muted xs">(vous : ' + E(r.given) + ')</span>' : '') + '</div>';
        }).join('') : '<p class="muted">Sans faute — bravissimo ! 🎉</p>',
        '<button class="btn primary" id="again">↻ Nouvelle série</button>' +
        '<a class="btn" href="#/verbi">Tableaux de conjugaison</a>' +
        '<a class="btn" href="#/sessione">⏱ Session complète</a>');
    root.querySelector('#again').addEventListener('click', function () {
      location.hash = '#/verbi/drill'; APP.router.render();
    });
  }

  function render(p) {
    if (p[0] === 'drill') return drillSetup();
    return p[0] ? detail(p[0]) : list();
  }

  function mount(root, p) {
    V = vb();
    if (p[0] === 'drill') {
      var cfg = { tenses: [TENSES[0]], scope: 'core', n: 10 };
      root.querySelectorAll('[data-t]').forEach(function (b) {
        b.addEventListener('click', function () {
          b.classList.toggle('on');
          var ids = [];
          root.querySelectorAll('[data-t].on').forEach(function (x) { ids.push(x.getAttribute('data-t')); });
          if (!ids.length) { b.classList.add('on'); ids = [b.getAttribute('data-t')]; }
          cfg.tenses = TENSES.filter(function (t) { return ids.indexOf(t.id) >= 0; });
        });
      });
      root.querySelectorAll('[data-s]').forEach(function (b) {
        b.addEventListener('click', function () {
          root.querySelectorAll('[data-s]').forEach(function (x) { x.classList.remove('on'); });
          b.classList.add('on'); cfg.scope = b.getAttribute('data-s');
        });
      });
      root.querySelectorAll('[data-n]').forEach(function (b) {
        b.addEventListener('click', function () {
          root.querySelectorAll('[data-n]').forEach(function (x) { x.classList.remove('on'); });
          b.classList.add('on'); cfg.n = +b.getAttribute('data-n');
        });
      });
      root.querySelector('#start').addEventListener('click', function () {
        drill = buildDrill(cfg); drillQuestion(root);
      });
      return;
    }
    if (p[0]) return;

    var q = root.querySelector('#vq'), filter = '';
    drawList(root, '', '');
    q.addEventListener('input', APP.util.debounce(function () { drawList(root, q.value, filter); }, 130));
    root.querySelectorAll('[data-f]').forEach(function (b) {
      b.addEventListener('click', function () {
        root.querySelectorAll('[data-f]').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on'); filter = b.getAttribute('data-f'); drawList(root, q.value, filter);
      });
    });
  }

  return { title: 'Conjugaison', render: render, mount: mount };
})();
