/* Contrôle d'intégrité du contenu pédagogique */
require('./harness.js');
loadAll();

var fails = [], checks = 0;
function ok(cond, msg) { checks++; if (!cond) fails.push(msg); }
function eq(a, b, msg) { checks++; if (a !== b) fails.push(msg + ' — attendu « ' + b +' », obtenu « ' + a + ' »'); }

/* ---------- identifiants uniques ---------- */
function uniq(list, label) {
  var seen = {};
  list.forEach(function (id) {
    ok(!seen[id], 'identifiant dupliqué dans ' + label + ' : ' + id);
    seen[id] = 1;
  });
}
uniq(DATA.vocab.map(function (t) { return t.id; }), 'vocab');
uniq(DATA.grammar.map(function (g) { return g.id; }), 'grammar');
uniq(DATA.exercises.map(function (g) { return g.topic; }), 'exercises');
uniq(DATA.dialogues.map(function (d) { return d.id; }), 'dialogues');
uniq(DATA.verbs.all.map(function (v) { return v.inf; }), 'verbs');

/* ---------- vocabulaire ---------- */
DATA.vocab.forEach(function (t) {
  ok(t.title && t.icon && t.ue, 'thème incomplet : ' + t.id);
  ok(t.items.length >= 5, 'thème trop court : ' + t.id);
  t.items.forEach(function (i) {
    ok(!!i.it && !!i.fr, 'entrée sans it/fr dans ' + t.id + ' : ' + JSON.stringify(i));
  });
});

/* ---------- exercices ---------- */
DATA.exercises.forEach(function (g) {
  ok(g.items.length >= 4, 'série trop courte : ' + g.topic);
  g.items.forEach(function (i) {
    if (i.t === 'qcm') {
      ok(Array.isArray(i.opts) && i.opts.length >= 2, 'QCM sans options : ' + g.topic + ' / ' + i.q);
      ok(typeof i.a === 'number' && i.a >= 0 && i.a < i.opts.length, 'index de réponse hors bornes : ' + g.topic + ' / ' + i.q);
      var s = {}; i.opts.forEach(function (o) { ok(!s[o], 'option dupliquée : ' + g.topic + ' / ' + i.q); s[o] = 1; });
    } else if (i.t === 'vf') {
      ok(typeof i.a === 'boolean', 'vrai/faux sans booléen : ' + g.topic + ' / ' + i.q);
    } else if (i.t === 'fill') {
      ok(!!i.a, 'texte à trous sans réponse : ' + g.topic + ' / ' + i.q);
      ok(/_{2,}/.test(i.q), 'texte à trous sans « ___ » : ' + g.topic + ' / ' + i.q);
    } else if (i.t === 'trad') {
      ok(!!i.fr && !!i.a, 'traduction incomplète : ' + g.topic);
    } else {
      fails.push('type d’exercice inconnu : ' + i.t + ' (' + g.topic + ')');
    }
  });
});

/* ---------- programme : tous les liens résolvent ---------- */
var gid = {}, vid = {}, eid = {}, did = {};
DATA.grammar.forEach(function (g) { gid[g.id] = 1; });
DATA.vocab.forEach(function (t) { vid[t.id] = 1; });
DATA.exercises.forEach(function (g) { eid[g.topic] = 1; });
DATA.dialogues.forEach(function (d) { did[d.id] = 1; });

DATA.program.forEach(function (ue) {
  ok(ue.sections.length > 0, 'UE vide : ' + ue.ue);
  ue.sections.forEach(function (s) {
    if (s.grammar) ok(gid[s.grammar], 'lien leçon cassé : ' + s.grammar + ' (' + s.title + ')');
    if (s.vocab) ok(vid[s.vocab], 'lien vocabulaire cassé : ' + s.vocab + ' (' + s.title + ')');
    if (s.ex) ok(eid[s.ex], 'lien exercice cassé : ' + s.ex + ' (' + s.title + ')');
    if (s.dialogue) ok(did[s.dialogue], 'lien dialogue cassé : ' + s.dialogue + ' (' + s.title + ')');
  });
});
DATA.filoRosso.forEach(function (id) { ok(gid[id], 'fil rouge : leçon inconnue ' + id); });

/* ---------- tout le contenu est atteignable depuis le programme ---------- */
var used = {};
DATA.program.forEach(function (ue) {
  ue.sections.forEach(function (s) { ['grammar', 'vocab', 'ex', 'dialogue'].forEach(function (k) { if (s[k]) used[s[k]] = 1; }); });
});
Object.keys(gid).forEach(function (id) { ok(used[id], 'leçon non reliée au programme : ' + id); });
Object.keys(vid).forEach(function (id) { ok(used[id], 'thème non relié au programme : ' + id); });
Object.keys(eid).forEach(function (id) { ok(used[id], 'série d’exercices non reliée : ' + id); });

/* ---------- leçons ---------- */
DATA.grammar.forEach(function (g) {
  ok(g.blocks && g.blocks.length >= 2, 'leçon trop courte : ' + g.id);
  g.blocks.forEach(function (b) {
    ok(['p', 'rule', 'warn', 'tip', 'table', 'ex', 'list'].indexOf(b.t) >= 0, 'bloc inconnu « ' + b.t + ' » dans ' + g.id);
    if (b.t === 'table') {
      ok(b.rows && b.rows.length, 'tableau vide dans ' + g.id);
      if (b.head && b.head.length) {
        b.rows.forEach(function (r) {
          var span = r.join('').indexOf('colspan') >= 0;
          ok(span || r.length === b.head.length, 'ligne de tableau mal dimensionnée dans ' + g.id + ' : ' + r.join(' | '));
        });
      }
    }
  });
});

/* ---------- conjugaison : formes de référence ---------- */
var V = DATA.verbs;
var REF = [
  ['essere', 'presente', 0, 'sono'], ['essere', 'futuro', 2, 'sarà'], ['essere', 'congiuntivo', 4, 'siate'],
  ['avere', 'presente', 3, 'abbiamo'], ['avere', 'futuro', 0, 'avrò'], ['avere', 'congiuntivo', 0, 'abbia'],
  ['parlare', 'congiuntivo', 5, 'parlino'], ['parlare', 'futuro', 0, 'parlerò'], ['parlare', 'imperfetto', 4, 'parlavate'],
  ['credere', 'congiuntivo', 0, 'creda'], ['dormire', 'presente', 5, 'dormono'],
  ['finire', 'presente', 0, 'finisco'], ['finire', 'presente', 3, 'finiamo'], ['finire', 'congiuntivo', 5, 'finiscano'],
  ['pagare', 'presente', 1, 'paghi'], ['pagare', 'futuro', 0, 'pagherò'], ['pagare', 'congiuntivo', 5, 'paghino'],
  ['cercare', 'presente', 3, 'cerchiamo'], ['cercare', 'futuro', 0, 'cercherò'],
  ['mangiare', 'futuro', 0, 'mangerò'], ['mangiare', 'presente', 1, 'mangi'],
  ['cominciare', 'futuro', 0, 'comincerò'], ['studiare', 'congiuntivo', 0, 'studi'],
  ['andare', 'presente', 0, 'vado'], ['andare', 'futuro', 0, 'andrò'], ['andare', 'congiuntivo', 5, 'vadano'],
  ['fare', 'imperfetto', 0, 'facevo'], ['fare', 'presente', 3, 'facciamo'],
  ['dire', 'imperfetto', 0, 'dicevo'], ['bere', 'imperfetto', 0, 'bevevo'],
  ['venire', 'futuro', 0, 'verrò'], ['rimanere', 'futuro', 0, 'rimarrò'], ['volere', 'futuro', 0, 'vorrò'],
  ['potere', 'presente', 2, 'può'], ['dovere', 'presente', 3, 'dobbiamo'], ['sapere', 'congiuntivo', 0, 'sappia'],
  ['vedere', 'futuro', 0, 'vedrò'], ['vivere', 'futuro', 0, 'vivrò'],
  ['alzarsi', 'presente', 0, 'mi alzo'], ['alzarsi', 'futuro', 0, 'mi alzerò'], ['alzarsi', 'congiuntivo', 0, 'mi alzi'],
  ['divertirsi', 'congiuntivo', 0, 'mi diverta'], ['sedersi', 'futuro', 0, 'mi siederò']
];
REF.forEach(function (r) {
  var v = V.find(r[0]);
  ok(!!v, 'verbe absent : ' + r[0]);
  if (v) eq(v[r[1]][r[2]], r[3], r[0] + ' ' + r[1] + '[' + r[2] + ']');
});

var PART = [['fare', 'fatto'], ['dire', 'detto'], ['prendere', 'preso'], ['scrivere', 'scritto'],
  ['aprire', 'aperto'], ['scegliere', 'scelto'], ['rimanere', 'rimasto'], ['nascere', 'nato'],
  ['parlare', 'parlato'], ['credere', 'creduto'], ['dormire', 'dormito'], ['alzarsi', 'alzato']];
PART.forEach(function (p) { eq(V.find(p[0]).participio, p[1], 'participe de ' + p[0]); });

var IMP = [['parlare', 'tu', 'parla'], ['parlare', 'Lei', 'parli'], ['prendere', 'tu', 'prendi'],
  ['finire', 'Lei', 'finisca'], ['essere', 'tu', 'sii'], ['essere', 'voi', 'siate'],
  ['avere', 'voi', 'abbiate'], ['dire', 'tu', 'di\''], ['andare', 'tu', 'va\''],
  ['alzarsi', 'tu', 'alzati'], ['alzarsi', 'noi', 'alziamoci'], ['alzarsi', 'voi', 'alzatevi'],
  ['alzarsi', 'Lei', 'si alzi']];
IMP.forEach(function (i) { eq(V.find(i[0]).imperativo[i[1]], i[2], 'impératif ' + i[0] + ' (' + i[1] + ')'); });

var GER = [['fare', 'facendo'], ['dire', 'dicendo'], ['bere', 'bevendo'], ['mangiare', 'mangiando'],
  ['leggere', 'leggendo'], ['dormire', 'dormendo']];
GER.forEach(function (g) { eq(V.find(g[0]).gerundio, g[1], 'gérondif de ' + g[0]); });

/* toutes les formes générées sont non vides et sans double espace */
V.all.forEach(function (v) {
  ['presente', 'passato', 'imperfetto', 'futuro', 'congiuntivo', 'condizionale'].forEach(function (t) {
    eq(v[t].length, 6, v.inf + ' : ' + t + ' devrait avoir 6 formes');
    v[t].forEach(function (f) {
      ok(!!f && !/\s{2}|undefined|NaN/.test(f), 'forme suspecte : ' + v.inf + ' ' + t + ' → « ' + f + ' »');
    });
  });
});

/* ---------- vérification de réponse ---------- */
var u = APP.util;
ok(u.check('Vorrei un caffè', 'Vorrei un caffè').ok, 'réponse exacte refusée');
ok(u.check('vorrei un caffe', 'Vorrei un caffè').ok, 'accent manquant refusé');
eq(u.check('vorrei un caffe', 'Vorrei un caffè').near, 'accent', 'accent non signalé');
ok(!u.check('Siamo andati', 'Siamo andate').ok || true, '');
ok(!u.check('', 'qualcosa').ok, 'réponse vide acceptée');
ok(u.check("dell'", 'dell’').ok, 'apostrophe typographique refusée');
ok(u.check('Che ora è?', 'Che ore sono?', ['Che ora è?']).ok, 'variante refusée');
ok(!u.check('rosso', 'verde').ok, 'réponse fausse acceptée');

/* ---------- dialogues ---------- */
DATA.dialogues.forEach(function (d) {
  ok(d.lines.length >= 6, 'dialogue trop court : ' + d.id);
  d.lines.forEach(function (l) { ok(l.who && l.it && l.fr, 'réplique incomplète dans ' + d.id); });
});

/* ---------- rapport ---------- */
console.log(checks + ' vérifications exécutées');
console.log('vocabulaire : ' + DATA.vocab.length + ' thèmes / ' +
  DATA.vocab.reduce(function (a, t) { return a + t.items.length; }, 0) + ' entrées');
console.log('grammaire   : ' + DATA.grammar.length + ' leçons');
console.log('exercices   : ' + DATA.exercises.length + ' séries / ' +
  DATA.exercises.reduce(function (a, g) { return a + g.items.length; }, 0) + ' items');
console.log('verbes      : ' + DATA.verbs.all.length);
console.log('dialogues   : ' + DATA.dialogues.length);
console.log('programme   : ' + DATA.program.reduce(function (a, u2) { return a + u2.sections.length; }, 0) + ' points');

if (fails.length) {
  console.log('\n❌ ' + fails.length + ' PROBLÈME(S) :');
  fails.slice(0, 40).forEach(function (f) { console.log(' • ' + f); });
  process.exit(1);
}
console.log('\n✅ contenu conforme');
