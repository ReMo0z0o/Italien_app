/* ===== Dialogues, e-mails et boîtes à outils =========================== */
APP.views.dialoghi = (function () {
  'use strict';
  var E = APP.util.esc, U = APP.ui;

  function list() {
    var h = U.pageHead('Réviser', 'Dialogues &amp; communication',
      'Des scènes complètes tirées des situations du programme. Masquez l’italien ou le français, ' +
      'écoutez chaque réplique, puis jouez un rôle à voix haute.');

    h += '<div class="grid c2">' + DATA.dialogues.map(function (d) {
      return '<a class="tile" href="#/dialoghi/' + d.id + '"><div class="ic">' + d.icon + '</div>' +
        '<h3>' + E(d.title) + '</h3><p>' + E(d.context) + '</p>' +
        '<div class="meta">' + U.ueTag(d.ue) + ' · ' + d.lines.length + ' répliques</div></a>';
    }).join('') + '</div>';

    h += '<h2 class="mt2">✉️ Modèles d’e-mail</h2><div class="grid c2">' +
      DATA.emails.map(function (m) {
        return '<a class="tile" href="#/dialoghi/mail"><div class="ic">' + m.icon + '</div>' +
          '<h3>' + E(m.title) + '</h3><p>' + E(m.subject) + '</p>' +
          '<div class="meta">Registre ' + E(m.type.toLowerCase()) + '</div></a>';
      }).join('') + '</div>';

    h += '<h2 class="mt2">🧰 Boîtes à outils</h2><div class="grid c2">' +
      DATA.kits.map(function (k) {
        return '<div class="card"><div class="row between"><h3 class="mb0">' + k.icon + ' ' + E(k.title) + '</h3>' + U.ueTag(k.ue) + '</div>' +
          '<ul class="ex-list" style="margin-top:10px">' + k.items.map(function (i) {
            return '<li>' + APP.speech.btn(APP.util.firstForm(i.it)) + '<span class="it-s">' + E(i.it) + '</span>' +
              '<span class="fr-s">' + E(i.fr) + '</span></li>';
          }).join('') + '</ul></div>';
      }).join('') + '</div>';
    return h;
  }

  function mails() {
    var h = '<div class="row" style="margin-bottom:14px"><a class="btn ghost sm" href="#/dialoghi">← Dialogues</a>' +
      '<a class="btn sm" href="#/stampa/email">🖨 Fiche e-mails</a></div>';
    h += U.pageHead('Communication écrite', 'Modèles d’e-mail',
      'Deux modèles complets, avec les formules d’ouverture et de clôture attendues à l’examen.');
    DATA.emails.forEach(function (m) {
      h += '<div class="card"><div class="row between"><h3 class="mb0">' + m.icon + ' ' + E(m.title) + '</h3>' +
        '<span class="tag ' + (m.type === 'Formale' ? 'ue3' : 'ue1') + '">' + E(m.type) + '</span></div>' +
        '<div style="margin-top:12px;padding:14px 16px;background:var(--surface-2);border-radius:9px;font-family:ui-monospace,monospace;font-size:.88rem;line-height:1.7">' +
        '<div style="font-weight:700;margin-bottom:8px">' + E(m.subject) + '</div>' +
        m.body.map(function (l) { return l === '' ? '<br>' : E(l); }).join('<br>') + '</div>' +
        '<ul class="small" style="margin-top:12px;padding-left:18px">' +
        m.notes.map(function (n) { return '<li style="margin:4px 0">' + n + '</li>'; }).join('') + '</ul></div>';
    });
    h += '<div class="card"><h3>À retenir</h3>' + U.table(['', 'Informel', 'Formel'], [
      ['Ouverture', 'Ciao Marco, / Caro Luca,', 'Gentile Signor Rossi, / Egregio Dottore,'],
      ['Pronom', 'tu, ti, tuo', 'Lei, La, Le, Suo (majuscules)'],
      ['Demande', 'Mi puoi…? / Ti va di…?', 'Mi potrebbe…? / Sarebbe possibile…?'],
      ['Clôture', 'Un abbraccio, / A presto! / Baci', 'Cordiali saluti, / Distinti saluti,'],
      ['Avant la clôture', 'Fammi sapere!', 'In attesa di una Sua risposta, La ringrazio.']
    ]) + '</div>';
    return h;
  }

  function detail(id) {
    if (id === 'mail') return mails();
    var d = DATA.dialogues.filter(function (x) { return x.id === id; })[0];
    if (!d) return U.empty('Dialogue introuvable.');

    var roles = [];
    d.lines.forEach(function (l) { if (roles.indexOf(l.who) < 0) roles.push(l.who); });

    var h = '<div class="row between" style="margin-bottom:14px">' +
      '<a class="btn ghost sm" href="#/dialoghi">← Dialogues</a>' +
      '<div class="row"><button class="btn sm" id="playAll">▶️ Tout écouter</button>' +
      '<button class="btn sm" id="tFr">Masquer le français</button>' +
      '<button class="btn sm" id="tIt">Masquer l’italien</button></div></div>';

    h += '<div class="card"><div class="row between"><div>' +
      '<h1 style="margin:0 0 2px">' + d.icon + ' ' + E(d.title) + '</h1>' +
      '<p class="muted mb0">' + E(d.context) + '</p></div>' + U.ueTag(d.ue) + '</div>' +
      '<div class="divider"></div><div id="lines">' +
      d.lines.map(function (l, i) {
        return '<div class="dlg-line" data-i="' + i + '"><div class="dlg-who">' + E(l.who) + '</div>' +
          '<div class="dlg-body"><div class="dlg-it">' + E(l.it) +
          ' <button class="dlg-play" data-say="' + E(l.it) + '" title="Écouter">🔊</button></div>' +
          '<div class="dlg-fr">' + E(l.fr) + '</div></div></div>';
      }).join('') + '</div></div>';

    h += '<div class="card"><h3>🎭 Jeu de rôle</h3>' +
      '<p class="small muted">Masquez les répliques d’un personnage et jouez-le à voix haute : ' +
      'cliquez sur une réplique floutée pour vérifier.</p><div class="row">' +
      roles.map(function (r) { return '<button class="chip" data-role="' + E(r) + '">Jouer ' + E(r) + '</button>'; }).join('') +
      '<button class="chip" data-role="">Tout afficher</button></div></div>';

    if (d.useful && d.useful.length) {
      h += '<div class="card"><h3>Expressions clés</h3><ul class="ex-list">' +
        d.useful.map(function (u) {
          return '<li>' + APP.speech.btn(APP.util.firstForm(u.it)) + '<span class="it-s">' + E(u.it) + '</span>' +
            '<span class="fr-s">' + E(u.fr) + '</span></li>';
        }).join('') + '</ul></div>';
    }
    return h;
  }

  var timer = null;
  function mount(root, params) {
    var id = params[0];
    if (!id || id === 'mail') return;
    var d = DATA.dialogues.filter(function (x) { return x.id === id; })[0];
    if (!d) return;

    var frHidden = false, itHidden = false;
    var tFr = root.querySelector('#tFr'), tIt = root.querySelector('#tIt');

    tFr.addEventListener('click', function () {
      frHidden = !frHidden;
      root.querySelectorAll('.dlg-fr').forEach(function (e) { e.classList.toggle('hidden', frHidden); });
      tFr.textContent = frHidden ? 'Afficher le français' : 'Masquer le français';
    });
    tIt.addEventListener('click', function () {
      itHidden = !itHidden;
      root.querySelectorAll('.dlg-line').forEach(function (e) { e.classList.toggle('masked', itHidden); });
      tIt.textContent = itHidden ? 'Afficher l’italien' : 'Masquer l’italien';
    });

    root.querySelectorAll('[data-role]').forEach(function (b) {
      b.addEventListener('click', function () {
        var r = b.getAttribute('data-role');
        root.querySelectorAll('.dlg-line').forEach(function (line, i) {
          line.classList.toggle('masked', !!r && d.lines[i].who === r);
        });
        root.querySelectorAll('[data-role]').forEach(function (x) { x.classList.remove('on'); });
        if (r) b.classList.add('on');
      });
    });

    root.querySelector('#playAll').addEventListener('click', function () {
      if (timer) { clearTimeout(timer); timer = null; APP.speech.stop(); this.textContent = '▶️ Tout écouter'; return; }
      var i = 0, btn = this;
      btn.textContent = '⏸ Arrêter';
      (function next() {
        if (i >= d.lines.length) { btn.textContent = '▶️ Tout écouter'; timer = null; return; }
        var line = root.querySelector('.dlg-line[data-i="' + i + '"]');
        if (line) {
          root.querySelectorAll('.dlg-line').forEach(function (x) { x.style.background = ''; });
          line.style.background = 'var(--verde-soft)';
          line.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
        APP.speech.say(d.lines[i].it);
        var ms = 900 + d.lines[i].it.length * 62;
        i++;
        timer = setTimeout(next, ms);
      })();
    });
  }

  function unmount() { if (timer) { clearTimeout(timer); timer = null; } APP.speech.stop(); }

  function render(p) { return p[0] ? detail(p[0]) : list(); }
  return { title: 'Dialogues', render: render, mount: mount, unmount: unmount };
})();
