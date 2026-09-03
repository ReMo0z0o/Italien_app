/* ===== Mémoire locale (bonus, entièrement optionnelle) =================
   L'application fonctionne à 100 % sans : chaque session est autonome.
   Ce module ne sert qu'à afficher un petit historique et les réglages.
   ====================================================================== */
window.APP = window.APP || {};

APP.store = (function () {
  'use strict';
  var KEY = 'italiano.v1';
  var mem = { theme: 'auto', audio: true, log: [], seen: {} };
  var available = true;

  try {
    var raw = localStorage.getItem(KEY);
    if (raw) mem = Object.assign(mem, JSON.parse(raw));
  } catch (e) { available = false; }

  function save() {
    if (!available) return;
    try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) { available = false; }
  }

  function get(k, d) { return mem[k] === undefined ? d : mem[k]; }
  function set(k, v) { mem[k] = v; save(); return v; }

  /* Journal des sessions : {d:date, t:type, l:libellé, s:score, n:total} */
  function logSession(type, label, score, total) {
    var log = mem.log || [];
    log.unshift({ d: Date.now(), t: type, l: label, s: score, n: total });
    mem.log = log.slice(0, 40);
    save();
  }
  function log() { return mem.log || []; }
  function clearLog() { mem.log = []; save(); }

  function stats() {
    var l = mem.log || [];
    var days = {};
    l.forEach(function (e) { days[new Date(e.d).toDateString()] = 1; });
    var tot = l.reduce(function (a, e) { return a + (e.n || 0); }, 0);
    var ok = l.reduce(function (a, e) { return a + (e.s || 0); }, 0);
    return {
      sessions: l.length, days: Object.keys(days).length,
      answers: tot, correct: ok,
      rate: tot ? Math.round(ok * 100 / tot) : 0,
      today: l.filter(function (e) { return new Date(e.d).toDateString() === new Date().toDateString(); }).length
    };
  }

  return { get: get, set: set, logSession: logSession, log: log, clearLog: clearLog,
           stats: stats, available: function () { return available; } };
})();
