/* ===== Accueil ========================================================= */
APP.views.home = (function () {
  'use strict';
  var E = APP.util.esc, U = APP.ui;

  function counts() {
    var voc = DATA.vocab.reduce(function (a, t) { return a + t.items.length; }, 0);
    var ex = DATA.exercises.reduce(function (a, g) { return a + g.items.length; }, 0);
    return { voc: voc, ex: ex, lec: DATA.grammar.length, verb: DATA.verbs.all.length,
             dia: DATA.dialogues.length, sec: DATA.program.reduce(function (a, u) { return a + u.sections.length; }, 0) };
  }

  function wordOfDay() {
    var all = [];
    DATA.vocab.forEach(function (t) {
      t.items.forEach(function (i) { all.push({ it: i.it, fr: i.fr, note: i.note, theme: t.title, id: t.id }); });
    });
    return APP.util.pickOfDay(all, 1);
  }

  function tile(href, ic, title, desc, meta) {
    return '<a class="tile" href="' + href + '"><div class="ic">' + ic + '</div>' +
      '<h3>' + title + '</h3><p>' + desc + '</p>' +
      (meta ? '<div class="meta">' + meta + '</div>' : '') + '</a>';
  }

  function render() {
    var c = counts(), w = wordOfDay(), g = APP.util.pickOfDay(DATA.grammar, 3);
    var st = APP.store.stats();

    var h = '<div class="hero">' +
      '<div class="kicker" style="font-size:.74rem;letter-spacing:.09em;text-transform:uppercase;color:var(--verde);font-weight:700">Benvenuto!</div>' +
      '<h1>Impariamo l’italiano 🇮🇹</h1>' +
      '<p class="lead">Tout le programme de vos cours — UE1, UE2 et UE3 — transformé en séries courtes de 5 à 10 minutes : ' +
      'flashcards, exercices, jeux, dialogues et fiches à imprimer. Aucune inscription, rien à installer.</p>' +
      '<div class="row">' +
        '<a class="btn primary lg" href="#/sessione">⏱ Démarrer une session de 10 min</a>' +
        '<a class="btn lg" href="#/flashcards">🗂 Flashcards</a>' +
        '<a class="btn lg" href="#/esercizi">✏️ Exercices</a>' +
      '</div></div>';

    h += '<div class="grid c4" style="margin-bottom:18px">' +
      '<div class="stat"><b>' + c.voc + '</b><span>mots &amp; expressions</span></div>' +
      '<div class="stat"><b>' + c.lec + '</b><span>leçons de grammaire</span></div>' +
      '<div class="stat"><b>' + c.ex + '</b><span>exercices corrigés</span></div>' +
      '<div class="stat"><b>' + c.verb + '</b><span>verbes conjugués</span></div>' +
      '</div>';

    h += '<h2>Que voulez-vous travailler ?</h2><div class="grid c3" style="margin-bottom:22px">' +
      tile('#/sessione', '⏱', 'Session 10 minutes', 'Un parcours mixte : vocabulaire, grammaire, jeu et traduction.', 'Le plus efficace') +
      tile('#/flashcards', '🗂', 'Flashcards', 'De petites piles de 5 à 20 cartes, avec prononciation.', DATA.vocab.length + ' thèmes') +
      tile('#/esercizi', '✏️', 'Exercices', 'QCM, textes à trous, traductions, vrai/faux — corrigés expliqués.', c.ex + ' items') +
      tile('#/giochi', '🎮', 'Jeux', 'Memory, chrono, pendu, intrus, remise en ordre, duel de conjugaison.', '6 jeux') +
      tile('#/lezioni', '📖', 'Leçons', 'Toute la grammaire du cours, expliquée en français avec exemples.', c.lec + ' fiches') +
      tile('#/verbi', '🔤', 'Conjugaison', 'Tableaux complets et entraînement à toutes les personnes.', '6 temps') +
      tile('#/dialoghi', '🗣', 'Dialogues', 'Situations réelles : bar, hôtel, médecin, magasin, gare…', c.dia + ' scènes') +
      tile('#/lessico', '🔎', 'Lexique', 'Tout le vocabulaire, recherchable et filtrable.', c.voc + ' entrées') +
      tile('#/stampa', '🖨', 'Fiches à imprimer', 'Vocabulaire, tableaux, cartes à découper, exercices vierges.', 'PDF / papier') +
      '</div>';

    h += '<div class="grid c2">';

    /* mot du jour */
    if (w) {
      h += '<div class="card"><div class="row between"><h3 class="mb0">🗓 Le mot du jour</h3>' +
        '<span class="tag neutral">' + E(w.theme) + '</span></div>' +
        '<div style="margin-top:12px;font-size:1.45rem;font-weight:650">' + E(w.it) + ' ' + APP.speech.btn(APP.util.firstForm(w.it)) + '</div>' +
        '<div class="muted">' + E(w.fr) + '</div>' +
        (w.note ? '<div class="small" style="color:var(--oro);margin-top:6px">💡 ' + E(w.note) + '</div>' : '') +
        '<div class="mt"><a class="btn sm" href="#/flashcards/' + w.id + '">Réviser ce thème</a></div></div>';
    }

    /* règle du jour */
    if (g) {
      h += '<div class="card"><div class="row between"><h3 class="mb0">📌 La règle du jour</h3>' + U.ueTag(g.ue) + '</div>' +
        '<div style="margin-top:10px;font-weight:650">' + g.icon + ' ' + E(g.title) + '</div>' +
        '<div class="muted small">' + E(g.subtitle) + '</div>' +
        '<div class="mt row"><a class="btn sm primary" href="#/lezioni/' + g.id + '">Lire la leçon</a>' +
        '<a class="btn sm" href="#/esercizi/' + g.id + '">S’entraîner</a></div></div>';
    }

    h += '</div>';

    /* historique local */
    if (st.sessions) {
      h += '<div class="card mt"><div class="row between"><h3 class="mb0">Vos dernières séries</h3>' +
        '<button class="btn ghost sm" id="clearLog">Effacer</button></div>' +
        '<div class="grid c4 mt">' +
        '<div class="stat"><b>' + st.sessions + '</b><span>séries terminées</span></div>' +
        '<div class="stat"><b>' + st.days + '</b><span>jours d’étude</span></div>' +
        '<div class="stat"><b>' + st.answers + '</b><span>réponses données</span></div>' +
        '<div class="stat"><b>' + st.rate + '%</b><span>de réussite</span></div>' +
        '</div><div class="mt">' +
        APP.store.log().slice(0, 6).map(function (e) {
          var d = new Date(e.d);
          return '<div class="review-item ' + (e.n && e.s / e.n >= .7 ? 'ok' : 'ko') + '">' +
            '<b>' + E(e.l) + '</b> — ' + e.s + '/' + e.n +
            ' <span class="muted xs">· ' + d.toLocaleDateString('fr-FR') + ' ' +
            d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) + '</span></div>';
        }).join('') + '</div>' +
        '<p class="xs muted mt mb0">Cet historique reste dans votre navigateur : il n’est jamais envoyé nulle part et peut être effacé à tout moment.</p>' +
        '</div>';
    } else {
      h += '<div class="card mt"><h3>Comment utiliser l’application</h3>' +
        '<ol class="small" style="margin:0;padding-left:20px;line-height:1.9">' +
        '<li><b>Vous avez 10 minutes ?</b> Lancez une <a href="#/sessione">session mixte</a> : elle enchaîne cartes, grammaire, jeu et traduction.</li>' +
        '<li><b>Vous découvrez un thème ?</b> Commencez par les <a href="#/flashcards">flashcards</a> (5 à 10 cartes), puis les <a href="#/esercizi">exercices</a> du même point.</li>' +
        '<li><b>Un doute sur une règle ?</b> Toutes les <a href="#/lezioni">leçons</a> suivent l’ordre de votre <a href="#/programma">programme</a>.</li>' +
        '<li><b>Vous préférez le papier ?</b> Les <a href="#/stampa">fiches</a> s’impriment ou s’enregistrent en PDF en un clic.</li>' +
        '</ol></div>';
    }

    return h;
  }

  function mount(root) {
    var b = root.querySelector('#clearLog');
    if (b) b.addEventListener('click', function () {
      APP.store.clearLog(); APP.router.render(); APP.ui.toast('Historique effacé');
    });
  }

  return { title: 'Accueil', render: render, mount: mount };
})();
