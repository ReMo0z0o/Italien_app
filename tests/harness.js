/* Environnement navigateur minimal pour charger les modules hors DOM */
global.window = global;
global.document = {
  addEventListener: function () {}, querySelector: function () { return null; },
  querySelectorAll: function () { return []; }, getElementById: function () { return null; },
  createElement: function () { return { classList: { add: function () {} }, style: {}, appendChild: function () {}, remove: function () {} }; },
  head: { appendChild: function () {} }, body: { appendChild: function () {} }
};
global.localStorage = (function () {
  var m = {};
  return { getItem: function (k) { return m[k] || null; }, setItem: function (k, v) { m[k] = v; }, removeItem: function (k) { delete m[k]; } };
})();
global.location = { hash: '' };
var fs = require('fs'), path = require('path'), vm = require('vm');
var ROOT = path.join(__dirname, '..');
global.load = function (f) { vm.runInThisContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), { filename: f }); };
global.loadAll = function () {
  ['assets/js/data/vocab.js', 'assets/js/data/verbs.js', 'assets/js/data/grammar.js',
   'assets/js/data/exercises.js', 'assets/js/data/phrases.js', 'assets/js/data/program.js',
   'assets/js/core/util.js', 'assets/js/core/pdf.js', 'assets/js/core/sheet.js',
   'assets/js/core/speech.js', 'assets/js/core/store.js',
   'assets/js/core/ui.js'].forEach(global.load);
};
