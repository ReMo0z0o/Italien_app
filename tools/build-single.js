/* =========================================================================
   Construit une version autonome en un seul fichier.
   → dist/impariamo.html   page complète, à ouvrir n'importe où, hors ligne
   → dist/artifact.html    même page sans <html>/<head>/<body> (pour un hébergeur
                           qui fournit lui-même l'enveloppe)
   Usage : node tools/build-single.js
   ========================================================================= */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

/* L'ordre est celui de index.html : il compte (les données avant les vues). */
const CSS = ['assets/css/base.css', 'assets/css/components.css', 'assets/css/print.css'];
const JS = [
  'assets/js/data/vocab.js', 'assets/js/data/verbs.js', 'assets/js/data/grammar.js',
  'assets/js/data/exercises.js', 'assets/js/data/phrases.js', 'assets/js/data/program.js',
  'assets/js/core/util.js', 'assets/js/core/speech.js', 'assets/js/core/store.js',
  'assets/js/core/ui.js', 'assets/js/core/router.js',
  'assets/js/views/home.js', 'assets/js/views/programma.js', 'assets/js/views/lezioni.js',
  'assets/js/views/lessico.js', 'assets/js/views/dialoghi.js', 'assets/js/views/verbi.js',
  'assets/js/views/flashcards.js', 'assets/js/views/esercizi.js', 'assets/js/views/giochi.js',
  'assets/js/views/sessione.js', 'assets/js/views/stampa.js',
  'assets/js/app.js'
];

/* Vérifie que rien n'a été oublié par rapport à index.html */
const html = read('index.html');
[...CSS, ...JS].forEach(f => {
  if (!html.includes(f)) throw new Error(f + ' n’est pas référencé dans index.html');
});
(html.match(/(?:href|src)="(assets\/[^"]+)"/g) || []).forEach(m => {
  const f = m.replace(/^.*="/, '').replace(/"$/, '');
  if (![...CSS, ...JS].includes(f)) throw new Error(f + ' manque dans le bundle');
});

const style = '<style>\n' + CSS.map(f => '/* ' + f + ' */\n' + read(f)).join('\n') + '\n</style>';
const script = '<script>\n' + JS.map(f => '/* ' + f + ' */\n' + read(f)).join('\n') + '\n<\/script>';

const TITLE = 'Impariamo l’italiano';
const BODY = `<div class="app" id="app">
  <noscript>
    <div style="padding:30px;max-width:640px;margin:auto">
      <h1>${TITLE} 🇮🇹</h1>
      <p>Cette application a besoin de JavaScript pour fonctionner. Activez-le dans votre navigateur, puis rechargez la page.</p>
    </div>
  </noscript>
</div>`;

const ICON = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>" +
  "<rect width='11' height='32' fill='%230a8754'/><rect x='11' width='10' height='32' fill='%23fff'/>" +
  "<rect x='21' width='11' height='32' fill='%23c8362f'/></svg>";

const full = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${TITLE} — apprendre l’italien (UE1 → UE3)</title>
<meta name="description" content="Application d'apprentissage de l'italien suivant le programme UE1, UE2 et UE3 : flashcards, exercices, jeux, dialogues, conjugaison et fiches imprimables.">
<meta name="theme-color" content="#0a8754">
<link rel="icon" href="${ICON}">
${style}
</head>
<body>
${BODY}
${script}
</body>
</html>
`;

/* Fragment : pas de doctype ni d'enveloppe, le <title> reste en tête du fichier */
const fragment = `<title>${TITLE}</title>
${style}
${BODY}
${script}
`;

fs.mkdirSync(path.join(ROOT, 'dist'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'dist/impariamo.html'), full);
fs.writeFileSync(path.join(ROOT, 'dist/artifact.html'), fragment);

const kb = f => (fs.statSync(path.join(ROOT, f)).size / 1024).toFixed(0) + ' Ko';
console.log('dist/impariamo.html  ' + kb('dist/impariamo.html') + '  (page complète autonome)');
console.log('dist/artifact.html   ' + kb('dist/artifact.html') + '  (fragment)');
