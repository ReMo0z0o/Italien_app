/* ===== Leçons de grammaire ============================================= */
APP.views.lezioni = (function () {
  'use strict';
  var E = APP.util.esc, U = APP.ui;

  function block(b) {
    switch (b.t) {
      case 'p': return '<p>' + b.text + '</p>';
      case 'rule': return '<div class="blk rule">' + (b.title ? '<div class="blk-title">' + b.title + '</div>' : '') + b.text + '</div>';
      case 'warn': return '<div class="blk warn"><div class="blk-title">' + (b.title || '⚠️ Attention') + '</div>' + b.text + '</div>';
      case 'tip': return '<div class="blk tip"><div class="blk-title">' + (b.title || '💡 Astuce') + '</div>' + b.text + '</div>';
      case 'table': return U.table(b.head, b.rows, b.caption);
      case 'list': return '<ul>' + b.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>';
      case 'ex':
        return '<ul class="ex-list">' + b.items.map(function (x) {
          return '<li>' + APP.speech.btn(x.it) + '<span class="it-s">' + E(x.it) + '</span>' +
            '<span class="fr-s">' + E(x.fr) + '</span></li>';
        }).join('') + '</ul>';
      default: return '';
    }
  }

  function detail(id) {
    var g = DATA.grammar.filter(function (x) { return x.id === id; })[0];
    if (!g) return U.empty('Leçon introuvable.') + '<div class="mt"><a class="btn" href="#/lezioni">← Toutes les leçons</a></div>';

    var idx = DATA.grammar.indexOf(g);
    var prev = DATA.grammar[idx - 1], next = DATA.grammar[idx + 1];
    var hasEx = DATA.exercises.some(function (x) { return x.topic === id; });

    var h = '<div class="row between" style="margin-bottom:14px">' +
      '<a class="btn ghost sm" href="#/lezioni">← Toutes les leçons</a>' +
      '<div class="row">' +
        (hasEx ? '<a class="btn primary sm" href="#/esercizi/' + id + '">✏️ S’entraîner sur ce point</a>' : '') +
        '<a class="btn sm" href="#/stampa/grammaire">🖨 Fiche</a>' +
      '</div></div>';

    h += '<div class="card"><div class="row between" style="align-items:flex-start">' +
      '<div><div class="kicker small" style="color:var(--verde);font-weight:700">' + U.ueTag(g.ue) + '</div>' +
      '<h1 style="margin:6px 0 2px">' + g.icon + ' ' + E(g.title) + '</h1>' +
      '<p class="muted mb0">' + E(g.subtitle) + '</p></div></div>' +
      '<div class="divider"></div>' +
      g.blocks.map(block).join('') + '</div>';

    h += '<div class="row between mt2">' +
      (prev ? '<a class="btn" href="#/lezioni/' + prev.id + '">← ' + E(prev.title) + '</a>' : '<span></span>') +
      (next ? '<a class="btn" href="#/lezioni/' + next.id + '">' + E(next.title) + ' →</a>' : '<span></span>') +
      '</div>';
    return h;
  }

  function list() {
    var h = U.pageHead('Réviser', 'Leçons de grammaire',
      'Les ' + DATA.grammar.length + ' points de grammaire du programme, expliqués en français avec tableaux, exemples et pièges à éviter.',
      '<a class="btn" href="#/stampa/grammaire">🖨 Aide-mémoire</a>');

    h += '<div class="row" style="margin-bottom:14px"><input type="search" id="lqs" placeholder="Filtrer les leçons (ex. « pronom », « futur », « article »)…" style="max-width:420px"></div>';

    ['UE1', 'UE2', 'UE3'].forEach(function (ue) {
      var set = DATA.grammar.filter(function (g) { return g.ue === ue; });
      if (!set.length) return;
      h += '<h2 style="margin-top:22px">' + U.ueTag(ue) + ' ' + set.length + ' leçons</h2>' +
        '<div class="lesson-index">' + set.map(function (g) {
          return '<a href="#/lezioni/' + g.id + '" data-k="' + E((g.title + ' ' + g.subtitle + ' ' + (g.tags || []).join(' ')).toLowerCase()) + '">' +
            '<span class="ic">' + g.icon + '</span><span style="flex:1"><span class="t">' + E(g.title) + '</span>' +
            '<div class="s">' + E(g.subtitle) + '</div></span>' +
            '<span class="muted">›</span></a>';
        }).join('') + '</div>';
    });
    return h;
  }

  function render(p) { return p[0] ? detail(p[0]) : list(); }

  function mount(root) {
    var q = root.querySelector('#lqs');
    if (!q) return;
    q.addEventListener('input', APP.util.debounce(function () {
      var v = APP.util.norm(q.value);
      root.querySelectorAll('.lesson-index a').forEach(function (a) {
        a.classList.toggle('hidden', v ? APP.util.norm(a.getAttribute('data-k')).indexOf(v) < 0 : false);
      });
    }, 120));
  }

  return { title: 'Leçons', render: render, mount: mount };
})();
