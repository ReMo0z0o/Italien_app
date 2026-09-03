/* ===== Programme du cours ============================================== */
APP.views.programma = (function () {
  'use strict';
  var E = APP.util.esc, U = APP.ui;

  function links(s) {
    var out = [];
    if (s.grammar) out.push('<a class="btn sm" href="#/lezioni/' + s.grammar + '">📖 Leçon</a>');
    if (s.vocab) out.push('<a class="btn sm" href="#/flashcards/' + s.vocab + '">🗂 Flashcards</a>');
    if (s.vocab) out.push('<a class="btn sm" href="#/lessico?t=' + s.vocab + '">🔎 Lexique</a>');
    if (s.ex) out.push('<a class="btn sm primary" href="#/esercizi/' + s.ex + '">✏️ Exercices</a>');
    if (s.dialogue) out.push('<a class="btn sm" href="#/dialoghi/' + s.dialogue + '">🗣 Dialogue</a>');
    if (s.email) out.push('<a class="btn sm" href="#/dialoghi/mail">✉️ Modèles d’e-mail</a>');
    return out.length ? '<div class="row">' + out.join('') + '</div>' : '<div class="xs muted">Point traité dans les leçons voisines.</div>';
  }

  function render() {
    var h = U.pageHead('Le cours', 'Programme complet',
      'L’arborescence reprend fidèlement votre document <i>« Mes cours d’italien »</i>. ' +
      'Chaque point renvoie vers la leçon, les cartes et les exercices correspondants.',
      '<a class="btn" href="#/stampa/programme">🖨 Imprimer le programme</a>');

    DATA.program.forEach(function (ue) {
      h += '<div class="ue-block"><div class="ue-head"><span class="ic">' + ue.icon + '</span>' +
        '<div><h2 class="mb0">' + U.ueTag(ue.ue) + ' ' + E(ue.title) + '</h2>' +
        '<div class="small muted">' + E(ue.subtitle) + ' · ' + ue.sections.length + ' points</div></div></div>';

      ue.sections.forEach(function (s, i) {
        h += '<details class="sect"><summary>' + E(s.title) + '</summary><div class="sect-body">' +
          (s.points && s.points.length ? '<ul>' + s.points.map(function (p) { return '<li>' + E(p) + '</li>'; }).join('') + '</ul>' : '') +
          links(s) + '</div></details>';
      });
      h += '</div>';
    });

    h += '<div class="card"><h3>🗣 Compétences de communication travaillées</h3>' +
      '<div class="row" style="gap:6px">' +
      DATA.competenze.map(function (c) { return '<span class="chip">' + E(c) + '</span>'; }).join('') +
      '</div></div>';

    h += '<div class="card"><h3>🔑 Le fil rouge grammatical de l’UE3</h3>' +
      '<p class="small muted">L’enchaînement des notions, tel qu’il figure à la fin de votre programme :</p>' +
      '<div class="row" style="gap:6px">' +
      DATA.filoRosso.map(function (id) {
        var g = DATA.grammar.filter(function (x) { return x.id === id; })[0];
        return g ? '<a class="chip" href="#/lezioni/' + id + '">' + g.icon + ' ' + E(g.title) + '</a>' : '';
      }).join('<span class="muted">→</span>') +
      '</div></div>';

    return h;
  }

  return { title: 'Programme', render: render };
})();
