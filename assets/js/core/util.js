/* ===== Utilitaires partagés ============================================ */
window.APP = window.APP || {};

APP.util = (function () {
  'use strict';

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function sample(arr, n) { return shuffle(arr).slice(0, n); }
  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* Retire accents, apostrophes typographiques, ponctuation, casse */
  function norm(s) {
    return String(s == null ? '' : s)
      .toLowerCase()
      .replace(/[’‘`´]/g, "'")
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[.,!?;:«»"()]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /* Compare en gardant les accents (pour détecter « presque juste ») */
  function normKeepAccents(s) {
    return String(s == null ? '' : s)
      .toLowerCase()
      .replace(/[’‘`´]/g, "'")
      .replace(/[.,!?;:«»"()]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function levenshtein(a, b) {
    if (a === b) return 0;
    var m = a.length, n = b.length;
    if (!m) return n; if (!n) return m;
    var prev = new Array(n + 1), cur = new Array(n + 1), i, j;
    for (j = 0; j <= n; j++) prev[j] = j;
    for (i = 1; i <= m; i++) {
      cur[0] = i;
      for (j = 1; j <= n; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1,
          prev[j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1));
      }
      var tmp = prev; prev = cur; cur = tmp;
    }
    return prev[n];
  }

  /**
   * Vérifie une réponse libre.
   * → { ok:true }                exact (accents près)
   * → { ok:true, near:'accent' } juste mais accent/apostrophe manquant
   * → { ok:false, near:'typo' }  faute de frappe (1 caractère)
   * → { ok:false }
   */
  function check(given, expected, alts) {
    var list = [expected].concat(alts || []);
    var g = norm(given), gA = normKeepAccents(given);
    if (!g) return { ok: false };
    for (var i = 0; i < list.length; i++) {
      var e = list[i];
      if (gA === normKeepAccents(e)) return { ok: true };
      if (g === norm(e)) return { ok: true, near: 'accent' };
    }
    for (var k = 0; k < list.length; k++) {
      var d = levenshtein(g, norm(list[k]));
      if (d <= (norm(list[k]).length > 6 ? 2 : 1)) return { ok: false, near: 'typo' };
    }
    return { ok: false };
  }

  /* Retire l'article initial pour un affichage/quiz plus propre */
  function stripArticle(it) {
    return String(it).replace(/^(il|lo|la|i|gli|le|l’|l'|un|uno|una|un’|un')\s*/i, '');
  }

  /* Première partie avant «/» ou «,» — utile pour la synthèse vocale */
  function firstForm(s) {
    return String(s).split(/[\/,;(]/)[0].trim();
  }

  function plural(n, one, many) { return n + ' ' + (n > 1 ? (many || one + 's') : one); }

  function fmtTime(sec) {
    var m = Math.floor(sec / 60), s = sec % 60;
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function debounce(fn, ms) {
    var t; return function () {
      var a = arguments, self = this;
      clearTimeout(t); t = setTimeout(function () { fn.apply(self, a); }, ms || 200);
    };
  }

  function todaySeed() {
    var d = new Date();
    return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  }

  /* Choix pseudo-aléatoire mais stable dans la journée */
  function pickOfDay(arr, offset) {
    if (!arr.length) return null;
    var s = (todaySeed() + (offset || 0) * 7919) % arr.length;
    return arr[s];
  }

  return {
    shuffle: shuffle, sample: sample, pick: pick, esc: esc, norm: norm,
    normKeepAccents: normKeepAccents, levenshtein: levenshtein, check: check,
    stripArticle: stripArticle, firstForm: firstForm, plural: plural,
    fmtTime: fmtTime, debounce: debounce, pickOfDay: pickOfDay, todaySeed: todaySeed
  };
})();
