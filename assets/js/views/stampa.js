/* ===== Fiches imprimables (papier ou « Enregistrer en PDF ») ============ */
APP.views.stampa = (function () {
  'use strict';
  var E = APP.util.esc, U = APP.ui, ut = APP.util;

  var SHEETS = [
    { id: 'vocabulaire', ic: '📗', t: 'Fiches de vocabulaire', d: 'Un thème par page, en deux colonnes, avec les notes et les pièges.' },
    { id: 'test', ic: '📝', t: 'Test de vocabulaire à trous', d: 'La colonne des traductions est vide : à remplir au stylo. Corrigé fourni.' },
    { id: 'cartes', ic: '✂️', t: 'Cartes à découper', d: 'Des flashcards papier, 9 par page, à plier ou à découper.' },
    { id: 'verbes', ic: '🔤', t: 'Tableaux de conjugaison', d: 'Les verbes de votre choix, à tous les temps du programme.' },
    { id: 'grammaire', ic: '📘', t: 'Aide-mémoire grammatical', d: 'Les leçons choisies, avec règles, tableaux et exemples.' },
    { id: 'exercices', ic: '✏️', t: 'Feuille d’exercices', d: 'Une série imprimée avec lignes d’écriture, et le corrigé en dernière page.' },
    { id: 'essentiel', ic: '⭐', t: 'L’antisèche essentielle', d: 'Tout ce qu’il faut savoir sur 2 pages : articles, prépositions, pronoms, verbes.' },
    { id: 'dialogue', ic: '🗣', t: 'Dialogues à imprimer', d: 'Le texte complet avec traduction, pour lire et jouer à deux.' },
    { id: 'programme', ic: '🗺', t: 'Programme à cocher', d: 'Toute l’arborescence du cours, avec cases de suivi.' }
  ];

  /* ---------- fabrique de page ---------- */
  function sheet(title, sub, body) {
    return '<div class="sheet"><div class="sheet-head"><div>' +
      '<h1>' + title + '</h1><div class="sub">' + sub + '</div></div><div class="flag"></div></div>' +
      body +
      '<div class="sheet-foot"><span>Impariamo l’italiano — fiche d’étude</span>' +
      '<span>Nom : ________________   Date : ____ / ____ / ______</span></div></div>';
  }

  function vocLines(items, hideFr) {
    return items.map(function (i) {
      return '<div class="voc-line"><span class="i">' + E(i.it) + '</span>' +
        '<span class="f">' + (hideFr ? '' : E(i.fr)) + '</span></div>' +
        (!hideFr && i.note ? '<div class="note" style="margin:-2px 0 4px">↳ ' + E(i.note) + '</div>' : '');
    }).join('');
  }

  /* ---------- 1. vocabulaire ---------- */
  function sVocabulaire(sel) {
    return DATA.vocab.filter(function (t) { return sel.indexOf(t.id) >= 0; }).map(function (t) {
      return sheet(t.icon + ' ' + E(t.title), E(t.subtitle) + ' — ' + t.ue + ' · ' + t.items.length + ' entrées',
        '<div class="cols2">' + vocLines(t.items, false) + '</div>' +
        '<div class="box" style="margin-top:12px"><div class="bt">À retenir</div>' +
        '<div class="note">Cochez les mots déjà acquis, et revenez sur les autres dans 2 jours.</div></div>');
    }).join('');
  }

  /* ---------- 2. test ---------- */
  function sTest(sel) {
    var out = '';
    DATA.vocab.filter(function (t) { return sel.indexOf(t.id) >= 0; }).forEach(function (t) {
      var items = ut.shuffle(t.items);
      out += sheet('📝 Test — ' + E(t.title), 'Traduisez en français. ' + items.length + ' items · ' + t.ue,
        '<div class="cols2">' + vocLines(items, true) + '</div>' +
        '<div class="box" style="margin-top:14px"><div class="bt">Score</div>' +
        '<div class="note">_____ / ' + items.length + '   ·   Temps : _______   ·   À refaire le : ___ / ___</div></div>');
      out += sheet('✅ Corrigé — ' + E(t.title), 'Vérifiez vos réponses',
        '<div class="cols2">' + vocLines(items, false) + '</div>');
    });
    return out;
  }

  /* ---------- 3. cartes à découper ---------- */
  function sCartes(sel) {
    var items = [];
    DATA.vocab.filter(function (t) { return sel.indexOf(t.id) >= 0; })
      .forEach(function (t) { t.items.forEach(function (i) { items.push(Object.assign({ theme: t.title }, i)); }); });
    var pages = [], per = 9;
    for (var i = 0; i < items.length; i += per) pages.push(items.slice(i, i + per));
    return pages.map(function (p, n) {
      return sheet('✂️ Cartes à découper', 'Page ' + (n + 1) + ' / ' + pages.length +
        ' — pliez au milieu ou découpez, l’italien au recto',
        '<div class="cut-grid">' + p.map(function (i) {
          return '<div class="cut-card"><div class="ci">' + E(i.it) + '</div>' +
            '<div class="cf">' + E(i.fr) + '</div>' +
            (i.note ? '<div class="cn">' + E(i.note) + '</div>' : '') + '</div>';
        }).join('') + '</div>');
    }).join('');
  }

  /* ---------- 4. verbes ---------- */
  function sVerbes(sel) {
    var V = DATA.verbs;
    var list = sel;
    var out = '';
    for (var k = 0; k < list.length; k += 2) {
      var chunk = list.slice(k, k + 2).map(function (inf) { return V.find(inf); }).filter(Boolean);
      out += sheet('🔤 Conjugaison', chunk.map(function (v) { return v.inf; }).join(' · '),
        chunk.map(function (v) {
          var rows = V.persons.map(function (p, i) {
            return '<tr><td><b>' + E(p) + '</b></td><td>' + E(v.presente[i]) + '</td><td>' + E(v.passato[i]) + '</td>' +
              '<td>' + E(v.imperfetto[i]) + '</td><td>' + E(v.futuro[i]) + '</td><td>' + E(v.congiuntivo[i]) + '</td></tr>';
          }).join('');
          return '<h2>' + E(v.inf) + ' — ' + E(v.fr) + '</h2>' +
            '<p class="note">Groupe ' + v.group.toUpperCase() + ' · auxiliaire ' +
            E(v.aux === 'both' ? 'avere / essere' : v.aux) + ' · participe <b>' + E(v.participio) +
            '</b> · gérondif <b>' + E(v.gerundio) + '</b></p>' +
            '<table class="zebra"><thead><tr><th></th><th>Presente</th><th>Passato pross.</th>' +
            '<th>Imperfetto</th><th>Futuro</th><th>Congiuntivo</th></tr></thead><tbody>' + rows + '</tbody></table>' +
            '<div class="box"><div class="bt">Imperativo</div>' +
            'tu <b>' + E(v.imperativo.tu) + '</b> · Lei <b>' + E(v.imperativo.Lei) + '</b> · noi <b>' +
            E(v.imperativo.noi) + '</b> · voi <b>' + E(v.imperativo.voi) + '</b> · négatif (tu) <b>' +
            E(v.imperativo.negTu) + '</b></div>';
        }).join(''));
    }
    return out;
  }

  /* ---------- 5. grammaire ---------- */
  function blockToSheet(b) {
    switch (b.t) {
      case 'p': return '<p>' + b.text + '</p>';
      case 'rule': return '<div class="box"><div class="bt">' + (b.title || 'Règle') + '</div>' + b.text + '</div>';
      case 'warn': return '<div class="box"><div class="bt">⚠ ' + (b.title || 'Attention') + '</div>' + b.text + '</div>';
      case 'tip': return '<div class="box"><div class="bt">💡 ' + (b.title || 'Astuce') + '</div>' + b.text + '</div>';
      case 'table':
        return '<table class="zebra">' + (b.caption ? '<caption>' + b.caption + '</caption>' : '') +
          (b.head && b.head.length ? '<thead><tr>' + b.head.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr></thead>' : '') +
          '<tbody>' + b.rows.map(function (r) {
            return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
          }).join('') + '</tbody></table>';
      case 'ex':
        return '<h3>Exemples</h3>' + b.items.map(function (x) {
          return '<div class="voc-line"><span class="i">' + E(x.it) + '</span><span class="f">' + E(x.fr) + '</span></div>';
        }).join('');
      case 'list': return '<ul>' + b.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>';
      default: return '';
    }
  }

  function sGrammaire(sel) {
    return DATA.grammar.filter(function (g) { return sel.indexOf(g.id) >= 0; }).map(function (g) {
      return sheet(g.icon + ' ' + E(g.title), E(g.subtitle) + ' — ' + g.ue,
        g.blocks.map(blockToSheet).join(''));
    }).join('');
  }

  /* ---------- 6. exercices ---------- */
  function sExercices(sel, n) {
    var pool = [];
    DATA.exercises.filter(function (g) { return !sel.length || sel.indexOf(g.topic) >= 0; })
      .forEach(function (g) { g.items.forEach(function (i) { pool.push(Object.assign({ _g: g.title }, i)); }); });
    var items = ut.sample(pool, Math.min(n || 20, pool.length));

    var qs = items.map(function (it, i) {
      if (it.t === 'qcm') {
        return '<li>' + E(it.q).replace(/___+/g, '<span class="fillspace"></span>') + '<br>' +
          it.opts.map(function (o, k) { return '<span style="margin-right:14px">☐ ' + E(o) + '</span>'; }).join('') + '</li>';
      }
      if (it.t === 'vf') return '<li>' + E(it.q) + ' &nbsp; ☐ Vrai &nbsp; ☐ Faux</li>';
      if (it.t === 'trad') return '<li>' + E(it.fr) + '<div class="write-line"></div></li>';
      return '<li>' + E(it.q).replace(/___+/g, '<span class="fillspace"></span>') + '</li>';
    }).join('');

    var sol = items.map(function (it, i) {
      var a = it.t === 'qcm' ? it.opts[it.a] : it.t === 'vf' ? (it.a ? 'Vrai' : 'Faux') : it.a;
      return '<li><b>' + E(a) + '</b>' + (it.why ? ' <span class="note">— ' + it.why + '</span>' : '') + '</li>';
    }).join('');

    return sheet('✏️ Feuille d’exercices', items.length + ' exercices — écrivez directement sur la feuille',
      '<ol class="ex-ol">' + qs + '</ol>' +
      '<div class="box"><div class="bt">Score</div><div class="note">_____ / ' + items.length + '</div></div>') +
      sheet('✅ Corrigé', 'Réponses de la feuille d’exercices', '<ol class="ex-ol">' + sol + '</ol>');
  }

  /* ---------- 7. antisèche ---------- */
  function sEssentiel() {
    var V = DATA.verbs;
    var irrPP = V.raw.filter(function (r) { return r.pp; }).slice(0, 26)
      .map(function (r) { return E(r.inf) + ' → <b>' + E(r.pp) + '</b>'; });

    var p1 = sheet('⭐ L’antisèche — 1/2', 'Articles, prépositions, pronoms · à garder sous les yeux',
      '<h2>Articles définis et indéfinis</h2>' +
      '<table class="zebra"><thead><tr><th></th><th>devant consonne</th><th>s+cons., z, ps, gn, y</th><th>voyelle</th></tr></thead><tbody>' +
      '<tr><td><b>m. sing.</b></td><td>il / un</td><td>lo / uno</td><td>l’ / un</td></tr>' +
      '<tr><td><b>m. plur.</b></td><td>i</td><td>gli</td><td>gli</td></tr>' +
      '<tr><td><b>f. sing.</b></td><td>la / una</td><td>la / una</td><td>l’ / un’</td></tr>' +
      '<tr><td><b>f. plur.</b></td><td>le</td><td>le</td><td>le</td></tr></tbody></table>' +

      '<h2>Prépositions articulées</h2>' +
      '<table class="zebra"><thead><tr><th></th><th>il</th><th>lo</th><th>l’</th><th>i</th><th>gli</th><th>la</th><th>le</th></tr></thead><tbody>' +
      '<tr><td><b>a</b></td><td>al</td><td>allo</td><td>all’</td><td>ai</td><td>agli</td><td>alla</td><td>alle</td></tr>' +
      '<tr><td><b>di</b></td><td>del</td><td>dello</td><td>dell’</td><td>dei</td><td>degli</td><td>della</td><td>delle</td></tr>' +
      '<tr><td><b>da</b></td><td>dal</td><td>dallo</td><td>dall’</td><td>dai</td><td>dagli</td><td>dalla</td><td>dalle</td></tr>' +
      '<tr><td><b>in</b></td><td>nel</td><td>nello</td><td>nell’</td><td>nei</td><td>negli</td><td>nella</td><td>nelle</td></tr>' +
      '<tr><td><b>su</b></td><td>sul</td><td>sullo</td><td>sull’</td><td>sui</td><td>sugli</td><td>sulla</td><td>sulle</td></tr>' +
      '</tbody></table>' +

      '<h2>Pronoms</h2>' +
      '<table class="zebra"><thead><tr><th>Directs</th><th>Indirects</th><th>Combinés (+ lo)</th></tr></thead><tbody>' +
      '<tr><td>mi, ti, lo, la, ci, vi, li, le</td><td>mi, ti, gli, le, ci, vi, gli</td>' +
      '<td>me lo, te lo, glielo, ce lo, ve lo, glielo</td></tr></tbody></table>' +
      '<div class="box"><div class="bt">Réflexes</div>' +
      '<b>NE</b> = une partie (<i>Ne prendo due</i>) · <b>CI</b> = lieu / y (<i>Ci vado</i>) · ' +
      '<b>Ce l’ho</b> = je l’ai (sur moi) · <b>Ci vuole / Ci vogliono</b> = il faut · ' +
      '<b>Ci metto</b> = je mets (durée) · <b>Bisogna + inf.</b> = il faut · ' +
      '<b>Ho bisogno di</b> = j’ai besoin de</div>' +

      '<h2>Quantité</h2>' +
      '<p><b>Adverbe</b> (après un verbe, devant un adjectif) → invariable : <i>Ho mangiato molto. È molto bella.</i><br>' +
      '<b>Adjectif</b> (devant un nom) → accord : <i>molta fame, molte persone, pochi amici, troppe macchine.</i></p>' +

      '<h2>Bello / quello</h2>' +
      '<p>Suivent l’article défini : <b>bel</b> libro · <b>bello</b> studente · <b>bell’</b>amico · ' +
      '<b>bei</b> libri · <b>begli</b> occhi · <b>bella</b> casa · <b>belle</b> case.</p>');

    var p2 = sheet('⭐ L’antisèche — 2/2', 'Verbes : temps, participes, irréguliers',
      '<h2>Terminaisons à connaître</h2>' +
      '<table class="zebra"><thead><tr><th>Temps</th><th>-ARE</th><th>-ERE</th><th>-IRE</th></tr></thead><tbody>' +
      '<tr><td><b>Presente</b></td><td>o, i, a, iamo, ate, ano</td><td>o, i, e, iamo, ete, ono</td><td>o, i, e, iamo, ite, ono</td></tr>' +
      '<tr><td><b>Imperfetto</b></td><td colspan="3">radical + vo, vi, va, vamo, vate, vano</td></tr>' +
      '<tr><td><b>Futuro</b></td><td>-ER- + ò, ai, à, emo, ete, anno</td><td>-ER- + …</td><td>-IR- + …</td></tr>' +
      '<tr><td><b>Congiuntivo</b></td><td>i, i, i, iamo, iate, ino</td><td>a, a, a, iamo, iate, ano</td><td>a, a, a, iamo, iate, ano</td></tr>' +
      '<tr><td><b>Condizionale</b></td><td colspan="3">radical du futur + ei, esti, ebbe, emmo, este, ebbero</td></tr>' +
      '<tr><td><b>Participio</b></td><td>-ato</td><td>-uto</td><td>-ito</td></tr>' +
      '<tr><td><b>Gerundio</b></td><td>-ando</td><td>-endo</td><td>-endo</td></tr>' +
      '</tbody></table>' +

      '<h2>Futur : radicaux irréguliers</h2>' +
      '<p>essere → <b>sarò</b> · avere → <b>avrò</b> · fare → <b>farò</b> · andare → <b>andrò</b> · ' +
      'dovere → <b>dovrò</b> · potere → <b>potrò</b> · volere → <b>vorrò</b> · sapere → <b>saprò</b> · ' +
      'vedere → <b>vedrò</b> · vivere → <b>vivrò</b> · venire → <b>verrò</b> · rimanere → <b>rimarrò</b> · ' +
      'tenere → <b>terrò</b> · bere → <b>berrò</b> · dare → <b>darò</b> · stare → <b>starò</b>.<br>' +
      '<span class="note">pagare → pagherò · cercare → cercherò · mangiare → mangerò · cominciare → comincerò</span></p>' +

      '<h2>Participes passés irréguliers</h2>' +
      '<div class="cols3"><p>' + irrPP.join('<br>') + '</p></div>' +

      '<h2>Auxiliaire ESSERE</h2>' +
      '<p>andare, venire, partire, arrivare, tornare, entrare, uscire, salire, scendere, restare, rimanere, ' +
      'nascere, morire, diventare, piacere, essere, stare + <b>tous les verbes réfléchis</b>. ' +
      'Le participe s’accorde avec le sujet.</p>' +
      '<div class="box"><div class="bt">Avec AVERE</div>Participe invariable… <b>sauf</b> devant lo / la / li / le : ' +
      '<i>La pizza? L’ho mangiat<b>a</b>. I libri? Li ho lett<b>i</b>.</i></div>');
    return p1 + p2;
  }

  /* ---------- 8. dialogues ---------- */
  function sDialogue(sel) {
    return DATA.dialogues.filter(function (d) { return sel.indexOf(d.id) >= 0; }).map(function (d) {
      return sheet(d.icon + ' ' + E(d.title), E(d.context) + ' — ' + d.ue,
        '<table class="zebra"><thead><tr><th style="width:16%">Rôle</th><th style="width:44%">Italiano</th><th>Français</th></tr></thead><tbody>' +
        d.lines.map(function (l) {
          return '<tr><td><b>' + E(l.who) + '</b></td><td>' + E(l.it) + '</td><td>' + E(l.fr) + '</td></tr>';
        }).join('') + '</tbody></table>' +
        (d.useful ? '<div class="box"><div class="bt">Expressions clés</div>' +
          d.useful.map(function (u) { return '<div><b>' + E(u.it) + '</b> — ' + E(u.fr) + '</div>'; }).join('') + '</div>' : ''));
    }).join('');
  }

  /* ---------- 9. programme ---------- */
  function sProgramme() {
    return DATA.program.map(function (ue) {
      return sheet(ue.icon + ' ' + ue.ue + ' — ' + E(ue.title), E(ue.subtitle) + ' · ' + ue.sections.length + ' points',
        '<table><thead><tr><th style="width:52%">Point du programme</th><th style="width:34%">Détail</th>' +
        '<th style="width:14%">Vu / Su</th></tr></thead><tbody>' +
        ue.sections.map(function (s) {
          return '<tr><td><b>' + E(s.title) + '</b></td>' +
            '<td class="note">' + E((s.points || []).slice(0, 4).join(' · ')) + '</td>' +
            '<td><span class="track"><i></i><i></i></span></td></tr>';
        }).join('') + '</tbody></table>');
    }).join('') +
    sheet('🗣 Compétences de communication', 'À cocher au fil de l’année',
      '<table><tbody>' + DATA.competenze.map(function (c) {
        return '<tr><td>' + E(c) + '</td><td style="width:60px"><span class="track"><i></i><i></i></span></td></tr>';
      }).join('') + '</tbody></table>');
  }

  /* ---------- index ---------- */
  function index() {
    var h = U.pageHead('Le cours', 'Fiches à imprimer 🖨',
      'Toutes les fiches sont générées à partir du contenu de l’application. ' +
      'Cliquez sur <b>Imprimer</b> puis choisissez votre imprimante — ou <b>« Enregistrer au format PDF »</b> ' +
      'dans la boîte de dialogue pour obtenir un fichier PDF.');

    h += '<div class="grid c2">' + SHEETS.map(function (s) {
      return '<div class="sheet-card"><div class="ic">' + s.ic + '</div><div style="flex:1">' +
        '<h4>' + E(s.t) + '</h4><p>' + E(s.d) + '</p>' +
        '<a class="btn sm primary" href="#/stampa/' + s.id + '">Préparer la fiche</a></div></div>';
    }).join('') + '</div>';

    h += '<div class="card mt2"><h3>💡 Obtenir un PDF</h3>' +
      '<ol class="small" style="padding-left:18px;line-height:1.9;margin:0">' +
      '<li>Préparez la fiche et cliquez sur <b>Imprimer</b> (ou Ctrl/⌘ + P).</li>' +
      '<li>Dans « Destination », choisissez <b>Enregistrer au format PDF</b>.</li>' +
      '<li>Activez « Graphiques d’arrière-plan » si vous voulez garder les trames grises des tableaux.</li>' +
      '<li>Format conseillé : A4, marges par défaut.</li></ol></div>';
    return h;
  }

  /* ---------- constructeur ---------- */
  var pickers = {
    vocabulaire: { src: 'vocab', label: 'Thèmes de vocabulaire', def: 3 },
    test:        { src: 'vocab', label: 'Thèmes à tester', def: 1 },
    cartes:      { src: 'vocab', label: 'Thèmes à transformer en cartes', def: 2 },
    verbes:      { src: 'verbs', label: 'Verbes à conjuguer', def: 8 },
    grammaire:   { src: 'grammar', label: 'Leçons à imprimer', def: 3 },
    exercices:   { src: 'ex', label: 'Points travaillés (vide = tout le programme)', def: 0 },
    dialogue:    { src: 'dial', label: 'Dialogues', def: 2 },
    essentiel:   { src: null },
    programme:   { src: null }
  };

  function options(src) {
    if (src === 'vocab') return DATA.vocab.map(function (t) { return { v: t.id, l: t.icon + ' ' + t.title, ue: t.ue }; });
    if (src === 'verbs') return DATA.verbs.all.map(function (v) { return { v: v.inf, l: v.inf + ' — ' + v.fr, ue: '' }; });
    if (src === 'grammar') return DATA.grammar.map(function (g) { return { v: g.id, l: g.icon + ' ' + g.title, ue: g.ue }; });
    if (src === 'ex') return DATA.exercises.map(function (g) { return { v: g.topic, l: g.title, ue: g.ue }; });
    if (src === 'dial') return DATA.dialogues.map(function (d) { return { v: d.id, l: d.icon + ' ' + d.title, ue: d.ue }; });
    return [];
  }

  function builder(id) {
    var meta = SHEETS.filter(function (s) { return s.id === id; })[0];
    if (!meta) return U.empty('Fiche inconnue.');
    var p = pickers[id];

    var h = '<div class="no-print">' +
      '<div class="row" style="margin-bottom:12px"><a class="btn ghost sm" href="#/stampa">← Toutes les fiches</a></div>' +
      U.pageHead('Fiche à imprimer', meta.ic + ' ' + E(meta.t), E(meta.d));

    if (p.src) {
      var opts = options(p.src);
      h += '<div class="card"><label class="field">' + E(p.label) + '</label>' +
        '<div class="row" style="gap:5px;max-height:210px;overflow:auto;padding:2px" id="pick">' +
        opts.map(function (o, i) {
          return '<button class="chip ' + (i < p.def ? 'on' : '') + '" data-v="' + E(o.v) + '">' + E(o.l) + '</button>';
        }).join('') + '</div>' +
        '<div class="row mt"><button class="btn sm" id="all">Tout sélectionner</button>' +
        '<button class="btn sm" id="none">Tout désélectionner</button>' +
        (id === 'exercices' ? '<span class="spacer"></span><label class="field mb0">Nombre d’exercices</label>' +
          '<select id="exn" style="max-width:110px"><option>10</option><option selected>20</option><option>30</option><option>40</option></select>' : '') +
        '</div></div>';
    }

    h += '<div class="print-toolbar"><button class="btn primary" id="print">🖨 Imprimer / Enregistrer en PDF</button>' +
      '<button class="btn" id="refresh">↻ Régénérer</button>' +
      '<span class="muted small" id="pgc"></span></div></div>';

    h += '<div id="preview"></div>';
    return h;
  }

  function generate(id, sel, extra) {
    switch (id) {
      case 'vocabulaire': return sVocabulaire(sel);
      case 'test': return sTest(sel);
      case 'cartes': return sCartes(sel);
      case 'verbes': return sVerbes(sel);
      case 'grammaire': return sGrammaire(sel);
      case 'exercices': return sExercices(sel, extra);
      case 'essentiel': return sEssentiel();
      case 'dialogue': return sDialogue(sel);
      case 'programme': return sProgramme();
      default: return '';
    }
  }

  function render(p) { return p[0] ? builder(p[0]) : index(); }

  function mount(root, p) {
    var id = p[0];
    if (!id) return;
    var pk = pickers[id];

    function selection() {
      var s = [];
      root.querySelectorAll('#pick .chip.on').forEach(function (c) { s.push(c.getAttribute('data-v')); });
      return s;
    }

    function refresh() {
      var extra = root.querySelector('#exn') ? +root.querySelector('#exn').value : null;
      var sel = pk.src ? selection() : [];
      var html;
      if (pk.src && !sel.length && id !== 'exercices') {
        html = '<div class="card center muted no-print">Sélectionnez au moins un élément ci-dessus pour générer la fiche.</div>';
      } else {
        html = generate(id, sel, extra);
      }
      root.querySelector('#preview').innerHTML = html;
      var n = root.querySelectorAll('#preview .sheet').length;
      var c = root.querySelector('#pgc');
      if (c) c.textContent = n + ' page' + (n > 1 ? 's' : '') + ' générée' + (n > 1 ? 's' : '');
    }

    if (pk.src) {
      root.querySelectorAll('#pick .chip').forEach(function (c) {
        c.addEventListener('click', function () { c.classList.toggle('on'); refresh(); });
      });
      root.querySelector('#all').addEventListener('click', function () {
        root.querySelectorAll('#pick .chip').forEach(function (c) { c.classList.add('on'); }); refresh();
      });
      root.querySelector('#none').addEventListener('click', function () {
        root.querySelectorAll('#pick .chip').forEach(function (c) { c.classList.remove('on'); }); refresh();
      });
      var exn = root.querySelector('#exn');
      if (exn) exn.addEventListener('change', refresh);
    }
    root.querySelector('#print').addEventListener('click', function () { window.print(); });
    root.querySelector('#refresh').addEventListener('click', refresh);
    refresh();
  }

  return { title: 'Fiches à imprimer', render: render, mount: mount };
})();
