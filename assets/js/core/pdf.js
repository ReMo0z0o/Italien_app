/* =========================================================================
   PDF — générateur de PDF vectoriel minimal, sans dépendance
   Polices standard (Times, Helvetica) : aucune police à embarquer, texte
   sélectionnable et net à l'impression. Encodage WinAnsi.
   Coordonnées en millimètres, origine en haut à gauche.
   ========================================================================= */
window.APP = window.APP || {};

APP.pdf = (function () {
  'use strict';

  var K = 2.8346457;              /* mm → points */
  var A4 = { w: 210, h: 297 };

  /* --- Largeurs des glyphes (unités/1000) ------------------------------
     ASCII 32→126 ; les lettres accentuées reprennent la largeur de leur
     lettre de base, ce qui est exact pour Times et Helvetica.            */
  var ASCII = {
    'Times-Roman': [250,333,408,500,500,833,778,180,333,333,500,564,250,333,250,278,
      500,500,500,500,500,500,500,500,500,500,278,278,564,564,564,444,921,
      722,667,667,722,611,556,722,722,333,389,722,611,889,722,722,556,722,667,556,611,722,722,944,722,722,611,
      333,278,333,469,500,333,
      444,500,444,500,444,333,500,500,278,278,500,278,778,500,500,500,500,333,389,278,500,500,722,500,500,444,
      480,200,480,541],
    'Times-Bold': [250,333,555,500,500,1000,833,278,333,333,500,570,250,333,250,278,
      500,500,500,500,500,500,500,500,500,500,333,333,570,570,570,500,930,
      722,667,722,722,667,611,778,778,389,500,778,667,944,722,778,611,778,722,556,667,722,722,1000,722,722,667,
      333,278,333,581,500,333,
      500,556,444,556,444,333,500,556,278,333,556,278,833,556,500,556,556,444,389,333,556,500,722,500,500,444,
      394,220,394,520],
    'Times-Italic': [250,333,420,500,500,833,778,214,333,333,500,675,250,333,250,278,
      500,500,500,500,500,500,500,500,500,500,333,333,675,675,675,500,920,
      611,611,667,722,611,611,722,722,333,444,667,556,833,667,722,611,722,611,500,556,722,611,833,611,556,556,
      389,278,389,422,500,333,
      500,500,444,500,444,278,500,500,278,278,444,278,722,500,500,500,500,389,389,278,500,444,667,444,444,389,
      400,275,400,541],
    'Helvetica-Bold': [278,333,474,556,556,889,722,238,333,333,389,584,278,333,278,278,
      556,556,556,556,556,556,556,556,556,556,333,333,584,584,584,611,975,
      722,722,722,722,667,611,778,722,278,556,722,611,833,722,778,667,778,722,667,611,722,667,944,667,667,611,
      333,278,333,584,556,333,
      556,611,556,611,556,333,611,611,278,278,556,278,889,611,611,611,611,389,556,333,611,556,778,556,556,500,
      389,280,389,584]
  };

  /* Largeurs des caractères WinAnsi non-ASCII les plus courants */
  var EXTRA = {
    'Times-Roman':    { 0x80:500, 0x85:1000, 0x91:333, 0x92:333, 0x93:444, 0x94:444, 0x95:350, 0x96:500, 0x97:1000, 0x9C:722, 0x8C:889, 0xA0:250, 0xAB:500, 0xB0:400, 0xB7:250, 0xBB:500, 0xDF:500, 0xE6:667, 0xC6:889 },
    'Times-Bold':     { 0x80:500, 0x85:1000, 0x91:333, 0x92:333, 0x93:500, 0x94:500, 0x95:350, 0x96:500, 0x97:1000, 0x9C:722, 0x8C:1000, 0xA0:250, 0xAB:500, 0xB0:400, 0xB7:250, 0xBB:500, 0xDF:556, 0xE6:722, 0xC6:1000 },
    'Times-Italic':   { 0x80:500, 0x85:889, 0x91:333, 0x92:333, 0x93:556, 0x94:556, 0x95:350, 0x96:500, 0x97:889, 0x9C:667, 0x8C:944, 0xA0:250, 0xAB:500, 0xB0:400, 0xB7:250, 0xBB:500, 0xDF:500, 0xE6:667, 0xC6:944 },
    'Helvetica-Bold': { 0x80:556, 0x85:1000, 0x91:278, 0x92:278, 0x93:500, 0x94:500, 0x95:350, 0x96:556, 0x97:1000, 0x9C:944, 0x8C:1000, 0xA0:278, 0xAB:556, 0xB0:400, 0xB7:278, 0xBB:556, 0xDF:611, 0xE6:889, 0xC6:1000 }
  };

  /* Unicode → WinAnsi pour ce qui n'est pas en Latin-1 */
  var PUNCT = { 0x2018:0x91, 0x2019:0x92, 0x201A:0x82, 0x201C:0x93, 0x201D:0x94, 0x201E:0x84,
    0x2020:0x86, 0x2021:0x87, 0x2022:0x95, 0x2026:0x85, 0x2030:0x89, 0x2039:0x8B, 0x203A:0x9B,
    0x2013:0x96, 0x2014:0x97, 0x2044:0x2F, 0x20AC:0x80, 0x0152:0x8C, 0x0153:0x9C, 0x0160:0x8A,
    0x0161:0x9A, 0x0178:0x9F, 0x017D:0x8E, 0x017E:0x9E, 0x0192:0x83, 0x02C6:0x88, 0x02DC:0x98,
    0x2122:0x99, 0x00A0:0x20, 0x2212:0x2D, 0x2192:0x3E, 0x21D2:0x3E, 0x00AD:0x2D };

  /* Lettre de base d'un caractère accenté, pour la largeur */
  var BASE = (function () {
    var m = {}, i;
    function span(from, to, ch) { for (i = from; i <= to; i++) m[i] = ch.charCodeAt(0); }
    span(0xC0, 0xC5, 'A'); m[0xC7] = 67; span(0xC8, 0xCB, 'E'); span(0xCC, 0xCF, 'I');
    m[0xD0] = 68; m[0xD1] = 78; span(0xD2, 0xD6, 'O'); m[0xD8] = 79; span(0xD9, 0xDC, 'U');
    m[0xDD] = 89; m[0xDE] = 80;
    span(0xE0, 0xE5, 'a'); m[0xE7] = 99; span(0xE8, 0xEB, 'e'); span(0xEC, 0xEF, 'i');
    m[0xF0] = 111; m[0xF1] = 110; span(0xF2, 0xF6, 'o'); m[0xF8] = 111; span(0xF9, 0xFC, 'u');
    m[0xFD] = 121; m[0xFE] = 112; m[0xFF] = 121;
    return m;
  })();

  /* Chaîne Unicode → tableau d'octets WinAnsi (les glyphes absents sont retirés) */
  function encode(str) {
    var out = [], i, c;
    str = String(str == null ? '' : str);
    for (i = 0; i < str.length; i++) {
      c = str.charCodeAt(i);
      if (c >= 32 && c <= 126) out.push(c);
      else if (c >= 0xA0 && c <= 0xFF) out.push(c);
      else if (PUNCT[c] !== undefined) out.push(PUNCT[c]);
      else if (c === 9) out.push(32);
      /* le reste (émojis, symboles hors Latin-1) est simplement ignoré */
    }
    return out;
  }

  function widthOfCode(font, code) {
    if (code >= 32 && code <= 126) return ASCII[font][code - 32];
    var e = EXTRA[font];
    if (e && e[code] !== undefined) return e[code];
    if (BASE[code] !== undefined) return ASCII[font][BASE[code] - 32];
    return font.indexOf('Helvetica') === 0 ? 556 : 500;
  }

  /* Largeur d'un texte en mm */
  function widthOf(str, font, size) {
    var b = encode(str), w = 0, i;
    for (i = 0; i < b.length; i++) w += widthOfCode(font, b[i]);
    return w / 1000 * size / K;
  }

  /* Découpe un texte pour tenir dans une largeur donnée (mm) */
  function wrap(str, font, size, maxW) {
    var words = String(str).split(/\s+/).filter(function (w) { return w !== ''; });
    var lines = [], cur = '';
    words.forEach(function (w) {
      var test = cur ? cur + ' ' + w : w;
      if (widthOf(test, font, size) <= maxW || !cur) {
        /* un mot seul plus large que la colonne : on le coupe */
        if (!cur && widthOf(w, font, size) > maxW) {
          var piece = '';
          for (var i = 0; i < w.length; i++) {
            if (widthOf(piece + w[i], font, size) > maxW && piece) { lines.push(piece); piece = ''; }
            piece += w[i];
          }
          cur = piece;
        } else cur = test;
      } else { lines.push(cur); cur = w; }
    });
    if (cur) lines.push(cur);
    return lines.length ? lines : [''];
  }

  /* --- Document --------------------------------------------------------- */
  function create(opts) {
    opts = opts || {};
    var page = opts.page || A4;
    var pages = [];          /* chaque page = tableau de fragments de flux */
    var cur = null;
    var FONTS = ['Times-Roman', 'Times-Bold', 'Times-Italic', 'Helvetica-Bold'];

    function fontRef(name) { return '/F' + (FONTS.indexOf(name) + 1); }
    function pt(mmv) { return (mmv * K).toFixed(2); }
    function ptY(mmv) { return ((page.h - mmv) * K).toFixed(2); }

    /* Chaîne de texte PDF en UTF-16BE avec BOM (dictionnaire Info) */
    function utf16(str) {
      var out = [0xFE, 0xFF], i, c;
      str = String(str);
      for (i = 0; i < str.length; i++) {
        c = str.charCodeAt(i);
        out.push((c >> 8) & 0xFF, c & 0xFF);
      }
      return esc(out);
    }

    function esc(bytes) {
      var s = '', i, c;
      for (i = 0; i < bytes.length; i++) {
        c = bytes[i];
        if (c === 40 || c === 41 || c === 92) s += '\\';
        s += String.fromCharCode(c);
      }
      return s;
    }

    var doc = {
      page: page,
      newPage: function () { cur = []; pages.push(cur); return doc; },
      pageCount: function () { return pages.length; },

      /* texte : x,y en mm ; y = ligne de base */
      text: function (str, x, y, o) {
        o = o || {};
        var bytes = encode(str);
        if (!bytes.length) return doc;
        var font = o.font || 'Times-Roman', size = o.size || 10;
        var g = o.rgb ? o.rgb.map(function (v) { return v.toFixed(3); }).join(' ') + ' rg'
                      : (o.gray === undefined ? 0 : o.gray).toFixed(3) + ' g';
        cur.push(g + ' BT ' + fontRef(font) + ' ' + size + ' Tf ' +
          pt(x) + ' ' + ptY(y) + ' Td (' + esc(bytes) + ') Tj ET');
        return doc;
      },

      rect: function (x, y, w, h, o) {
        o = o || {};
        var s = '';
        if (o.rgb) s += o.rgb.map(function (v) { return v.toFixed(3); }).join(' ') + ' rg ';
        else if (o.fill !== undefined) s += o.fill.toFixed(3) + ' g ';
        if (o.stroke !== undefined) s += o.stroke.toFixed(3) + ' G ' + (o.lw || 0.25).toFixed(2) + ' w ';
        s += pt(x) + ' ' + ptY(y + h) + ' ' + pt(w) + ' ' + pt(h) + ' re ';
        var hasFill = (o.fill !== undefined || o.rgb);
        s += (hasFill && o.stroke !== undefined) ? 'B' : (hasFill ? 'f' : 'S');
        cur.push(s);
        return doc;
      },

      line: function (x1, y1, x2, y2, o) {
        o = o || {};
        var s = (o.gray === undefined ? 0.6 : o.gray).toFixed(3) + ' G ' + (o.lw || 0.25).toFixed(2) + ' w ';
        if (o.dash) s += '[' + o.dash + '] 0 d ';
        s += pt(x1) + ' ' + ptY(y1) + ' m ' + pt(x2) + ' ' + ptY(y2) + ' l S';
        if (o.dash) s += ' [] 0 d';
        cur.push(s);
        return doc;
      },

      widthOf: widthOf,
      wrap: wrap,

      /* Assemble le fichier PDF */
      build: function () {
        var objs = [], i;
        function add(s) { objs.push(s); return objs.length; }

        var fontIds = FONTS.map(function (f) {
          return add('<< /Type /Font /Subtype /Type1 /BaseFont /' + f + ' /Encoding /WinAnsiEncoding >>');
        });

        var pagesId = objs.length + 1;
        add('');                                   /* réservé : arbre des pages */

        var kids = [];
        pages.forEach(function (frags) {
          var content = frags.join('\n');
          var cId = add('<< /Length ' + content.length + ' >>\nstream\n' + content + '\nendstream');
          var res = '<< /Font << ' + FONTS.map(function (f, k) {
            return '/F' + (k + 1) + ' ' + fontIds[k] + ' 0 R';
          }).join(' ') + ' >> >>';
          var pId = add('<< /Type /Page /Parent ' + pagesId + ' 0 R /MediaBox [0 0 ' +
            (page.w * K).toFixed(2) + ' ' + (page.h * K).toFixed(2) + '] /Resources ' + res +
            ' /Contents ' + cId + ' 0 R >>');
          kids.push(pId + ' 0 R');
        });

        objs[pagesId - 1] = '<< /Type /Pages /Count ' + pages.length + ' /Kids [' + kids.join(' ') + '] >>';

        var app = utf16('Impariamo l’italiano');
        var info = add('<< /Title (' + utf16(opts.title || 'Impariamo l’italiano') +
          ') /Producer (' + app + ') /Creator (' + app + ') >>');
        var catalog = add('<< /Type /Catalog /Pages ' + pagesId + ' 0 R >>');

        var out = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
        var offsets = [];
        for (i = 0; i < objs.length; i++) {
          offsets.push(out.length);
          out += (i + 1) + ' 0 obj\n' + objs[i] + '\nendobj\n';
        }
        var xref = out.length;
        out += 'xref\n0 ' + (objs.length + 1) + '\n0000000000 65535 f \n';
        for (i = 0; i < objs.length; i++) {
          out += ('0000000000' + offsets[i]).slice(-10) + ' 00000 n \n';
        }
        out += 'trailer\n<< /Size ' + (objs.length + 1) + ' /Root ' + catalog +
          ' 0 R /Info ' + info + ' 0 R >>\nstartxref\n' + xref + '\n%%EOF';

        var bytes = new Uint8Array(out.length);
        for (i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i) & 0xFF;
        return bytes;
      },

      blob: function () {
        return new Blob([doc.build()], { type: 'application/pdf' });
      }
    };
    return doc;
  }

  return { create: create, A4: A4, widthOf: widthOf, wrap: wrap, encode: encode };
})();
