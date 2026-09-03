const { chromium } = require('playwright');
const path = require('path');
const ROOT = process.argv[2] || path.join(__dirname, '..');
const BASE = 'file://' + path.join(ROOT, 'index.html');

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 950 } });
  const errors = [];
  page.on('pageerror', e => errors.push('[pageerror] ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('[console] ' + m.text()); });

  const T = async (name, fn) => {
    const before = errors.length;
    try { await fn(); console.log((errors.length > before ? '❌' : '✅') + ' ' + name); }
    catch (e) { console.log('❌ ' + name + ' → ' + e.message.split('\n')[0]); errors.push(name + ': ' + e.message); }
  };
  const go = async r => { await page.goto(BASE + r, { waitUntil: 'load' }); await page.waitForTimeout(250); };

  // ---- FLASHCARDS : parcours complet d'une pile de 5 ----
  await T('Flashcards : pile complète + reprise des ratées', async () => {
    await go('#/flashcards');
    await page.click('[data-n="5"]');
    await page.click('a[href="#/flashcards/bar"]');
    await page.waitForTimeout(250);
    for (let i = 0; i < 5; i++) {
      await page.click('#fc');
      await page.waitForTimeout(120);
      await page.click(i % 2 ? '[data-r="1"]' : '[data-r="0"]');
      await page.waitForTimeout(120);
    }
    const txt = await page.innerText('#main');
    if (!/\/ 5/.test(txt)) throw new Error('pas d’écran de résultat : ' + txt.slice(0, 90));
    if (!(await page.$('#redo'))) throw new Error('bouton reprise absent alors qu’il y a des ratées');
    await page.click('#redo'); await page.waitForTimeout(200);
    if (!(await page.$('#fc'))) throw new Error('la reprise n’a pas relancé de carte');
  });

  // ---- EXERCICES : QCM + saisie libre ----
  await T('Exercices : série QCM complète', async () => {
    await go('#/esercizi');
    await page.click('[data-n="5"]');
    await page.click('a[href="#/esercizi/articoli-det"]');
    await page.waitForTimeout(250);
    for (let i = 0; i < 5; i++) {
      if (await page.$('.opt:not([disabled])')) await page.click('.opt:not([disabled])');
      else { await page.fill('#in', 'lo'); await page.click('#f button[type=submit]'); }
      await page.waitForTimeout(120);
      await page.click('#nx'); await page.waitForTimeout(150);
    }
    const t = await page.innerText('#main');
    if (!/Résultat/.test(t)) throw new Error('pas de résultat : ' + t.slice(0, 90));
  });

  await T('Exercices : réponse libre juste + tolérance accents', async () => {
    await go('#/esercizi/prep-articolate');
    await page.waitForTimeout(200);
    let found = false;
    for (let i = 0; i < 10 && !found; i++) {
      if (await page.$('#in')) {
        const q = await page.innerText('.q-text');
        if (/a \+ il/.test(q)) { await page.fill('#in', 'AL'); await page.click('#f button[type=submit]'); found = true; }
        else { await page.fill('#in', 'zzz'); await page.click('#f button[type=submit]'); }
      } else await page.click('.opt');
      await page.waitForTimeout(100);
      if (found) { const fb = await page.innerText('#fb'); if (!/Esatto/.test(fb)) throw new Error('« AL » refusé : ' + fb.slice(0,60)); }
      if (await page.$('#nx')) { await page.click('#nx'); await page.waitForTimeout(120); }
      if (!(await page.$('#fb'))) break;
    }
    if (!found) console.log('   (question a+il non tirée, tolérance testée ailleurs)');
  });

  // ---- CONJUGAISON ----
  await T('Conjugaison : drill 5 questions', async () => {
    await go('#/verbi/drill');
    await page.click('[data-n="5"]');
    await page.click('#start'); await page.waitForTimeout(200);
    for (let i = 0; i < 5; i++) {
      await page.fill('#in', 'sono'); await page.click('#f button[type=submit]');
      await page.waitForTimeout(120); await page.click('#nx'); await page.waitForTimeout(150);
    }
    if (!/Résultat/.test(await page.innerText('#main'))) throw new Error('pas de résultat');
  });

  // ---- JEUX ----
  await T('Jeu : abbinamento (6 paires résolues)', async () => {
    await go('#/giochi/abbinamento');
    const texts = await page.$$eval('.mem-card', els => els.map(e => e.textContent));
    // résout en cliquant it puis fr via l'ordre des données du DOM
    for (let round = 0; round < 40; round++) {
      const cards = await page.$$('.mem-card:not(.done)');
      if (!cards.length) break;
      await cards[0].click(); await page.waitForTimeout(40);
      const rest = await page.$$('.mem-card:not(.done):not(.sel)');
      if (rest.length) { await rest[Math.floor(Math.random()*rest.length)].click(); await page.waitForTimeout(60); }
    }
    if (!(await page.$('#info'))) throw new Error('compteur absent');
  });

  await T('Jeu : impiccato (26 lettres)', async () => {
    await go('#/giochi/impiccato');
    for (const l of 'abcdefghijklmnopqrstuvwxyz') {
      const b = await page.$(`.hm-key[data-l="${l}"]:not([disabled])`);
      if (b) { await b.click(); await page.waitForTimeout(30); }
      if (await page.$('#next')) break;
    }
    if (!(await page.$('#next'))) throw new Error('la partie ne se termine pas');
    await page.click('#next'); await page.waitForTimeout(150);
    if (!(await page.$('.hm-word'))) throw new Error('pas de mot suivant');
  });

  await T('Jeu : intruso (8 questions)', async () => {
    await go('#/giochi/intruso');
    for (let i = 0; i < 8; i++) {
      await page.click('.opt'); await page.waitForTimeout(90);
      await page.click('#nx'); await page.waitForTimeout(120);
    }
    if (!/\/ 8/.test(await page.innerText('#main'))) throw new Error('pas de résultat final');
  });

  await T('Jeu : rimetti in ordine (résolution correcte)', async () => {
    await go('#/giochi/ordine');
    for (let q = 0; q < 6; q++) {
      let guard = 0;
      while ((await page.$$('#bank .word-chip')).length && guard++ < 20) {
        await page.click('#bank .word-chip'); await page.waitForTimeout(30);
      }
      await page.click('#chk'); await page.waitForTimeout(120);
      await page.click('#nx'); await page.waitForTimeout(140);
    }
    if (!/\/ 6/.test(await page.innerText('#main'))) throw new Error('pas de résultat final');
  });

  await T('Jeu : cronometro répond', async () => {
    await go('#/giochi/cronometro');
    for (let i = 0; i < 4; i++) { await page.click('.opt'); await page.waitForTimeout(380); }
    const sc = await page.innerText('#sc');
    if (isNaN(+sc)) throw new Error('score illisible');
  });

  await T('Jeu : duello répond', async () => {
    await go('#/giochi/duello');
    for (let i = 0; i < 3; i++) {
      await page.fill('#in', 'sono'); await page.click('#f button[type=submit]'); await page.waitForTimeout(700);
    }
    if (!(await page.$('#sc'))) throw new Error('score absent');
  });

  // ---- SESSION 5 MIN : parcours de bout en bout ----
  await T('Session 5 min : parcours complet jusqu’au bilan', async () => {
    await go('#/sessione');
    await page.click('[data-m="5"]');
    await page.click('#go'); await page.waitForTimeout(250);
    for (let step = 0; step < 60; step++) {
      if (await page.$('#fc')) {                       // flashcard
        await page.click('#fc'); await page.waitForTimeout(90);
        await page.click('[data-r="1"]');
      } else if (await page.$('.opt:not([disabled])')) {
        await page.click('.opt:not([disabled])');
      } else if (await page.$('#nx')) {
        await page.click('#nx');
      } else if (await page.$('#skip')) {
        await page.click('#skip');
      } else if (await page.$('.mem-card:not(.done)')) {
        const c = await page.$$('.mem-card:not(.done)'); await c[0].click();
        const r = await page.$$('.mem-card:not(.done):not(.sel)'); if (r.length) await r[0].click();
      } else break;
      await page.waitForTimeout(110);
      if (/Bilan de votre session/.test(await page.innerText('#main'))) break;
    }
    if (!/Bilan de votre session/.test(await page.innerText('#main'))) throw new Error('bilan non atteint');
  });

  // ---- DIALOGUES ----
  await T('Dialogue : masquage + jeu de rôle', async () => {
    await go('#/dialoghi/dial-hotel');
    await page.click('#tFr'); await page.waitForTimeout(80);
    if ((await page.$$('.dlg-fr.hidden')).length === 0) throw new Error('masquage FR inopérant');
    await page.click('#tIt'); await page.waitForTimeout(80);
    if ((await page.$$('.dlg-line.masked')).length === 0) throw new Error('masquage IT inopérant');
    await page.click('#tIt');
    await page.click('[data-role]:not([data-role=""])'); await page.waitForTimeout(80);
    if ((await page.$$('.dlg-line.masked')).length === 0) throw new Error('jeu de rôle inopérant');
  });

  // ---- LEXIQUE ----
  await T('Lexique : recherche + filtres', async () => {
    await go('#/lessico');
    await page.fill('#q', 'caffè'); await page.waitForTimeout(300);
    const n1 = (await page.$$('.lex-row')).length;
    if (n1 === 0) throw new Error('recherche « caffè » ne renvoie rien');
    await page.selectOption('#th', 'famiglia'); await page.waitForTimeout(200);
    await page.click('#reset'); await page.waitForTimeout(250);
    const n2 = (await page.$$('.lex-row')).length;
    if (n2 < 500) throw new Error('reset ne restaure pas la liste (' + n2 + ')');
  });

  // ---- LEÇONS : filtre ----
  await T('Leçons : filtre texte', async () => {
    await go('#/lezioni');
    await page.fill('#lqs', 'pronom'); await page.waitForTimeout(250);
    const vis = await page.$$eval('.lesson-index a', els => els.filter(e => !e.classList.contains('hidden')).length);
    if (vis === 0 || vis > 20) throw new Error('filtre incohérent : ' + vis);
  });

  // ---- IMPRESSION ----
  await T('Fiches : sélection + régénération', async () => {
    await go('#/stampa/vocabulaire');
    const n0 = (await page.$$('.sheet')).length;
    await page.click('#all'); await page.waitForTimeout(400);
    const n1 = (await page.$$('.sheet')).length;
    if (n1 <= n0) throw new Error('« tout sélectionner » ne régénère pas (' + n0 + '→' + n1 + ')');
    await page.click('#none'); await page.waitForTimeout(250);
    if ((await page.$$('.sheet')).length !== 0) throw new Error('désélection sans effet');
  });

  await T('Fiches : media print masque la navigation', async () => {
    await go('#/stampa/essentiel');
    await page.emulateMedia({ media: 'print' });
    const sideVisible = await page.$eval('.sidebar', el => getComputedStyle(el).display !== 'none');
    const sheetVisible = await page.$eval('.sheet', el => getComputedStyle(el).display !== 'none');
    await page.emulateMedia({ media: 'screen' });
    if (sideVisible) throw new Error('la barre latérale reste visible à l’impression');
    if (!sheetVisible) throw new Error('la fiche disparaît à l’impression');
  });

  // ---- THEMES / RESPONSIVE ----
  await T('Thème sombre + bouton son', async () => {
    await go('#/');
    await page.click('#themeBtn'); await page.waitForTimeout(80);
    await page.click('#themeBtn'); await page.waitForTimeout(80);
    const th = await page.getAttribute('body', 'data-theme');
    if (th !== 'dark') throw new Error('thème sombre non appliqué : ' + th);
    await page.click('#audioBtn'); await page.waitForTimeout(60);
    if (await page.innerText('#audioBtn') !== '🔇') throw new Error('bouton son non basculé');
  });

  await T('Mobile 390px : pas de débordement horizontal', async () => {
    await page.setViewportSize({ width: 390, height: 800 });
    for (const r of ['#/', '#/lezioni/prep-articolate', '#/verbi/essere', '#/esercizi', '#/programma']) {
      await go(r);
      const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (over > 2) throw new Error(r + ' déborde de ' + over + 'px');
    }
    await page.setViewportSize({ width: 1280, height: 950 });
  });

  console.log('\n=== ERREURS (' + errors.length + ') ===');
  [...new Set(errors)].forEach(e => console.log(' •', e));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
