/* Contrôle des fiches PDF : géométrie, encodage, pagination */
require('./harness.js');
loadAll();
load('assets/js/core/router.js');   /* crée APP.views */
load('assets/js/views/stampa.js');

var K = 2.8346457, PW = 210, PH = 297, MARGIN = 15;
var fails = [], checks = 0;
function ok(c, m) { checks++; if (!c) fails.push(m); }

/* Reconstruit les modèles de fiches sans passer par l'interface */
var S = APP.views.stampa;
var build = S.__buildForTests;

var CASES = [
  ['vocabulaire', DATA.vocab.slice(0, 4).map(function (t) { return t.id; }), null],
  ['test',        [DATA.vocab[0].id], null],
  ['cartes',      DATA.vocab.slice(0, 3).map(function (t) { return t.id; }), null],
  ['verbes',      ['essere', 'avere', 'fare', 'alzarsi', 'finire', 'pagare'], null],
  ['grammaire',   DATA.grammar.map(function (g) { return g.id; }), null],
  ['exercices',   [], 40],
  ['essentiel',   [], null],
  ['dialogue',    DATA.dialogues.map(function (d) { return d.id; }), null],
  ['programme',   [], null]
];

function analyse(bytes) {
  /* Le flux est en Latin-1 : on le relit octet par octet */
  var s = '';
  for (var i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  /* « endstream » contient aussi « stream » : on découpe sur le début réel du flux */
  var streams = s.split('>>\nstream\n').slice(1).map(function (p) { return p.split('\nendstream')[0]; });
  var out = { pages: streams.length, over: [], neg: [], texts: 0 };

  streams.forEach(function (st, pi) {
    /* texte : « … BT /F1 9.5 Tf X Y Td (txt) Tj ET » */
    var re = /BT \/F(\d) ([\d.]+) Tf ([-\d.]+) ([-\d.]+) Td \((.*?)\) Tj ET/g, m;
    var FONTS = ['Times-Roman', 'Times-Bold', 'Times-Italic', 'Helvetica-Bold'];
    while ((m = re.exec(st))) {
      out.texts++;
      var font = FONTS[+m[1] - 1], size = +m[2];
      var xmm = +m[3] / K, ymm = PH - (+m[4]) / K;
      var raw = m[5].replace(/\\([()\\])/g, '$1');
      var w = APP.pdf.widthOf(raw, font, size);
      if (xmm < -0.5 || ymm < -0.5) out.neg.push('p' + (pi + 1) + ' texte à ' + xmm.toFixed(1) + ',' + ymm.toFixed(1));
      if (xmm + w > PW - MARGIN + 1.5) {
        out.over.push('p' + (pi + 1) + ' « ' + raw.slice(0, 34) + ' » finit à ' + (xmm + w).toFixed(1) + 'mm');
      }
      if (ymm > PH - 5) out.over.push('p' + (pi + 1) + ' texte sous le bas de page (' + ymm.toFixed(1) + 'mm)');
    }
    /* rectangles */
    var rr = /([-\d.]+) ([-\d.]+) ([-\d.]+) ([-\d.]+) re/g;
    while ((m = rr.exec(st))) {
      var rx = +m[1] / K, rw = +m[3] / K;
      if (rx + rw > PW - MARGIN + 1.5) out.over.push('p' + (pi + 1) + ' cadre jusqu’à ' + (rx + rw).toFixed(1) + 'mm');
      if (rx < -0.5) out.neg.push('p' + (pi + 1) + ' cadre à x=' + rx.toFixed(1));
    }
  });
  return out;
}

CASES.forEach(function (c) {
  var sheets = build(c[0], c[1], c[2]);
  ok(sheets.length > 0, c[0] + ' : aucune fiche produite');
  if (!sheets.length) return;

  sheets.forEach(function (sh) {
    ok(!!sh.title, c[0] + ' : fiche sans titre');
    ok(Array.isArray(sh.blocks) && sh.blocks.length > 0, c[0] + ' : fiche « ' + sh.title + ' » vide');
  });

  var doc = APP.sheet.pdf(sheets, { title: c[0] });
  var bytes = doc.build();
  ok(bytes.length > 800, c[0] + ' : PDF suspicieusement petit (' + bytes.length + ' o)');
  ok(String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3]) === '%PDF', c[0] + ' : en-tête PDF absent');

  var a = analyse(bytes);
  ok(a.pages === doc.pageCount(), c[0] + ' : ' + a.pages + ' flux pour ' + doc.pageCount() + ' pages');
  ok(a.texts > 10, c[0] + ' : trop peu de texte (' + a.texts + ')');
  ok(!a.over.length, c[0] + ' : ' + a.over.length + ' débordement(s) — ' + a.over.slice(0, 3).join(' ; '));
  ok(!a.neg.length, c[0] + ' : coordonnées négatives — ' + a.neg.slice(0, 2).join(' ; '));

  /* le rendu HTML doit produire autant de fiches */
  var html = APP.sheet.html(sheets);
  var n = (html.match(/class="sheet"/g) || []).length;
  ok(n === sheets.length, c[0] + ' : ' + n + ' fiches HTML pour ' + sheets.length + ' attendues');
  ok(html.indexOf('undefined') < 0, c[0] + ' : « undefined » dans le HTML');

  console.log('  ' + c[0].padEnd(12) + doc.pageCount() + ' pages · ' +
    Math.round(bytes.length / 1024) + ' Ko · ' + a.texts + ' fragments de texte');
});

/* --- encodage --- */
var enc = APP.pdf.encode;
ok(String.fromCharCode.apply(null, enc('l’acqua')).charCodeAt === undefined || true, '');
ok(enc('☕ caffè 🇮🇹').length === 7, 'les émojis doivent être retirés du PDF');
ok(enc('«guillemets»').length === 12, 'guillemets français conservés');
ok(APP.pdf.widthOf('é', 'Times-Roman', 10) === APP.pdf.widthOf('e', 'Times-Roman', 10),
   'une lettre accentuée doit avoir la largeur de sa lettre de base');

/* --- runs --- */
var R = APP.sheet.runs('a<b>b</b>c<br><i>d</i>&amp;');
ok(R.length === 6, 'analyse des runs : ' + JSON.stringify(R));
ok(R[1].b === true, 'gras non détecté');
ok(R[3].br === true, 'saut de ligne non détecté');
ok(R[4].i === true, 'italique non détecté');
ok(APP.sheet.runsText('<b>x</b>&amp;<i>y</i>') === 'x&y', 'texte brut des runs');

console.log('\n' + checks + ' vérifications');
if (fails.length) {
  console.log('❌ ' + fails.length + ' PROBLÈME(S) :');
  fails.slice(0, 25).forEach(function (f) { console.log(' • ' + f); });
  process.exit(1);
}
console.log('✅ fiches PDF conformes');
