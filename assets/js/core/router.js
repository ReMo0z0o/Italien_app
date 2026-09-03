/* ===== Routeur (hash) ================================================== */
window.APP = window.APP || {};
APP.views = APP.views || {};

APP.router = (function () {
  'use strict';
  var root = null, current = null;

  function parse() {
    var h = (location.hash || '#/').replace(/^#\/?/, '');
    var parts = h.split('/').filter(function (x) { return x !== ''; }).map(decodeURIComponent);
    return { view: parts[0] || 'home', params: parts.slice(1), raw: h };
  }

  function go(path) { location.hash = '#/' + String(path).replace(/^\/+/, ''); }

  function render() {
    var r = parse();
    var v = APP.views[r.view] || APP.views.home;
    if (current && current.unmount) { try { current.unmount(); } catch (e) {} }
    APP.speech.stop();
    current = v;
    root.innerHTML = v.render ? v.render(r.params) : '';
    if (v.mount) v.mount(root, r.params);
    highlight(r.view);
    window.scrollTo(0, 0);
    document.title = (v.title ? v.title + ' · ' : '') + 'Impariamo l’italiano';
  }

  function highlight(view) {
    var links = document.querySelectorAll('.nav a');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href') || '';
      var target = href.replace(/^#\/?/, '').split('/')[0] || 'home';
      links[i].classList.toggle('active', target === view);
    }
  }

  function start(el) {
    root = el;
    window.addEventListener('hashchange', render);
    render();
  }

  return { start: start, go: go, parse: parse, render: render };
})();
