/* ===== Fiches à imprimer — aperçu page, aperçu PDF, téléchargement ====== */
APP.views.stampa = (function () {
  'use strict';
  var E = APP.util.esc, U = APP.ui, ut = APP.util, SH = APP.sheet;

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

  /* ===================== constructeurs de fiches ======================== */

  function sVocabulaire(sel) {
    return DATA.vocab.filter(function (t) { return sel.indexOf(t.id) >= 0; }).map(function (t) {
      return {
        title: t.title, sub: t.subtitle + ' — ' + t.ue + ' · ' + t.items.length + ' entrées',
        blocks: [
          { t: 'voc', items: t.items, cols: 2 },
          { t: 'box', title: 'À retenir', runs: 'Cochez les mots déjà acquis, et revenez sur les autres dans deux jours.' }
        ]
      };
    });
  }

  function sTest(sel) {
    var out = [];
    DATA.vocab.filter(function (t) { return sel.indexOf(t.id) >= 0; }).forEach(function (t) {
      var items = ut.shuffle(t.items);
      out.push({
        title: 'Test — ' + t.title,
        sub: 'Traduisez en français. ' + items.length + ' items · ' + t.ue,
        blocks: [
          { t: 'voc', items: items, cols: 2, hideFr: true },
          { t: 'box', title: 'Score', runs: '_____ / ' + items.length + '   ·   Temps : _______   ·   À refaire le : ____ / ____' }
        ]
      });
      out.push({
        title: 'Corrigé — ' + t.title, sub: 'Vérifiez vos réponses',
        blocks: [{ t: 'voc', items: items, cols: 2 }]
      });
    });
    return out;
  }

  function sCartes(sel) {
    var items = [];
    DATA.vocab.filter(function (t) { return sel.indexOf(t.id) >= 0; })
      .forEach(function (t) { t.items.forEach(function (i) { items.push(i); }); });
    var out = [], per = 9, n = Math.ceil(items.length / per);
    for (var i = 0; i < items.length; i += per) {
      out.push({
        title: 'Cartes à découper',
        sub: 'Page ' + (out.length + 1) + ' / ' + n + ' — l’italien au recto, découpez suivant les traits',
        blocks: [{ t: 'cards', items: items.slice(i, i + per) }]
      });
    }
    return out;
  }

  function sVerbes(sel) {
    var V = DATA.verbs, out = [];
    for (var k = 0; k < sel.length; k += 2) {
      var chunk = sel.slice(k, k + 2).map(function (inf) { return V.find(inf); }).filter(Boolean);
      if (!chunk.length) continue;
      var blocks = [];
      chunk.forEach(function (v) {
        blocks.push({ t: 'h2', text: v.inf + ' — ' + v.fr });
        blocks.push({ t: 'note', runs: 'Groupe ' + v.group.toUpperCase() + ' · auxiliaire ' +
          (v.aux === 'both' ? 'avere / essere' : v.aux) + ' · participe <b>' + v.participio +
          '</b> · gérondif <b>' + v.gerundio + '</b>' });
        blocks.push({
          t: 'table', zebra: true, w: [1.15, 1, 1.35, 1.1, 1, 1.1],
          head: ['', 'Presente', 'Passato pross.', 'Imperfetto', 'Futuro', 'Congiuntivo'],
          rows: V.persons.map(function (p, i) {
            return [{ c: '<b>' + p + '</b>' }, v.presente[i], v.passato[i], v.imperfetto[i], v.futuro[i], v.congiuntivo[i]];
          })
        });
        blocks.push({ t: 'box', title: 'Imperativo', runs:
          'tu <b>' + v.imperativo.tu + '</b> · Lei <b>' + v.imperativo.Lei + '</b> · noi <b>' +
          v.imperativo.noi + '</b> · voi <b>' + v.imperativo.voi + '</b> · négatif (tu) <b>' +
          v.imperativo.negTu + '</b>' });
      });
      out.push({ title: 'Conjugaison', sub: chunk.map(function (v) { return v.inf; }).join(' · '), blocks: blocks });
    }
    return out;
  }

  function lessonBlock(b) {
    switch (b.t) {
      case 'p': return { t: 'p', runs: b.text };
      case 'rule': return { t: 'box', title: b.title || 'Règle', runs: b.text };
      case 'warn': return { t: 'box', title: b.title ? b.title.replace(/^[^\wÀ-ſ]+/, '') : 'Attention', runs: b.text };
      case 'tip': return { t: 'box', title: b.title ? b.title.replace(/^[^\wÀ-ſ]+/, '') : 'Astuce', runs: b.text };
      case 'table': return { t: 'table', head: b.head, rows: b.rows, zebra: true, caption: b.caption };
      case 'ex': return { t: 'voc', cols: 1, items: b.items.map(function (x) { return { it: x.it, fr: x.fr }; }) };
      case 'list': return { t: 'p', runs: b.items.map(function (i) { return '• ' + i; }).join('<br>') };
      default: return null;
    }
  }

  function sGrammaire(sel) {
    return DATA.grammar.filter(function (g) { return sel.indexOf(g.id) >= 0; }).map(function (g) {
      return {
        title: g.title, sub: g.subtitle + ' — ' + g.ue,
        blocks: g.blocks.map(lessonBlock).filter(Boolean)
      };
    });
  }

  function sExercices(sel, n) {
    var pool = [];
    DATA.exercises.filter(function (g) { return !sel.length || sel.indexOf(g.topic) >= 0; })
      .forEach(function (g) { g.items.forEach(function (i) { pool.push(i); }); });
    if (!pool.length) return [];
    var items = ut.sample(pool, Math.min(n || 20, pool.length));

    var qs = items.map(function (it) {
      if (it.t === 'qcm') return { runs: it.q.replace(/_{3,}/g, '……………'), opts: it.opts };
      if (it.t === 'vf') return { runs: it.q, opts: ['Vrai', 'Faux'] };
      if (it.t === 'trad') return { runs: it.fr, line: true };
      return { runs: it.q.replace(/_{3,}/g, '………………') };
    });

    var sol = items.map(function (it) {
      var a = it.t === 'qcm' ? it.opts[it.a] : it.t === 'vf' ? (it.a ? 'Vrai' : 'Faux') : it.a;
      return { runs: '<b>' + a + '</b>' + (it.why ? ' — <i>' + SH.runsText(it.why) + '</i>' : '') };
    });

    return [
      { title: 'Feuille d’exercices', sub: items.length + ' exercices — écrivez directement sur la feuille',
        blocks: [{ t: 'ol', items: qs }, { t: 'box', title: 'Score', runs: '_____ / ' + items.length }] },
      { title: 'Corrigé', sub: 'Réponses de la feuille d’exercices', blocks: [{ t: 'ol', items: sol }] }
    ];
  }

  function sEssentiel() {
    var irrPP = DATA.verbs.raw.filter(function (r) { return r.pp; }).slice(0, 27)
      .map(function (r) { return r.inf + ' → <b>' + r.pp + '</b>'; });

    var p1 = {
      title: 'L’antisèche — 1 / 2', sub: 'Articles, prépositions, pronoms · à garder sous les yeux',
      blocks: [
        { t: 'h2', text: 'Articles définis et indéfinis' },
        { t: 'table', zebra: true, w: [1, 1.2, 1.5, 1],
          head: ['', 'devant consonne', 's + cons., z, ps, gn, y', 'voyelle'],
          rows: [
            [{ c: '<b>m. sing.</b>' }, 'il / un', 'lo / uno', 'l’ / un'],
            [{ c: '<b>m. plur.</b>' }, 'i', 'gli', 'gli'],
            [{ c: '<b>f. sing.</b>' }, 'la / una', 'la / una', 'l’ / un’'],
            [{ c: '<b>f. plur.</b>' }, 'le', 'le', 'le']
          ] },
        { t: 'h2', text: 'Prépositions articulées' },
        { t: 'table', zebra: true,
          head: ['', 'il', 'lo', 'l’', 'i', 'gli', 'la', 'le'],
          rows: [
            [{ c: '<b>a</b>' }, 'al', 'allo', 'all’', 'ai', 'agli', 'alla', 'alle'],
            [{ c: '<b>di</b>' }, 'del', 'dello', 'dell’', 'dei', 'degli', 'della', 'delle'],
            [{ c: '<b>da</b>' }, 'dal', 'dallo', 'dall’', 'dai', 'dagli', 'dalla', 'dalle'],
            [{ c: '<b>in</b>' }, 'nel', 'nello', 'nell’', 'nei', 'negli', 'nella', 'nelle'],
            [{ c: '<b>su</b>' }, 'sul', 'sullo', 'sull’', 'sui', 'sugli', 'sulla', 'sulle']
          ] },
        { t: 'h2', text: 'Pronoms' },
        { t: 'table', zebra: true,
          head: ['Directs', 'Indirects', 'Combinés (+ lo)'],
          rows: [['mi, ti, lo, la, ci, vi, li, le', 'mi, ti, gli, le, ci, vi, gli',
                  'me lo, te lo, glielo, ce lo, ve lo, glielo']] },
        { t: 'box', title: 'Réflexes', runs:
          '<b>NE</b> = une partie (<i>Ne prendo due</i>) · <b>CI</b> = lieu / y (<i>Ci vado</i>) · ' +
          '<b>Ce l’ho</b> = je l’ai (sur moi) · <b>Ci vuole / Ci vogliono</b> = il faut · ' +
          '<b>Ci metto</b> = je mets (durée) · <b>Bisogna + inf.</b> = il faut · ' +
          '<b>Ho bisogno di</b> = j’ai besoin de' },
        { t: 'h2', text: 'Quantité' },
        { t: 'p', runs: '<b>Adverbe</b> (après un verbe, devant un adjectif) → invariable : ' +
          '<i>Ho mangiato molto. È molto bella.</i><br><b>Adjectif</b> (devant un nom) → accord : ' +
          '<i>molta fame, molte persone, pochi amici, troppe macchine.</i>' },
        { t: 'h2', text: 'Bello / quello' },
        { t: 'p', runs: 'Suivent l’article défini : <b>bel</b> libro · <b>bello</b> studente · ' +
          '<b>bell’</b>amico · <b>bei</b> libri · <b>begli</b> occhi · <b>bella</b> casa · <b>belle</b> case.' }
      ]
    };

    var p2 = {
      title: 'L’antisèche — 2 / 2', sub: 'Verbes : temps, participes, irréguliers',
      blocks: [
        { t: 'h2', text: 'Terminaisons à connaître' },
        { t: 'table', zebra: true, w: [1, 1.5, 1.3, 1.3],
          head: ['Temps', '-ARE', '-ERE', '-IRE'],
          rows: [
            [{ c: '<b>Presente</b>' }, 'o, i, a, iamo, ate, ano', 'o, i, e, iamo, ete, ono', 'o, i, e, iamo, ite, ono'],
            [{ c: '<b>Imperfetto</b>' }, { c: 'radical + vo, vi, va, vamo, vate, vano', span: 3 }],
            [{ c: '<b>Futuro</b>' }, '-ER- + ò, ai, à, emo, ete, anno', '-ER- + …', '-IR- + …'],
            [{ c: '<b>Congiuntivo</b>' }, 'i, i, i, iamo, iate, ino', 'a, a, a, iamo, iate, ano', 'a, a, a, iamo, iate, ano'],
            [{ c: '<b>Condizionale</b>' }, { c: 'radical du futur + ei, esti, ebbe, emmo, este, ebbero', span: 3 }],
            [{ c: '<b>Participio</b>' }, '-ato', '-uto', '-ito'],
            [{ c: '<b>Gerundio</b>' }, '-ando', '-endo', '-endo']
          ] },
        { t: 'h2', text: 'Futur : radicaux irréguliers' },
        { t: 'p', runs: 'essere → <b>sarò</b> · avere → <b>avrò</b> · fare → <b>farò</b> · andare → <b>andrò</b> · ' +
          'dovere → <b>dovrò</b> · potere → <b>potrò</b> · volere → <b>vorrò</b> · sapere → <b>saprò</b> · ' +
          'vedere → <b>vedrò</b> · vivere → <b>vivrò</b> · venire → <b>verrò</b> · rimanere → <b>rimarrò</b> · ' +
          'tenere → <b>terrò</b> · bere → <b>berrò</b> · dare → <b>darò</b> · stare → <b>starò</b>.' },
        { t: 'note', runs: 'pagare → pagherò · cercare → cercherò · mangiare → mangerò · cominciare → comincerò' },
        { t: 'h2', text: 'Participes passés irréguliers' },
        { t: 'p', runs: irrPP.join(' · ') },
        { t: 'h2', text: 'Auxiliaire ESSERE' },
        { t: 'p', runs: 'andare, venire, partire, arrivare, tornare, entrare, uscire, salire, scendere, ' +
          'restare, rimanere, nascere, morire, diventare, piacere, essere, stare + <b>tous les verbes ' +
          'réfléchis</b>. Le participe s’accorde avec le sujet.' },
        { t: 'box', title: 'Avec AVERE', runs: 'Participe invariable… <b>sauf</b> devant lo / la / li / le : ' +
          '<i>La pizza? L’ho mangiata. I libri? Li ho letti.</i>' }
      ]
    };
    return [p1, p2];
  }

  function sDialogue(sel) {
    return DATA.dialogues.filter(function (d) { return sel.indexOf(d.id) >= 0; }).map(function (d) {
      var blocks = [{
        t: 'table', zebra: true, w: [0.9, 2.4, 2.4],
        head: ['Rôle', 'Italiano', 'Français'],
        rows: d.lines.map(function (l) { return [{ c: '<b>' + l.who + '</b>' }, l.it, l.fr]; })
      }];
      if (d.useful && d.useful.length) {
        blocks.push({ t: 'box', title: 'Expressions clés', runs:
          d.useful.map(function (u) { return '<b>' + u.it + '</b> — ' + u.fr; }).join('<br>') });
      }
      return { title: d.title, sub: d.context + ' — ' + d.ue, blocks: blocks };
    });
  }

  function sProgramme() {
    var out = DATA.program.map(function (ue) {
      return {
        title: ue.ue + ' — ' + ue.title,
        sub: ue.subtitle + ' · ' + ue.sections.length + ' points',
        blocks: [{
          t: 'table', w: [2, 2.4, 0.7],
          head: ['Point du programme', 'Détail', 'Vu / Su'],
          rows: ue.sections.map(function (s) {
            return [{ c: '<b>' + s.title + '</b>' },
                    { c: '<i>' + (s.points || []).slice(0, 4).join(' · ') + '</i>' },
                    '☐  ☐'];
          })
        }]
      };
    });
    out.push({
      title: 'Compétences de communication', sub: 'À cocher au fil de l’année',
      blocks: [{ t: 'table', w: [4, 0.7], rows: DATA.competenze.map(function (c) { return [c, '☐  ☐']; }) }]
    });
    return out;
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
      default: return [];
    }
  }

  /* ========================= index ===================================== */
  function index() {
    var h = U.pageHead('Le cours', 'Fiches à imprimer 🖨',
      'Composez la fiche, regardez l’aperçu, puis téléchargez le PDF ou imprimez-la. ' +
      'Le PDF est généré sur votre appareil : rien n’est envoyé sur Internet.');

    h += '<div class="grid c2">' + SHEETS.map(function (s) {
      return '<div class="sheet-card"><div class="ic">' + s.ic + '</div><div style="flex:1">' +
        '<h4>' + E(s.t) + '</h4><p>' + E(s.d) + '</p>' +
        '<a class="btn sm primary" href="#/stampa/' + s.id + '">Préparer la fiche</a></div></div>';
    }).join('') + '</div>';

    h += '<div class="card mt2"><h3>💡 Trois façons de récupérer une fiche</h3>' +
      '<ul class="small" style="padding-left:18px;line-height:1.9;margin:0">' +
      '<li><b>Aperçu PDF</b> — voyez le rendu exact, page par page, avant de vous décider.</li>' +
      '<li><b>Télécharger le PDF</b> — un vrai fichier PDF, texte net et sélectionnable, ' +
      'que vous pouvez garder sur votre téléphone ou envoyer à imprimer.</li>' +
      '<li><b>Imprimer</b> — envoi direct à l’imprimante depuis le navigateur.</li>' +
      '</ul></div>';
    return h;
  }

  /* ======================== constructeur =============================== */
  var pickers = {
    vocabulaire: { src: 'vocab', label: 'Thèmes de vocabulaire', def: 3 },
    test:        { src: 'vocab', label: 'Thèmes à tester', def: 1 },
    cartes:      { src: 'vocab', label: 'Thèmes à transformer en cartes', def: 2 },
    verbes:      { src: 'verbs', label: 'Verbes à conjuguer', def: 8 },
    grammaire:   { src: 'grammar', label: 'Leçons à imprimer', def: 3 },
    exercices:   { src: 'ex', label: 'Points travaillés (aucun coché = tout le programme)', def: 0 },
    dialogue:    { src: 'dial', label: 'Dialogues', def: 2 },
    essentiel:   { src: null },
    programme:   { src: null }
  };

  function options(src) {
    if (src === 'vocab') return DATA.vocab.map(function (t) { return { v: t.id, l: t.icon + ' ' + t.title }; });
    if (src === 'verbs') return DATA.verbs.all.map(function (v) { return { v: v.inf, l: v.inf + ' — ' + v.fr }; });
    if (src === 'grammar') return DATA.grammar.map(function (g) { return { v: g.id, l: g.icon + ' ' + g.title }; });
    if (src === 'ex') return DATA.exercises.map(function (g) { return { v: g.topic, l: g.title }; });
    if (src === 'dial') return DATA.dialogues.map(function (d) { return { v: d.id, l: d.icon + ' ' + d.title }; });
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
        '<div class="picker" id="pick">' +
        opts.map(function (o, i) {
          return '<button class="chip ' + (i < p.def ? 'on' : '') + '" data-v="' + E(o.v) + '">' + E(o.l) + '</button>';
        }).join('') + '</div>' +
        '<div class="row mt"><button class="btn sm" id="all">Tout sélectionner</button>' +
        '<button class="btn sm" id="none">Tout désélectionner</button>' +
        (id === 'exercices' ? '<span class="spacer"></span><label class="field mb0">Nombre</label>' +
          '<select id="exn" style="max-width:100px"><option>10</option><option selected>20</option>' +
          '<option>30</option><option>40</option></select>' : '') +
        '</div></div>';
    }

    h += '<div class="print-toolbar">' +
      '<div class="seg" id="mode">' +
        '<button class="seg-b on" data-m="page">Aperçu page</button>' +
        '<button class="seg-b" data-m="pdf">Aperçu PDF</button>' +
      '</div>' +
      '<button class="btn primary" id="dl">⬇ Télécharger le PDF</button>' +
      '<button class="btn" id="print">🖨 Imprimer</button>' +
      '<span class="muted small" id="pgc"></span>' +
      '</div></div>';

    h += '<div id="preview"></div><div id="pdfview" class="hidden"></div>';
    return h;
  }

  /* Certaines plateformes d'hébergement interdisent le téléchargement direct
     et exposent à la place une API d'enregistrement. On la résout une fois,
     sans jamais en dépendre : ailleurs, elle reste simplement absente. */
  var hostSaver = null;
  (function resolveHostSaver() {
    try {
      if (window.claude && typeof window.claude.use === 'function') {
        Promise.resolve(window.claude.use('downloads')).then(function (d) {
          hostSaver = (d && typeof d.save === 'function') ? d : null;
        }, function () { hostSaver = null; });
      }
    } catch (e) { hostSaver = null; }
  })();

  /* ============================ montage ================================= */
  function mount(root, p) {
    var id = p[0];
    if (!id) return;
    var pk = pickers[id];
    var currentUrl = null, currentBlob = null, mode = 'page', dirty = true;

    function selection() {
      var s = [];
      root.querySelectorAll('#pick .chip.on').forEach(function (c) { s.push(c.getAttribute('data-v')); });
      return s;
    }

    function model() {
      var extra = root.querySelector('#exn') ? +root.querySelector('#exn').value : null;
      return generate(id, pk.src ? selection() : [], extra);
    }

    function fileName() {
      return 'impariamo-' + id + '.pdf';
    }

    function revoke() {
      if (currentUrl) { URL.revokeObjectURL(currentUrl); currentUrl = null; }
      currentBlob = null;
    }

    function empty() {
      return pk.src && !selection().length && id !== 'exercices';
    }

    function drawPage() {
      var pv = root.querySelector('#preview');
      if (empty()) {
        pv.innerHTML = '<div class="card center muted no-print">Sélectionnez au moins un élément ci-dessus pour composer la fiche.</div>';
        root.querySelector('#pgc').textContent = '';
        return;
      }
      var sheets = model();
      pv.innerHTML = SH.html(sheets);
      root.querySelector('#pgc').textContent = sheets.length + ' fiche' + (sheets.length > 1 ? 's' : '');
    }

    function buildPdf(cb) {
      var pv = root.querySelector('#pdfview');
      pv.innerHTML = '<div class="card center muted">Génération du PDF…</div>';
      /* laisse le navigateur peindre l'état « en cours » avant de calculer */
      setTimeout(function () {
        var sheets = model();
        if (!sheets.length) { pv.innerHTML = U.empty('Rien à générer.'); return; }
        var meta = SHEETS.filter(function (x) { return x.id === id; })[0];
        var doc = SH.pdf(sheets, { title: 'Impariamo l’italiano — ' + (meta ? meta.t : id) });
        revoke();
        currentBlob = doc.blob();
        currentUrl = URL.createObjectURL(currentBlob);
        dirty = false;
        cb(currentUrl, doc.pageCount(), currentBlob);
      }, 30);
    }

    function showPdf() {
      var pv = root.querySelector('#pdfview');
      if (empty()) {
        pv.innerHTML = '<div class="card center muted">Sélectionnez au moins un élément ci-dessus.</div>';
        return;
      }
      buildPdf(function (url, pages) {
        pv.innerHTML =
          '<div class="pdf-frame"><iframe title="Aperçu du PDF" src="' + url + '#view=FitH"></iframe></div>' +
          '<div class="row mt" style="justify-content:center">' +
          '<a class="btn" href="' + url + '" target="_blank" rel="noopener">↗ Ouvrir dans un nouvel onglet</a>' +
          '<button class="btn primary" id="dl2">⬇ Télécharger</button></div>' +
          '<p class="xs muted center mt">L’aperçu ne s’affiche pas ? Certains navigateurs mobiles ' +
          'n’intègrent pas les PDF : utilisez « Ouvrir dans un nouvel onglet » ou « Télécharger ».</p>';
        root.querySelector('#pgc').textContent = pages + ' page' + (pages > 1 ? 's' : '');
        root.querySelector('#dl2').addEventListener('click', download);
      });
    }

    /* Enregistrement du fichier.
       Dans une page hébergée classiquement (site, fichier local), un lien
       « download » suffit. Dans un cadre qui interdit les téléchargements
       directs, on passe par l'API d'enregistrement de l'hôte si elle existe. */
    function save(blob, url) {
      if (hostSaver) {
        hostSaver.save({ filename: fileName(), data: blob }).then(function (r) {
          U.toast(r && r.status === 'delivered' ? 'PDF transmis' : 'PDF enregistré');
        }, function (err) {
          var code = err && err.code;
          if (code === 'declined') return;
          U.toast('Enregistrement refusé ici — utilisez « Ouvrir dans un nouvel onglet »');
        });
        return;
      }
      var a = document.createElement('a');
      a.href = url; a.download = fileName(); a.rel = 'noopener';
      document.body.appendChild(a); a.click();
      setTimeout(function () { a.remove(); }, 0);
      U.toast('PDF téléchargé');
    }

    function download() {
      if (empty()) { U.toast('Sélectionnez au moins un élément'); return; }
      if (currentUrl && currentBlob && !dirty) save(currentBlob, currentUrl);
      else buildPdf(function (url, pages, blob) { save(blob, url); if (mode === 'pdf') showPdf(); });
    }

    function refresh() {
      dirty = true;
      if (mode === 'page') drawPage();
      else showPdf();
    }

    /* --- interactions --- */
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

    root.querySelectorAll('#mode .seg-b').forEach(function (b) {
      b.addEventListener('click', function () {
        root.querySelectorAll('#mode .seg-b').forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        mode = b.getAttribute('data-m');
        root.querySelector('#preview').classList.toggle('hidden', mode !== 'page');
        root.querySelector('#pdfview').classList.toggle('hidden', mode !== 'pdf');
        if (mode === 'pdf') { if (dirty || !currentUrl) showPdf(); }
        else drawPage();
      });
    });

    root.querySelector('#dl').addEventListener('click', download);
    root.querySelector('#print').addEventListener('click', function () {
      if (mode !== 'page') {
        root.querySelectorAll('#mode .seg-b')[0].click();
      }
      try { window.print(); }
      catch (e) { U.toast('Utilisez Ctrl/⌘ + P pour imprimer'); }
    });

    drawPage();
    root._revoke = revoke;
  }

  function render(p) { return p[0] ? builder(p[0]) : index(); }
  function unmount() {
    var m = document.getElementById('main');
    if (m && m._revoke) { m._revoke(); m._revoke = null; }
  }

  return { title: 'Fiches à imprimer', render: render, mount: mount, unmount: unmount,
           __buildForTests: generate };
})();
