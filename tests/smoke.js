const { chromium } = require('playwright');
const path = require('path');
const ROOT = process.argv[2] || path.join(__dirname, '..');
const BASE = 'file://' + path.join(ROOT, 'index.html');

const ROUTES = [
  '#/', '#/programma', '#/lezioni', '#/lezioni/presente', '#/lezioni/pronomi-combinati',
  '#/lessico', '#/dialoghi', '#/dialoghi/dial-bar', '#/dialoghi/mail',
  '#/verbi', '#/verbi/essere', '#/verbi/alzarsi', '#/verbi/drill',
  '#/flashcards', '#/flashcards/bar', '#/flashcards/verbi', '#/flashcards/tutto',
  '#/esercizi', '#/esercizi/tutto', '#/esercizi/imperativo',
  '#/giochi', '#/giochi/abbinamento', '#/giochi/cronometro', '#/giochi/impiccato',
  '#/giochi/intruso', '#/giochi/ordine', '#/giochi/duello',
  '#/sessione',
  '#/stampa', '#/stampa/vocabulaire', '#/stampa/test', '#/stampa/cartes',
  '#/stampa/verbes', '#/stampa/grammaire', '#/stampa/exercices',
  '#/stampa/essentiel', '#/stampa/dialogue', '#/stampa/programme'
];

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push('[console] ' + m.text()); });
  page.on('pageerror', e => errors.push('[pageerror] ' + e.message));

  for (const r of ROUTES) {
    const before = errors.length;
    await page.goto(BASE + r, { waitUntil: 'load' });
    await page.waitForTimeout(320);
    const main = await page.$eval('#main', el => el.innerText.trim().length).catch(() => 0);
    const hasBtns = await page.$$eval('#main button, #main a', els => els.length).catch(() => 0);
    const newErr = errors.length - before;
    console.log((newErr ? '❌' : main > 40 ? '✅' : '⚠️ ') + ' ' + r.padEnd(28) +
      ' text=' + String(main).padStart(6) + ' interactive=' + String(hasBtns).padStart(4) +
      (newErr ? '  ERRORS:' + newErr : ''));
  }

  console.log('\n=== ERREURS (' + errors.length + ') ===');
  [...new Set(errors)].forEach(e => console.log(' •', e));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
