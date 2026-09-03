/* ===== Coquille de l'application ======================================= */
(function () {
  'use strict';

  var NAV = [
    { g: 'Apprendre' },
    { h: '#/', ic: '🏠', t: 'Accueil' },
    { h: '#/sessione', ic: '⏱', t: 'Session 10 min' },
    { h: '#/flashcards', ic: '🗂', t: 'Flashcards' },
    { h: '#/esercizi', ic: '✏️', t: 'Exercices' },
    { h: '#/giochi', ic: '🎮', t: 'Jeux' },
    { g: 'Réviser' },
    { h: '#/lezioni', ic: '📖', t: 'Leçons' },
    { h: '#/verbi', ic: '🔤', t: 'Conjugaison' },
    { h: '#/lessico', ic: '🔎', t: 'Lexique' },
    { h: '#/dialoghi', ic: '🗣', t: 'Dialogues' },
    { g: 'Le cours' },
    { h: '#/programma', ic: '🗺', t: 'Programme' },
    { h: '#/stampa', ic: '🖨', t: 'Fiches à imprimer' }
  ];

  function navHtml() {
    return NAV.map(function (n) {
      if (n.g) return '<div class="nav-group">' + n.g + '</div>';
      return '<a href="' + n.h + '"><span class="ic">' + n.ic + '</span>' + n.t + '</a>';
    }).join('');
  }

  function applyTheme(mode) {
    document.body.setAttribute('data-theme', mode === 'auto' ? '' : mode);
    if (mode === 'auto') document.body.removeAttribute('data-theme');
  }

  function build() {
    var app = document.getElementById('app');
    app.innerHTML =
      '<aside class="sidebar" id="sidebar">' +
        '<div class="topbar">' +
          '<div class="brand"><div class="brand-mark"></div><div>' +
            '<div class="brand-name">Impariamo!</div>' +
            '<div class="brand-sub">Italien — UE1 → UE3</div></div></div>' +
          '<button class="btn ghost" id="burger" aria-label="Menu">☰</button>' +
        '</div>' +
        '<div class="brand desktop-brand"><div class="brand-mark"></div><div>' +
          '<div class="brand-name">Impariamo!</div>' +
          '<div class="brand-sub">Italien — UE1 → UE3</div></div></div>' +
        '<nav class="nav">' + navHtml() + '</nav>' +
        '<div class="side-foot">' +
          '<div class="row" style="gap:6px">' +
            '<button class="btn ghost sm" id="themeBtn" title="Thème">🌓</button>' +
            '<button class="btn ghost sm" id="audioBtn" title="Son">🔊</button>' +
          '</div>' +
          '<div style="margin-top:8px">Progression non enregistrée : chaque série est autonome.</div>' +
        '</div>' +
      '</aside>' +
      '<main class="main" id="main"></main>';

    /* responsive : le bloc marque du haut ne sert qu'en mobile */
    var css = document.createElement('style');
    css.textContent = '@media(max-width:900px){.desktop-brand{display:none}}' +
                      '@media(min-width:901px){.topbar{display:none}}';
    document.head.appendChild(css);

    document.getElementById('burger').addEventListener('click', function () {
      document.getElementById('sidebar').classList.toggle('collapsed');
    });

    var themes = ['auto', 'light', 'dark'];
    document.getElementById('themeBtn').addEventListener('click', function () {
      var cur = APP.store.get('theme', 'auto');
      var next = themes[(themes.indexOf(cur) + 1) % 3];
      APP.store.set('theme', next); applyTheme(next);
      APP.ui.toast('Thème : ' + { auto: 'automatique', light: 'clair', dark: 'sombre' }[next]);
    });

    var ab = document.getElementById('audioBtn');
    function syncAudio() {
      var on = APP.speech.isOn();
      ab.textContent = on ? '🔊' : '🔇';
      ab.title = on ? 'Son activé' : 'Son coupé';
    }
    APP.speech.toggle(APP.store.get('audio', true));
    syncAudio();
    ab.addEventListener('click', function () {
      APP.store.set('audio', APP.speech.toggle()); syncAudio();
      APP.ui.toast(APP.speech.isOn() ? 'Prononciation activée' : 'Prononciation coupée');
    });

    applyTheme(APP.store.get('theme', 'auto'));

    /* fermer le menu mobile après navigation */
    document.querySelector('.nav').addEventListener('click', function (e) {
      if (e.target.closest('a') && window.innerWidth <= 900) {
        document.getElementById('sidebar').classList.add('collapsed');
      }
    });

    APP.router.start(document.getElementById('main'));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
})();
