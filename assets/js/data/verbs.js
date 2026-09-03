/* =========================================================================
   VERBI — moteur de conjugaison + base de verbes
   Le moteur génère les formes régulières (avec règles orthographiques) ;
   la base ne stocke que les irrégularités.
   ========================================================================= */
window.DATA = window.DATA || {};

(function () {
  'use strict';

  var PERSONS = ['io', 'tu', 'lui / lei / Lei', 'noi', 'voi', 'loro'];

  /* --- Base de verbes -----------------------------------------------------
     group : 'are' | 'ere' | 'ire' | 'isc'
     aux   : 'avere' | 'essere' | 'both'
     pp    : participe passé si irrégulier
     futStem : radical du futur/conditionnel si contracté
     presente / imperfetto / congiuntivo : tableau de 6 si irrégulier
     impTu : impératif 2e pers. sing. irrégulier
  ------------------------------------------------------------------------ */
  var VERBS = [
    /* ---- modèles réguliers ---- */
    { inf: 'parlare', fr: 'parler', group: 'are', aux: 'avere', model: true, tags: ['régulier'] },
    { inf: 'credere', fr: 'croire', group: 'ere', aux: 'avere', model: true, tags: ['régulier'] },
    { inf: 'dormire', fr: 'dormir', group: 'ire', aux: 'avere', model: true, tags: ['régulier'] },
    { inf: 'finire', fr: 'finir', group: 'isc', aux: 'avere', model: true, tags: ['régulier', '-isc-'] },

    /* ---- réguliers courants ---- */
    { inf: 'abitare', fr: 'habiter', group: 'are', aux: 'avere' },
    { inf: 'lavorare', fr: 'travailler', group: 'are', aux: 'avere' },
    { inf: 'mangiare', fr: 'manger', group: 'are', aux: 'avere', tags: ['orthographe'] },
    { inf: 'cominciare', fr: 'commencer', group: 'are', aux: 'both', tags: ['orthographe'] },
    { inf: 'pagare', fr: 'payer', group: 'are', aux: 'avere', tags: ['orthographe'] },
    { inf: 'cercare', fr: 'chercher', group: 'are', aux: 'avere', tags: ['orthographe'] },
    { inf: 'giocare', fr: 'jouer', group: 'are', aux: 'avere', tags: ['orthographe'] },
    { inf: 'studiare', fr: 'étudier', group: 'are', aux: 'avere', tags: ['orthographe'] },
    { inf: 'comprare', fr: 'acheter', group: 'are', aux: 'avere' },
    { inf: 'guardare', fr: 'regarder', group: 'are', aux: 'avere' },
    { inf: 'ascoltare', fr: 'écouter', group: 'are', aux: 'avere' },
    { inf: 'aspettare', fr: 'attendre', group: 'are', aux: 'avere' },
    { inf: 'incontrare', fr: 'rencontrer', group: 'are', aux: 'avere' },
    { inf: 'tornare', fr: 'revenir, rentrer', group: 'are', aux: 'essere' },
    { inf: 'arrivare', fr: 'arriver', group: 'are', aux: 'essere' },
    { inf: 'entrare', fr: 'entrer', group: 'are', aux: 'essere' },
    { inf: 'restare', fr: 'rester', group: 'are', aux: 'essere' },
    { inf: 'costare', fr: 'coûter', group: 'are', aux: 'essere' },
    { inf: 'provare', fr: 'essayer', group: 'are', aux: 'avere' },
    { inf: 'ordinare', fr: 'commander', group: 'are', aux: 'avere' },
    { inf: 'viaggiare', fr: 'voyager', group: 'are', aux: 'avere' },
    { inf: 'noleggiare', fr: 'louer (véhicule)', group: 'are', aux: 'avere' },
    { inf: 'firmare', fr: 'signer', group: 'are', aux: 'avere' },
    { inf: 'assaggiare', fr: 'goûter', group: 'are', aux: 'avere' },
    { inf: 'vendere', fr: 'vendre', group: 'ere', aux: 'avere' },
    { inf: 'ricevere', fr: 'recevoir', group: 'ere', aux: 'avere' },
    { inf: 'ripetere', fr: 'répéter', group: 'ere', aux: 'avere' },
    { inf: 'partire', fr: 'partir', group: 'ire', aux: 'essere' },
    { inf: 'sentire', fr: 'entendre, sentir', group: 'ire', aux: 'avere' },
    { inf: 'seguire', fr: 'suivre', group: 'ire', aux: 'avere' },
    { inf: 'capire', fr: 'comprendre', group: 'isc', aux: 'avere' },
    { inf: 'preferire', fr: 'préférer', group: 'isc', aux: 'avere' },
    { inf: 'pulire', fr: 'nettoyer', group: 'isc', aux: 'avere' },
    { inf: 'spedire', fr: 'expédier', group: 'isc', aux: 'avere' },
    { inf: 'guarire', fr: 'guérir', group: 'isc', aux: 'both' },
    { inf: 'costruire', fr: 'construire', group: 'isc', aux: 'avere' },

    /* ---- irréguliers ---- */
    {
      inf: 'essere', fr: 'être', group: 'ere', aux: 'essere', pp: 'stato', futStem: 'sar',
      presente: ['sono', 'sei', 'è', 'siamo', 'siete', 'sono'],
      imperfetto: ['ero', 'eri', 'era', 'eravamo', 'eravate', 'erano'],
      congiuntivo: ['sia', 'sia', 'sia', 'siamo', 'siate', 'siano'],
      impTu: 'sii', ger: 'essendo', tags: ['essentiel', 'auxiliaire']
    },
    {
      inf: 'avere', fr: 'avoir', group: 'ere', aux: 'avere', futStem: 'avr',
      presente: ['ho', 'hai', 'ha', 'abbiamo', 'avete', 'hanno'],
      congiuntivo: ['abbia', 'abbia', 'abbia', 'abbiamo', 'abbiate', 'abbiano'],
      impTu: 'abbi', tags: ['essentiel', 'auxiliaire']
    },
    {
      inf: 'fare', fr: 'faire', group: 'are', aux: 'avere', pp: 'fatto', futStem: 'far',
      presente: ['faccio', 'fai', 'fa', 'facciamo', 'fate', 'fanno'],
      imperfetto: ['facevo', 'facevi', 'faceva', 'facevamo', 'facevate', 'facevano'],
      impTu: 'fa\'', ger: 'facendo', tags: ['essentiel']
    },
    {
      inf: 'andare', fr: 'aller', group: 'are', aux: 'essere', futStem: 'andr',
      presente: ['vado', 'vai', 'va', 'andiamo', 'andate', 'vanno'],
      impTu: 'va\'', tags: ['essentiel']
    },
    {
      inf: 'venire', fr: 'venir', group: 'ire', aux: 'essere', pp: 'venuto', futStem: 'verr',
      presente: ['vengo', 'vieni', 'viene', 'veniamo', 'venite', 'vengono'], tags: ['essentiel']
    },
    {
      inf: 'stare', fr: 'être, aller (santé)', group: 'are', aux: 'essere', pp: 'stato', futStem: 'star',
      presente: ['sto', 'stai', 'sta', 'stiamo', 'state', 'stanno'],
      congiuntivo: ['stia', 'stia', 'stia', 'stiamo', 'stiate', 'stiano'],
      impTu: 'sta\'', tags: ['essentiel']
    },
    {
      inf: 'dare', fr: 'donner', group: 'are', aux: 'avere', pp: 'dato', futStem: 'dar',
      presente: ['do', 'dai', 'dà', 'diamo', 'date', 'danno'],
      congiuntivo: ['dia', 'dia', 'dia', 'diamo', 'diate', 'diano'],
      impTu: 'da\'', tags: ['essentiel']
    },
    {
      inf: 'dire', fr: 'dire', group: 'ire', aux: 'avere', pp: 'detto', futStem: 'dir',
      presente: ['dico', 'dici', 'dice', 'diciamo', 'dite', 'dicono'],
      imperfetto: ['dicevo', 'dicevi', 'diceva', 'dicevamo', 'dicevate', 'dicevano'],
      impTu: 'di\'', ger: 'dicendo', tags: ['essentiel']
    },
    {
      inf: 'potere', fr: 'pouvoir', group: 'ere', aux: 'avere', futStem: 'potr',
      presente: ['posso', 'puoi', 'può', 'possiamo', 'potete', 'possono'], tags: ['modal']
    },
    {
      inf: 'dovere', fr: 'devoir', group: 'ere', aux: 'avere', futStem: 'dovr',
      presente: ['devo', 'devi', 'deve', 'dobbiamo', 'dovete', 'devono'],
      congiuntivo: ['debba', 'debba', 'debba', 'dobbiamo', 'dobbiate', 'debbano'], tags: ['modal']
    },
    {
      inf: 'volere', fr: 'vouloir', group: 'ere', aux: 'avere', futStem: 'vorr',
      presente: ['voglio', 'vuoi', 'vuole', 'vogliamo', 'volete', 'vogliono'], tags: ['modal']
    },
    {
      inf: 'sapere', fr: 'savoir', group: 'ere', aux: 'avere', futStem: 'sapr',
      presente: ['so', 'sai', 'sa', 'sappiamo', 'sapete', 'sanno'],
      congiuntivo: ['sappia', 'sappia', 'sappia', 'sappiamo', 'sappiate', 'sappiano'],
      impTu: 'sappi'
    },
    {
      inf: 'uscire', fr: 'sortir', group: 'ire', aux: 'essere',
      presente: ['esco', 'esci', 'esce', 'usciamo', 'uscite', 'escono']
    },
    {
      inf: 'bere', fr: 'boire', group: 'ere', aux: 'avere', pp: 'bevuto', futStem: 'berr',
      presente: ['bevo', 'bevi', 'beve', 'beviamo', 'bevete', 'bevono'],
      imperfetto: ['bevevo', 'bevevi', 'beveva', 'bevevamo', 'bevevate', 'bevevano'],
      ger: 'bevendo'
    },
    {
      inf: 'rimanere', fr: 'rester', group: 'ere', aux: 'essere', pp: 'rimasto', futStem: 'rimarr',
      presente: ['rimango', 'rimani', 'rimane', 'rimaniamo', 'rimanete', 'rimangono']
    },
    {
      inf: 'tenere', fr: 'tenir', group: 'ere', aux: 'avere', pp: 'tenuto', futStem: 'terr',
      presente: ['tengo', 'tieni', 'tiene', 'teniamo', 'tenete', 'tengono']
    },
    {
      inf: 'scegliere', fr: 'choisir', group: 'ere', aux: 'avere', pp: 'scelto',
      presente: ['scelgo', 'scegli', 'sceglie', 'scegliamo', 'scegliete', 'scelgono']
    },
    {
      inf: 'salire', fr: 'monter', group: 'ire', aux: 'essere',
      presente: ['salgo', 'sali', 'sale', 'saliamo', 'salite', 'salgono']
    },
    {
      inf: 'piacere', fr: 'plaire', group: 'ere', aux: 'essere', pp: 'piaciuto',
      presente: ['piaccio', 'piaci', 'piace', 'piacciamo', 'piacete', 'piacciono'],
      tags: ['construction particulière']
    },
    {
      inf: 'morire', fr: 'mourir', group: 'ire', aux: 'essere', pp: 'morto',
      presente: ['muoio', 'muori', 'muore', 'moriamo', 'morite', 'muoiono']
    },
    {
      inf: 'sedersi', fr: 's’asseoir', group: 'ere', aux: 'essere', pp: 'seduto', refl: true, futStem: 'sieder',
      presente: ['mi siedo', 'ti siedi', 'si siede', 'ci sediamo', 'vi sedete', 'si siedono']
    },
    { inf: 'vedere', fr: 'voir', group: 'ere', aux: 'avere', pp: 'visto', futStem: 'vedr' },
    { inf: 'vivere', fr: 'vivre', group: 'ere', aux: 'both', pp: 'vissuto', futStem: 'vivr' },
    { inf: 'prendere', fr: 'prendre', group: 'ere', aux: 'avere', pp: 'preso' },
    { inf: 'mettere', fr: 'mettre', group: 'ere', aux: 'avere', pp: 'messo' },
    { inf: 'leggere', fr: 'lire', group: 'ere', aux: 'avere', pp: 'letto' },
    { inf: 'scrivere', fr: 'écrire', group: 'ere', aux: 'avere', pp: 'scritto' },
    { inf: 'chiudere', fr: 'fermer', group: 'ere', aux: 'avere', pp: 'chiuso' },
    { inf: 'aprire', fr: 'ouvrir', group: 'ire', aux: 'avere', pp: 'aperto' },
    { inf: 'offrire', fr: 'offrir', group: 'ire', aux: 'avere', pp: 'offerto' },
    { inf: 'soffrire', fr: 'souffrir', group: 'ire', aux: 'avere', pp: 'sofferto' },
    { inf: 'chiedere', fr: 'demander', group: 'ere', aux: 'avere', pp: 'chiesto' },
    { inf: 'rispondere', fr: 'répondre', group: 'ere', aux: 'avere', pp: 'risposto' },
    { inf: 'perdere', fr: 'perdre', group: 'ere', aux: 'avere', pp: 'perso' },
    { inf: 'vincere', fr: 'gagner', group: 'ere', aux: 'avere', pp: 'vinto' },
    { inf: 'nascere', fr: 'naître', group: 'ere', aux: 'essere', pp: 'nato' },
    { inf: 'conoscere', fr: 'connaître', group: 'ere', aux: 'avere', pp: 'conosciuto' },
    { inf: 'decidere', fr: 'décider', group: 'ere', aux: 'avere', pp: 'deciso' },
    { inf: 'spendere', fr: 'dépenser', group: 'ere', aux: 'avere', pp: 'speso' },
    { inf: 'spegnere', fr: 'éteindre', group: 'ere', aux: 'avere', pp: 'spento',
      presente: ['spengo', 'spegni', 'spegne', 'spegniamo', 'spegnete', 'spengono'] },
    { inf: 'correre', fr: 'courir', group: 'ere', aux: 'both', pp: 'corso' },
    { inf: 'succedere', fr: 'arriver, se passer', group: 'ere', aux: 'essere', pp: 'successo' },
    { inf: 'rompere', fr: 'casser', group: 'ere', aux: 'avere', pp: 'rotto' },
    { inf: 'accendere', fr: 'allumer', group: 'ere', aux: 'avere', pp: 'acceso' },
    { inf: 'scendere', fr: 'descendre', group: 'ere', aux: 'essere', pp: 'sceso' },
    { inf: 'muoversi', fr: 'bouger', group: 'ere', aux: 'essere', pp: 'mosso', refl: true,
      presente: ['mi muovo', 'ti muovi', 'si muove', 'ci muoviamo', 'vi muovete', 'si muovono'] },
    { inf: 'alzarsi', fr: 'se lever', group: 'are', aux: 'essere', refl: true,
      presente: ['mi alzo', 'ti alzi', 'si alza', 'ci alziamo', 'vi alzate', 'si alzano'] },
    { inf: 'svegliarsi', fr: 'se réveiller', group: 'are', aux: 'essere', refl: true,
      presente: ['mi sveglio', 'ti svegli', 'si sveglia', 'ci svegliamo', 'vi svegliate', 'si svegliano'] },
    { inf: 'divertirsi', fr: 's’amuser', group: 'ire', aux: 'essere', refl: true,
      presente: ['mi diverto', 'ti diverti', 'si diverte', 'ci divertiamo', 'vi divertite', 'si divertono'] }
  ];

  /* --- Règles orthographiques ------------------------------------------- */
  function hardStem(stem, ending) {
    // -care / -gare : ajout d'un h devant e/i
    if (/[cg]$/.test(stem) && /^[ei]/.test(ending)) return stem + 'h';
    return stem;
  }
  function softStem(stem, ending) {
    // -ciare / -giare / -sciare : le i tombe devant e/i
    if (/(ci|gi|sci)$/.test(stem) && /^[ei]/.test(ending)) return stem.slice(0, -1);
    // -iare : pas de double i
    if (/i$/.test(stem) && /^i/.test(ending)) return stem.slice(0, -1);
    return stem;
  }
  function join(stem, ending) {
    var s = hardStem(stem, ending);
    s = softStem(s, ending);
    return s + ending;
  }

  function baseInf(v) { return v.refl ? v.inf.replace(/rsi$/, 're') : v.inf; }
  function stemOf(v) { return baseInf(v).replace(/(are|ere|ire)$/, ''); }
  function isRegularPresente(v) {
    if (!v.presente) return true;
    var reg = regPresente(v);
    return v.presente.every(function (f, i) {
      return f.replace(/^(mi|ti|si|ci|vi) /, '') === reg[i];
    });
  }

  function reflPrefix(i) { return ['mi ', 'ti ', 'si ', 'ci ', 'vi ', 'si '][i]; }

  /* --- Générateurs ------------------------------------------------------- */
  var END = {
    are: ['o', 'i', 'a', 'iamo', 'ate', 'ano'],
    ere: ['o', 'i', 'e', 'iamo', 'ete', 'ono'],
    ire: ['o', 'i', 'e', 'iamo', 'ite', 'ono'],
    isc: ['isco', 'isci', 'isce', 'iamo', 'ite', 'iscono']
  };

  function regPresente(v) {
    var st = stemOf(v), e = END[v.group];
    return e.map(function (end) { return join(st, end); });
  }

  function presente(v) {
    if (v.presente) return v.presente.slice();
    return regPresente(v).map(function (f, i) { return v.refl ? reflPrefix(i) + f : f; });
  }

  function imperfetto(v) {
    if (v.imperfetto) return v.imperfetto.slice();
    var st = baseInf(v).replace(/re$/, '');
    var e = ['vo', 'vi', 'va', 'vamo', 'vate', 'vano'];
    return e.map(function (end, i) {
      var f = st + end;
      return v.refl ? reflPrefix(i) + f : f;
    });
  }

  function futStem(v) {
    if (v.futStem) return v.futStem;
    var st = stemOf(v);
    if (v.group === 'are') return join(st, 'er');
    if (v.group === 'ere') return join(st, 'er');
    return join(st, 'ir');
  }

  function futuro(v) {
    var st = futStem(v), e = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
    return e.map(function (end, i) {
      var f = st + end;
      return v.refl ? reflPrefix(i) + f : f;
    });
  }

  function condizionale(v) {
    var st = futStem(v), e = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
    return e.map(function (end, i) {
      var f = st + end;
      return v.refl ? reflPrefix(i) + f : f;
    });
  }

  function congiuntivo(v) {
    if (v.congiuntivo) return v.congiuntivo.slice();
    var pr = presente(v).map(function (f) { return v.refl ? f.replace(/^(mi|ti|si|ci|vi) /, '') : f; });
    var noi = pr[3];
    var voi = noi.replace(/iamo$/, 'iate');
    var sg, pl;
    if (v.group === 'are' && isRegularPresente(v)) {
      // verbes réguliers en -ARE : -i, -i, -i, -iamo, -iate, -ino
      var st = stemOf(v);
      sg = join(st, 'i'); pl = join(st, 'ino');
    } else {
      // les autres se forment sur la 1re personne du présent : -a … -ano
      var ioStem = pr[0].replace(/o$/, '');
      sg = ioStem + 'a'; pl = ioStem + 'ano';
    }
    var forms = [sg, sg, sg, noi, voi, pl];
    return forms.map(function (f, i) { return v.refl ? reflPrefix(i) + f : f; });
  }

  function participio(v) {
    if (v.pp) return v.pp;
    var st = stemOf(v);
    if (v.group === 'are') return st + 'ato';
    if (v.group === 'ere') return st + 'uto';
    return st + 'ito';
  }

  function gerundio(v) {
    if (v.ger) return v.ger;
    var st = stemOf(v);
    return v.group === 'are' ? st + 'ando' : st + 'endo';
  }

  function imperativo(v) {
    var pr = presente(v), cong = congiuntivo(v);
    var st = stemOf(v);
    var bare = function (f) { return f.replace(/^(mi|ti|si|ci|vi) /, ''); };
    var tu = v.impTu || (v.group === 'are' ? join(st, 'a') : bare(pr[1]));
    var voi = v.impVoi || (/^(essere|avere|sapere)$/.test(v.inf) ? cong[4] : bare(pr[4]));
    var noi = bare(pr[3]);
    var lei = cong[2];
    var negTu = 'non ' + v.inf;
    if (v.refl) {
      // pronom enclitique : alzati, alziamoci, alzatevi ; forme de politesse : si alzi
      tu = tu + 'ti';
      noi = noi + 'ci';
      voi = voi + 'vi';
      lei = bare(cong[2]);
      lei = 'si ' + lei;
      negTu = 'non ' + baseInf(v).replace(/e$/, '') + 'ti';
    }
    return {
      tu: tu,
      Lei: lei,
      noi: noi,
      voi: voi,
      negTu: negTu
    };
  }

  function passatoProssimo(v) {
    var aux = v.aux === 'essere' ? ['sono', 'sei', 'è', 'siamo', 'siete', 'sono']
                                 : ['ho', 'hai', 'ha', 'abbiamo', 'avete', 'hanno'];
    var pp = participio(v);
    var agree = (v.aux === 'essere' || v.refl);
    var forms = aux.map(function (a, i) {
      var p = pp;
      if (agree) {
        var base = pp.replace(/o$/, '');
        p = (i === 3 || i === 4 || i === 5) ? base + 'i/e' : base + 'o/a';
      }
      var pre = v.refl ? reflPrefix(i) : '';
      var a2 = v.refl ? ['sono', 'sei', 'è', 'siamo', 'siete', 'sono'][i] : a;
      return pre + a2 + ' ' + p;
    });
    return forms;
  }

  function conjugate(v) {
    return {
      inf: v.inf, fr: v.fr, group: v.group, aux: v.aux, refl: !!v.refl, tags: v.tags || [],
      participio: participio(v),
      gerundio: gerundio(v),
      presente: presente(v),
      passato: passatoProssimo(v),
      imperfetto: imperfetto(v),
      futuro: futuro(v),
      condizionale: condizionale(v),
      congiuntivo: congiuntivo(v),
      imperativo: imperativo(v)
    };
  }

  var TENSES = [
    { id: 'presente', label: 'Indicativo presente', ue: 'UE1' },
    { id: 'passato', label: 'Passato prossimo', ue: 'UE2' },
    { id: 'imperfetto', label: 'Imperfetto', ue: 'UE2' },
    { id: 'futuro', label: 'Futuro semplice', ue: 'UE3' },
    { id: 'congiuntivo', label: 'Congiuntivo presente', ue: 'UE2' },
    { id: 'condizionale', label: 'Condizionale presente', ue: 'bonus' }
  ];

  window.DATA.verbs = {
    persons: PERSONS,
    raw: VERBS,
    tenses: TENSES,
    conjugate: conjugate,
    all: VERBS.map(conjugate),
    find: function (inf) {
      var v = VERBS.filter(function (x) { return x.inf === inf; })[0];
      return v ? conjugate(v) : null;
    }
  };
})();
