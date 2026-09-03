/* ===== Helpers d'interface ============================================= */
window.APP = window.APP || {};

APP.ui = (function () {
  'use strict';
  var E = APP.util.esc;

  function pageHead(kicker, title, lead, right) {
    return '<div class="page-head"><div class="row between">' +
      '<div><div class="kicker">' + E(kicker) + '</div><h1>' + title + '</h1></div>' +
      (right ? '<div class="row">' + right + '</div>' : '') +
      '</div>' + (lead ? '<p class="lead">' + lead + '</p>' : '') + '</div>';
  }

  function ueTag(ue) {
    var c = { UE1: 'ue1', UE2: 'ue2', UE3: 'ue3' }[ue] || 'neutral';
    return '<span class="tag ' + c + '">' + E(ue) + '</span>';
  }

  function table(head, rows, caption) {
    var h = '<div class="tbl-wrap"><table class="tbl">';
    if (caption) h += '<caption>' + caption + '</caption>';
    if (head && head.length) {
      h += '<thead><tr>' + head.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr></thead>';
    }
    h += '<tbody>' + rows.map(function (r) {
      return '<tr>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
    }).join('') + '</tbody></table></div>';
    return h;
  }

  function bar(pct, cls) {
    return '<div class="bar ' + (cls || '') + '"><i style="width:' + Math.max(0, Math.min(100, pct)) + '%"></i></div>';
  }

  var toastT;
  function toast(msg) {
    var old = document.querySelector('.toast');
    if (old) old.remove();
    var d = document.createElement('div');
    d.className = 'toast'; d.textContent = msg;
    document.body.appendChild(d);
    clearTimeout(toastT);
    toastT = setTimeout(function () { d.remove(); }, 2200);
  }

  function progressHead(i, n, extra) {
    return '<div class="progress-head">' + bar(i / n * 100) +
      '<span class="cnt">' + i + ' / ' + n + '</span>' + (extra || '') + '</div>';
  }

  /* Écran de résultat commun à tous les modes */
  function results(score, total, reviewHtml, actions) {
    var pct = total ? Math.round(score * 100 / total) : 0;
    var msg = pct >= 90 ? 'Bravissimo! 🏆' : pct >= 75 ? 'Molto bene! 👏' :
              pct >= 50 ? 'Buon lavoro — continua così! 💪' : 'Coraggio, riprova! 🌱';
    return '<div class="card q-card"><div class="result-big">' +
      '<div class="score">' + score + '<small> / ' + total + '</small></div>' +
      '<div style="margin:10px 0">' + bar(pct, pct < 50 ? 'rosso' : '') + '</div>' +
      '<p class="muted mb0">' + msg + '</p></div>' +
      (reviewHtml ? '<div class="divider"></div><h3>À revoir</h3>' + reviewHtml : '') +
      '<div class="divider"></div><div class="row">' + actions + '</div></div>';
  }

  function empty(msg) { return '<div class="card center muted">' + E(msg) + '</div>'; }

  /* Sélecteur de longueur de série */
  function sizePicker(current, sizes, attr) {
    return (sizes || [5, 10, 15, 20]).map(function (s) {
      return '<button class="chip ' + (s === current ? 'on' : '') + '" ' + attr + '="' + s + '">' + s + '</button>';
    }).join('');
  }

  return { pageHead: pageHead, ueTag: ueTag, table: table, bar: bar, toast: toast,
           progressHead: progressHead, results: results, empty: empty, sizePicker: sizePicker };
})();
