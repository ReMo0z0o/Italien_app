/* ===== Lexique ========================================================= */
APP.views.lessico = (function () {
  'use strict';
  var E = APP.util.esc, U = APP.ui;
  var state = { q: '', ue: '', theme: '' };

  function allItems() {
    var out = [];
    DATA.vocab.forEach(function (t) {
      t.items.forEach(function (i) {
        out.push({ it: i.it, fr: i.fr, note: i.note, ex: i.ex, theme: t.title, tid: t.id, ue: t.ue });
      });
    });
    return out;
  }

  function render(params) {
    /* #/lessico?t=xxx  →  filtre initial sur un thème */
    var raw = (params && params[0]) || '';
    var m = /t=([\w-]+)/.exec(location.hash);
    if (m) state.theme = m[1];

    var h = U.pageHead('Réviser', 'Lexique complet',
      'Tout le vocabulaire du programme : ' + allItems().length + ' entrées, recherchables et filtrables. ' +
      'Cliquez sur 🔊 pour écouter la prononciation.',
      '<a class="btn" href="#/stampa/vocabulaire">🖨 Fiches de vocabulaire</a>');

    h += '<div class="card"><div class="row"><input type="search" id="q" placeholder="Rechercher en italien ou en français…" style="max-width:380px" value="' + E(state.q) + '">' +
      '<select id="ue" style="max-width:150px"><option value="">Toutes les UE</option>' +
      ['UE1', 'UE2', 'UE3'].map(function (u) { return '<option' + (state.ue === u ? ' selected' : '') + '>' + u + '</option>'; }).join('') +
      '</select>' +
      '<select id="th" style="max-width:250px"><option value="">Tous les thèmes</option>' +
      DATA.vocab.map(function (t) {
        return '<option value="' + t.id + '"' + (state.theme === t.id ? ' selected' : '') + '>' + E(t.icon + ' ' + t.title) + '</option>';
      }).join('') + '</select>' +
      '<button class="btn ghost sm" id="reset">Réinitialiser</button></div>' +
      '<div class="divider"></div><div id="cnt" class="small muted"></div><div id="list"></div></div>';
    return h;
  }

  function draw(root) {
    var items = allItems().filter(function (i) {
      if (state.ue && i.ue !== state.ue) return false;
      if (state.theme && i.tid !== state.theme) return false;
      if (state.q) {
        var q = APP.util.norm(state.q);
        if (APP.util.norm(i.it + ' ' + i.fr + ' ' + (i.note || '')).indexOf(q) < 0) return false;
      }
      return true;
    });

    root.querySelector('#cnt').innerHTML = items.length + ' entrée' + (items.length > 1 ? 's' : '') +
      (state.theme ? ' · <a href="#/flashcards/' + state.theme + '">réviser ce thème en flashcards →</a>' : '');

    var byTheme = {};
    items.forEach(function (i) { (byTheme[i.tid] = byTheme[i.tid] || []).push(i); });

    var h = '';
    DATA.vocab.forEach(function (t) {
      var set = byTheme[t.id]; if (!set) return;
      h += '<h3 style="margin-top:18px">' + t.icon + ' ' + E(t.title) + ' ' + U.ueTag(t.ue) +
        ' <span class="muted small">(' + set.length + ')</span></h3>';
      h += set.map(function (i) {
        return '<div class="lex-row"><span class="lex-it">' + APP.speech.btn(APP.util.firstForm(i.it)) + ' ' + E(i.it) + '</span>' +
          '<span class="lex-fr">' + E(i.fr) + '</span>' +
          (i.note ? '<span class="lex-note">💡 ' + E(i.note) + '</span>' : '') +
          (i.ex ? '<span class="lex-note it">« ' + E(i.ex) + ' »</span>' : '') + '</div>';
      }).join('');
    });
    root.querySelector('#list').innerHTML = h || U.empty('Aucun résultat.');
  }

  function mount(root) {
    var q = root.querySelector('#q'), ue = root.querySelector('#ue'), th = root.querySelector('#th');
    q.addEventListener('input', APP.util.debounce(function () { state.q = q.value; draw(root); }, 150));
    ue.addEventListener('change', function () { state.ue = ue.value; draw(root); });
    th.addEventListener('change', function () { state.theme = th.value; draw(root); });
    root.querySelector('#reset').addEventListener('click', function () {
      state = { q: '', ue: '', theme: '' }; q.value = ''; ue.value = ''; th.value = ''; draw(root);
    });
    draw(root);
  }

  return { title: 'Lexique', render: render, mount: mount };
})();
