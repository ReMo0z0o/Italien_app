/* ===== Synthèse vocale italienne ======================================= */
window.APP = window.APP || {};

APP.speech = (function () {
  'use strict';
  var supported = typeof window.speechSynthesis !== 'undefined';
  var voice = null, ready = false, enabled = true;

  function loadVoice() {
    if (!supported) return;
    var vs = window.speechSynthesis.getVoices() || [];
    if (!vs.length) return;
    voice = vs.filter(function (v) { return /^it/i.test(v.lang); })[0] || null;
    ready = true;
  }

  if (supported) {
    loadVoice();
    window.speechSynthesis.onvoiceschanged = loadVoice;
  }

  function say(text, rate) {
    if (!supported || !enabled || !text) return false;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(String(text).replace(/[（(].*?[)）]/g, ''));
      u.lang = 'it-IT';
      u.rate = rate || 0.92;
      if (!ready) loadVoice();
      if (voice) u.voice = voice;
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) { return false; }
  }

  function stop() { if (supported) { try { window.speechSynthesis.cancel(); } catch (e) {} } }

  function toggle(v) { enabled = (v === undefined) ? !enabled : !!v; return enabled; }
  function isOn() { return enabled; }
  function hasVoice() { return supported; }

  /* Bouton haut-parleur prêt à insérer */
  function btn(text, cls) {
    if (!supported) return '';
    return '<button class="btn ghost sm speak' + (cls ? ' ' + cls : '') +
      '" data-say="' + APP.util.esc(text) + '" title="Écouter en italien" aria-label="Écouter">🔊</button>';
  }

  /* Délégation globale */
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-say]') : null;
    if (!b) return;
    e.preventDefault(); e.stopPropagation();
    say(b.getAttribute('data-say'));
  });

  return { say: say, stop: stop, toggle: toggle, isOn: isOn, hasVoice: hasVoice, btn: btn };
})();
