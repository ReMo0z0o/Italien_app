/* =========================================================================
   SHEET — modèle de fiche commun, rendu en HTML (aperçu) et en PDF
   Une fiche = { title, sub, blocks:[…] }
   Blocs : h2 | p | note | box | table | voc | cards | ol | space
   Le contenu textuel est décrit en « runs » : [{ s, b, i, br }]
   ========================================================================= */
window.APP = window.APP || {};

APP.sheet = (function () {
  'use strict';
  var E = APP.util.esc;

  /* ---------- runs ---------------------------------------------------- */
  var ENT = { amp: '&', lt: '<', gt: '>', quot: '"', nbsp: ' ', '#39': '\'' };

  /* Convertit le HTML léger des leçons (<b> <i> <br> <sup> <u>) en runs */
  function runs(html) {
    if (Array.isArray(html)) return html;
    var s = String(html == null ? '' : html);
    var out = [], b = 0, i = 0, buf = '';
    function flush() { if (buf) { out.push({ s: buf, b: b > 0, i: i > 0 }); buf = ''; } }
    var re = /<\/?([a-z0-9]+)[^>]*>|&([a-z#0-9]+);/gi, m, last = 0;
    while ((m = re.exec(s))) {
      buf += s.slice(last, m.index);
      last = re.lastIndex;
      if (m[2] !== undefined) { buf += (ENT[m[2].toLowerCase()] !== undefined ? ENT[m[2].toLowerCase()] : ''); continue; }
      var tag = m[1].toLowerCase(), close = m[0].charAt(1) === '/';
      if (tag === 'b' || tag === 'strong') { flush(); b += close ? -1 : 1; }
      else if (tag === 'i' || tag === 'em') { flush(); i += close ? -1 : 1; }
      else if (tag === 'br') { flush(); out.push({ br: true }); }
      /* les autres balises (u, sup, span…) sont ignorées, leur texte est conservé */
    }
    buf += s.slice(last);
    flush();
    return out;
  }

  function runsText(r) {
    return runs(r).map(function (x) { return x.br ? ' ' : x.s; }).join('');
  }

  function runsHtml(r) {
    return runs(r).map(function (x) {
      if (x.br) return '<br>';
      var t = E(x.s);
      if (x.b) t = '<b>' + t + '</b>';
      if (x.i) t = '<i>' + t + '</i>';
      return t;
    }).join('');
  }

  function cellRuns(c) { return (c && typeof c === 'object' && !Array.isArray(c)) ? runs(c.runs || c.c || '') : runs(c); }
  function cellSpan(c) { return (c && typeof c === 'object' && c.span) ? c.span : 1; }

  /* ===================================================================== */
  /* RENDU HTML — aperçu à l'écran, et impression via @media print          */
  /* ===================================================================== */
  function htmlBlock(b) {
    switch (b.t) {
      case 'h2': return '<h2>' + E(b.text) + '</h2>';
      case 'p': return '<p>' + runsHtml(b.runs) + '</p>';
      case 'note': return '<p class="note">' + runsHtml(b.runs) + '</p>';
      case 'space': return '<div style="height:' + (b.h || 4) + 'mm"></div>';
      case 'box':
        return '<div class="box">' + (b.title ? '<div class="bt">' + E(b.title) + '</div>' : '') +
          runsHtml(b.runs) + '</div>';
      case 'table': {
        var h = '<div class="tw"><table' + (b.zebra ? ' class="zebra"' : '') + '>';
        if (b.caption) h += '<caption>' + E(b.caption) + '</caption>';
        if (b.head && b.head.length) {
          h += '<thead><tr>' + b.head.map(function (c) {
            return '<th' + (cellSpan(c) > 1 ? ' colspan="' + cellSpan(c) + '"' : '') + '>' + runsHtml(cellRuns(c)) + '</th>';
          }).join('') + '</tr></thead>';
        }
        h += '<tbody>' + b.rows.map(function (r) {
          return '<tr>' + r.map(function (c) {
            return '<td' + (cellSpan(c) > 1 ? ' colspan="' + cellSpan(c) + '"' : '') + '>' + runsHtml(cellRuns(c)) + '</td>';
          }).join('') + '</tr>';
        }).join('') + '</tbody></table></div>';
        return h;
      }
      case 'voc':
        return '<div class="' + (b.cols === 1 ? '' : 'cols2') + '">' + b.items.map(function (i) {
          return '<div class="voc-line"><span class="i">' + E(i.it) + '</span>' +
            '<span class="f">' + (b.hideFr ? '' : E(i.fr)) + '</span></div>' +
            (!b.hideFr && i.note ? '<div class="note" style="margin:-2px 0 4px">↳ ' + E(i.note) + '</div>' : '');
        }).join('') + '</div>';
      case 'cards':
        return '<div class="cut-grid">' + b.items.map(function (i) {
          return '<div class="cut-card"><div class="ci">' + E(i.it) + '</div>' +
            '<div class="cf">' + E(i.fr) + '</div>' +
            (i.note ? '<div class="cn">' + E(i.note) + '</div>' : '') + '</div>';
        }).join('') + '</div>';
      case 'ol':
        return '<ol class="ex-ol">' + b.items.map(function (it) {
          return '<li>' + runsHtml(it.runs) +
            (it.opts ? '<br>' + it.opts.map(function (o) {
              return '<span style="margin-right:14px">&#9744; ' + E(o) + '</span>';
            }).join('') : '') +
            (it.line ? '<div class="write-line"></div>' : '') + '</li>';
        }).join('') + '</ol>';
      default: return '';
    }
  }

  function html(sheets) {
    return sheets.map(function (s) {
      return '<div class="sheet"><div class="sheet-head"><div>' +
        '<h1>' + E(s.title) + '</h1><div class="sub">' + E(s.sub) + '</div></div>' +
        '<div class="flag"></div></div>' +
        s.blocks.map(htmlBlock).join('') +
        '<div class="sheet-foot"><span>Impariamo l’italiano — fiche d’étude</span>' +
        '<span>Nom : ________________   Date : ____ / ____ / ______</span></div></div>';
    }).join('');
  }

  /* ===================================================================== */
  /* RENDU PDF                                                              */
  /* ===================================================================== */
  var M = { left: 15, right: 15, top: 14, bottom: 16 };
  var W = 210 - M.left - M.right;          /* largeur utile : 180 mm */
  var BOTTOM = 297 - M.bottom;

  var F = {
    h1: { font: 'Helvetica-Bold', size: 14 },
    sub: { font: 'Times-Italic', size: 8.5, gray: 0.35 },
    h2: { font: 'Helvetica-Bold', size: 10 },
    body: { font: 'Times-Roman', size: 9.5 },
    bodyB: { font: 'Times-Bold', size: 9.5 },
    bodyI: { font: 'Times-Italic', size: 9.5 },
    note: { font: 'Times-Italic', size: 8.2, gray: 0.35 },
    th: { font: 'Helvetica-Bold', size: 7.4 },
    td: { font: 'Times-Roman', size: 8.8 },
    vocI: { font: 'Times-Bold', size: 9.2 },
    vocF: { font: 'Times-Roman', size: 8.8, gray: 0.25 },
    boxT: { font: 'Helvetica-Bold', size: 7.2 },
    foot: { font: 'Times-Roman', size: 7, gray: 0.5 }
  };

  function fontFor(run, base) {
    if (base === 'td' || base === 'body') {
      if (run.b) return 'Times-Bold';
      if (run.i) return 'Times-Italic';
      return 'Times-Roman';
    }
    return F[base].font;
  }

  /* Découpe une suite de runs en lignes tenant dans maxW.
     Retourne [[{s,font,size}]] — les segments gardent leur style.        */
  function layoutRuns(rs, base, maxW, doc) {
    var size = F[base].size;
    var lines = [[]], curW = 0;
    function push(seg) { lines[lines.length - 1].push(seg); }
    function newLine() { lines.push([]); curW = 0; }

    runs(rs).forEach(function (r) {
      if (r.br) { newLine(); return; }
      var font = fontFor(r, base);
      var words = String(r.s).split(/(\s+)/);
      words.forEach(function (w) {
        if (w === '') return;
        var ww = doc.widthOf(w, font, size);
        if (/^\s+$/.test(w)) {
          if (curW > 0) { push({ s: ' ', font: font, size: size }); curW += doc.widthOf(' ', font, size); }
          return;
        }
        if (curW + ww > maxW && curW > 0) newLine();
        if (ww > maxW) {                       /* mot plus large que la colonne */
          var piece = '';
          for (var i = 0; i < w.length; i++) {
            if (doc.widthOf(piece + w[i], font, size) > maxW && piece) {
              push({ s: piece, font: font, size: size }); newLine(); piece = '';
            }
            piece += w[i];
          }
          if (piece) { push({ s: piece, font: font, size: size }); curW = doc.widthOf(piece, font, size); }
          return;
        }
        push({ s: w, font: font, size: size });
        curW += ww;
      });
    });
    /* nettoie les espaces en fin de ligne */
    lines.forEach(function (l) { while (l.length && l[l.length - 1].s === ' ') l.pop(); });
    return lines.filter(function (l, i) { return l.length || i === 0; });
  }

  function drawLine(doc, segs, x, y, gray) {
    var cx = x;
    segs.forEach(function (sg) {
      doc.text(sg.s, cx, y, { font: sg.font, size: sg.size, gray: gray || 0 });
      cx += doc.widthOf(sg.s, sg.font, sg.size);
    });
  }

  function lineH(base) { return F[base].size * 0.42 + 1.05; }

  /* --------- moteur de flux --------------------------------------------- */
  function pdf(sheets, opts) {
    opts = opts || {};
    var doc = APP.pdf.create({ title: opts.title || 'Fiches d’étude' });
    var y = 0, sheetTitle = '', sheetSub = '';

    function footer() {
      doc.line(M.left, BOTTOM + 4, 210 - M.right, BOTTOM + 4, { gray: 0.75, lw: 0.2 });
      doc.text('Impariamo l’italiano — fiche d’étude', M.left, BOTTOM + 8, F.foot);
      var r = 'Nom : ________________   Date : ____ / ____ / ______';
      doc.text(r, 210 - M.right - doc.widthOf(r, F.foot.font, F.foot.size), BOTTOM + 8, F.foot);
    }

    function header(cont) {
      /* drapeau italien */
      var fw = 13.5, fh = 8.6, fx = 210 - M.right - fw, fy = M.top - 1.2;
      [[0.039, 0.529, 0.329], [1, 1, 1], [0.784, 0.212, 0.184]].forEach(function (c, i) {
        doc.rect(fx + i * fw / 3, fy, fw / 3 + 0.05, fh, { rgb: c });
      });
      doc.rect(fx, fy, fw, fh, { stroke: 0.55, lw: 0.25 });

      doc.text(sheetTitle + (cont ? ' (suite)' : ''), M.left, M.top + 4.6, F.h1);
      if (sheetSub && !cont) doc.text(sheetSub, M.left, M.top + 9.2, F.sub);
      var ry = M.top + (sheetSub && !cont ? 11.6 : 7.2);
      doc.line(M.left, ry, 210 - M.right, ry, { gray: 0.1, lw: 0.7 });
      y = ry + 6;
    }

    function newSheetPage(cont) { doc.newPage(); header(cont); footer(); }
    function ensure(h) { if (y + h > BOTTOM) { newSheetPage(true); return true; } return false; }

    /* --------- blocs ---------------------------------------------------- */
    function bH2(b) {
      ensure(11);
      y += 3;
      doc.text(b.text, M.left, y + 3.4, F.h2);
      y += 4.6;
      doc.line(M.left, y, 210 - M.right, y, { gray: 0.55, lw: 0.3 });
      y += 3.4;
    }

    function bPara(b, base) {
      var lines = layoutRuns(b.runs, base, W, doc), lh = lineH(base);
      lines.forEach(function (l) {
        ensure(lh);
        drawLine(doc, l, M.left, y + F[base].size * 0.36, F[base].gray);
        y += lh;
      });
      y += 1.6;
    }

    function bBox(b) {
      var inner = W - 5;
      var lines = layoutRuns(b.runs, 'body', inner, doc), lh = lineH('body');
      var h = lines.length * lh + (b.title ? 4 : 0) + 4;
      if (y + h > BOTTOM && h < BOTTOM - M.top - 20) newSheetPage(true);
      var top = y;
      var ty = y + 2.6;
      if (b.title) { doc.text(String(b.title).toUpperCase(), M.left + 2.5, ty + 2, F.boxT); ty += 4; }
      lines.forEach(function (l) {
        if (ty + lh > BOTTOM) {          /* encadré très long : on le coupe proprement */
          doc.rect(M.left, top, W, ty - top + 1, { stroke: 0.15, lw: 0.5 });
          newSheetPage(true); top = y; ty = y + 2.6;
        }
        drawLine(doc, l, M.left + 2.5, ty + F.body.size * 0.36);
        ty += lh;
      });
      doc.rect(M.left, top, W, ty - top + 2, { stroke: 0.15, lw: 0.5 });
      y = ty + 5;
    }

    function bTable(b) {
      var cols = (b.head && b.head.length) ? b.head.length
        : b.rows.reduce(function (a, r) { return Math.max(a, r.length); }, 1);
      var frac = b.w && b.w.length === cols ? b.w : null;
      var total = frac ? frac.reduce(function (a, v) { return a + v; }, 0) : cols;
      var cw = [];
      for (var i = 0; i < cols; i++) cw.push((frac ? frac[i] : 1) / total * W);

      var padX = 1.8, padY = 1.4;

      function measure(cells, base) {
        var maxLines = 1, out = [], ci = 0;
        cells.forEach(function (c) {
          var span = cellSpan(c), wdt = 0;
          for (var k = 0; k < span; k++) wdt += cw[ci + k] || 0;
          var ls = layoutRuns(cellRuns(c), base, wdt - padX * 2, doc);
          out.push({ lines: ls, x: cw.slice(0, ci).reduce(function (a, v) { return a + v; }, 0), w: wdt });
          maxLines = Math.max(maxLines, ls.length);
          ci += span;
        });
        return { cells: out, h: maxLines * lineH(base) + padY * 2 };
      }

      function drawRow(m, base, fill) {
        if (fill !== undefined) doc.rect(M.left, y, W, m.h, { fill: fill });
        m.cells.forEach(function (c) {
          var ty = y + padY + F[base].size * 0.36;
          c.lines.forEach(function (l) { drawLine(doc, l, M.left + c.x + padX, ty, F[base].gray); ty += lineH(base); });
          doc.rect(M.left + c.x, y, c.w, m.h, { stroke: 0.55, lw: 0.2 });
        });
        y += m.h;
      }

      var head = (b.head && b.head.length) ? measure(b.head, 'th') : null;
      ensure((head ? head.h : 0) + 10);
      if (head) drawRow(head, 'th', 0.9);

      b.rows.forEach(function (r, ri) {
        var m = measure(r, 'td');
        if (y + m.h > BOTTOM) {
          newSheetPage(true);
          if (head) { var h2 = measure(b.head, 'th'); drawRow(h2, 'th', 0.9); }
        }
        drawRow(m, 'td', b.zebra && ri % 2 ? 0.96 : undefined);
      });
      y += 3.5;
    }

    function bVoc(b) {
      var cols = b.cols === 1 ? 1 : 2;
      var gap = 7;
      var colW = (W - gap * (cols - 1)) / cols;

      /* hauteur de chaque entrée, pour équilibrer les colonnes */
      var items = b.items.map(function (it) {
        var itW = doc.widthOf(it.it, F.vocI.font, F.vocI.size);
        var frW = b.hideFr ? 0 : doc.widthOf(it.fr, F.vocF.font, F.vocF.size);
        var wrapIt = !b.hideFr && (itW + frW + 6 > colW);
        return {
          it: it, itW: itW, frW: frW, wrap: wrapIt,
          h: (wrapIt ? 2 : 1) * 4.2 + (!b.hideFr && it.note ? 3.4 : 0) + 0.6
        };
      });

      var i = 0;
      while (i < items.length) {
        var avail = BOTTOM - y;
        if (avail < 14) { newSheetPage(true); avail = BOTTOM - y; }

        /* ce qui reste tient-il entièrement sur cette page ? */
        var rest = 0, k;
        for (k = i; k < items.length; k++) rest += items[k].h;
        var target = (rest <= avail * cols) ? Math.max(rest / cols, 0.001) : avail;

        var top = y, colTop = y, maxY = y, col = 0;
        while (i < items.length && col < cols) {
          var m = items[i];
          if (colTop + m.h > y + avail || (colTop > top && colTop - top + m.h > target && col < cols - 1)) {
            col++; if (col >= cols) break;
            colTop = top;
          }
          var x = M.left + col * (colW + gap);
          var yy = colTop;

          doc.text(m.it.it, x, yy + 3.1, F.vocI);
          if (!b.hideFr) {
            if (m.wrap) {
              yy += 4.2;
              doc.text(m.it.fr, x + 3, yy + 3.1, F.vocF);
            } else {
              var fx2 = x + colW - m.frW;
              doc.text(m.it.fr, fx2, yy + 3.1, F.vocF);
              if (fx2 - (x + m.itW) > 4) {
                doc.line(x + m.itW + 1.5, yy + 2.6, fx2 - 1.5, yy + 2.6, { gray: 0.78, lw: 0.2, dash: '0.4 1.1' });
              }
            }
          }
          yy += 4.2;
          if (!b.hideFr && m.it.note) {
            doc.text('\u21b3 ' + m.it.note, x + 3, yy + 2.6, F.note);
            yy += 3.4;
          }
          colTop = yy + 0.6;
          if (colTop > maxY) maxY = colTop;
          i++;
        }
        y = maxY;
        if (i < items.length) newSheetPage(true);
      }
      y += 3;
    }

    function bCards(b) {
      var cols = 3, rows = 3;
      var cwd = W / cols, chd = 34;
      var i = 0;
      while (i < b.items.length) {
        if (y + chd > BOTTOM) newSheetPage(true);
        var perPage = Math.min(Math.floor((BOTTOM - y) / chd), rows);
        for (var r = 0; r < perPage && i < b.items.length; r++) {
          for (var c = 0; c < cols && i < b.items.length; c++) {
            var it = b.items[i++];
            var x = M.left + c * cwd, yy = y + r * chd;
            doc.rect(x, yy, cwd, chd, { stroke: 0.55, lw: 0.25 });
            var cy = yy + chd / 2 - (it.note ? 3 : 1.5);
            var wI = doc.widthOf(it.it, 'Times-Bold', 11);
            doc.text(it.it, x + (cwd - wI) / 2, cy, { font: 'Times-Bold', size: 11 });
            var wF = doc.widthOf(it.fr, 'Times-Roman', 8.6);
            doc.text(it.fr, x + (cwd - wF) / 2, cy + 4.4, { font: 'Times-Roman', size: 8.6, gray: 0.25 });
            if (it.note) {
              var n = it.note.length > 34 ? it.note.slice(0, 33) + '…' : it.note;
              var wN = doc.widthOf(n, 'Times-Italic', 7);
              doc.text(n, x + (cwd - wN) / 2, cy + 8.4, { font: 'Times-Italic', size: 7, gray: 0.45 });
            }
          }
        }
        y += perPage * chd;
      }
      y += 3;
    }

    function bOl(b) {
      var num = 0;
      b.items.forEach(function (it) {
        num++;
        var label = num + '.';
        var indent = 6;
        var lines = layoutRuns(it.runs, 'body', W - indent, doc), lh = lineH('body');
        var h = lines.length * lh + (it.opts ? 4.6 : 0) + (it.line ? 7 : 0) + 2.4;
        ensure(h);
        doc.text(label, M.left, y + F.body.size * 0.36, { font: 'Times-Bold', size: 9.5 });
        lines.forEach(function (l) {
          drawLine(doc, l, M.left + indent, y + F.body.size * 0.36);
          y += lh;
        });
        if (it.opts) {
          var x = M.left + indent;
          it.opts.forEach(function (o) {
            doc.rect(x, y - 0.4, 2.6, 2.6, { stroke: 0.35, lw: 0.25 });
            doc.text(o, x + 3.8, y + 2, F.body);
            x += 3.8 + doc.widthOf(o, F.body.font, F.body.size) + 6;
          });
          y += 4.6;
        }
        if (it.line) {
          y += 4;
          doc.line(M.left + indent, y, 210 - M.right, y, { gray: 0.6, lw: 0.25 });
          y += 3;
        }
        y += 2.4;
      });
      y += 2;
    }

    /* --------- parcours -------------------------------------------------- */
    sheets.forEach(function (s) {
      sheetTitle = s.title;
      sheetSub = s.sub || '';
      newSheetPage(false);
      s.blocks.forEach(function (b) {
        switch (b.t) {
          case 'h2': bH2(b); break;
          case 'p': bPara(b, 'body'); break;
          case 'note': bPara(b, 'note'); break;
          case 'box': bBox(b); break;
          case 'table': bTable(b); break;
          case 'voc': bVoc(b); break;
          case 'cards': bCards(b); break;
          case 'ol': bOl(b); break;
          case 'space': y += (b.h || 4); break;
        }
      });
    });

    return doc;
  }

  return { html: html, pdf: pdf, runs: runs, runsText: runsText, runsHtml: runsHtml };
})();
