/* =========================================================================
   GRAMMATICA — leçons suivant le programme du cours (UE1 → UE3)
   blocs : p | rule | table | ex | warn | tip | list
   ========================================================================= */
window.DATA = window.DATA || {};

window.DATA.grammar = [

/* ============================ UE1 ====================================== */
{
  id: 'presente', ue: 'UE1', icon: '⏱', title: 'L’indicativo presente',
  subtitle: 'Verbes réguliers et principaux irréguliers',
  tags: ['verbe', 'présent'],
  blocks: [
    { t: 'p', text: 'L’italien a trois groupes de verbes, reconnaissables à la terminaison de l’infinitif : <b>-ARE</b>, <b>-ERE</b>, <b>-IRE</b>. On enlève la terminaison et on ajoute les désinences du présent.' },
    { t: 'table', caption: 'Verbes réguliers', head: ['', 'parl-ARE', 'cred-ERE', 'dorm-IRE', 'fin-IRE (-isc-)'],
      rows: [
        ['io', 'parlo', 'credo', 'dormo', 'finisco'],
        ['tu', 'parli', 'credi', 'dormi', 'finisci'],
        ['lui / lei / Lei', 'parla', 'crede', 'dorme', 'finisce'],
        ['noi', 'parliamo', 'crediamo', 'dormiamo', 'finiamo'],
        ['voi', 'parlate', 'credete', 'dormite', 'finite'],
        ['loro', 'parlano', 'credono', 'dormono', 'finiscono']
      ] },
    { t: 'rule', title: 'Les verbes en -ISC-', text: 'Certains verbes en -IRE intercalent <b>-isc-</b> aux 3 personnes du singulier et à la 3<sup>e</sup> du pluriel : <i>finire, capire, preferire, pulire, spedire, costruire, guarire</i>. Les 4 formes « avec -isc- » forment la « botte » : io, tu, lui, loro.' },
    { t: 'rule', title: 'Attention à l’orthographe', text: '<b>-care / -gare</b> ajoutent un <b>h</b> devant i : <i>cerco → cerchi, cerchiamo</i> ; <i>pago → paghi, paghiamo</i>.<br><b>-ciare / -giare</b> perdent le i : <i>mangio → mangi, mangiamo</i> ; <i>comincio → cominci, cominciamo</i>.' },
    { t: 'table', caption: 'Les irréguliers indispensables', head: ['', 'essere', 'avere', 'fare', 'andare', 'stare', 'dare'],
      rows: [
        ['io', 'sono', 'ho', 'faccio', 'vado', 'sto', 'do'],
        ['tu', 'sei', 'hai', 'fai', 'vai', 'stai', 'dai'],
        ['lui/lei', 'è', 'ha', 'fa', 'va', 'sta', 'dà'],
        ['noi', 'siamo', 'abbiamo', 'facciamo', 'andiamo', 'stiamo', 'diamo'],
        ['voi', 'siete', 'avete', 'fate', 'andate', 'state', 'date'],
        ['loro', 'sono', 'hanno', 'fanno', 'vanno', 'stanno', 'danno']
      ] },
    { t: 'table', caption: 'Autres irréguliers fréquents', head: ['', 'venire', 'uscire', 'dire', 'bere', 'rimanere', 'scegliere'],
      rows: [
        ['io', 'vengo', 'esco', 'dico', 'bevo', 'rimango', 'scelgo'],
        ['tu', 'vieni', 'esci', 'dici', 'bevi', 'rimani', 'scegli'],
        ['lui/lei', 'viene', 'esce', 'dice', 'beve', 'rimane', 'sceglie'],
        ['noi', 'veniamo', 'usciamo', 'diciamo', 'beviamo', 'rimaniamo', 'scegliamo'],
        ['voi', 'venite', 'uscite', 'dite', 'bevete', 'rimanete', 'scegliete'],
        ['loro', 'vengono', 'escono', 'dicono', 'bevono', 'rimangono', 'scelgono']
      ] },
    { t: 'tip', text: 'En italien, le pronom sujet est presque toujours <b>omis</b> : la terminaison suffit. On ne l’utilise que pour insister ou opposer : <i>Io lavoro, lui invece dorme.</i>' },
    { t: 'ex', items: [
      { it: 'Che cosa fai stasera?', fr: 'Qu’est-ce que tu fais ce soir ?' },
      { it: 'Non capisco bene l’italiano.', fr: 'Je ne comprends pas bien l’italien.' },
      { it: 'Andiamo al bar, va bene?', fr: 'On va au bar, d’accord ?' }
    ] }
  ]
},
{
  id: 'politesse', ue: 'UE1', icon: '🎩', title: 'La forme de politesse : Lei / Voi',
  subtitle: 'Vouvoyer, et passer du Lei au tu',
  tags: ['communication', 'registre'],
  blocks: [
    { t: 'p', text: 'Pour vouvoyer <b>une personne</b>, l’italien utilise <b>Lei</b> (3<sup>e</sup> personne du singulier), quel que soit le sexe de l’interlocuteur. Le verbe se conjugue donc comme avec <i>lui / lei</i>.' },
    { t: 'table', head: ['', 'informel (tu)', 'formel (Lei)'],
      rows: [
        ['Question', 'Come stai?', 'Come sta?'],
        ['Nom', 'Come ti chiami?', 'Come si chiama?'],
        ['Provenance', 'Di dove sei?', 'Di dov’è?'],
        ['Possession', 'il tuo nome', 'il Suo nome'],
        ['Pronom objet', 'ti do…', 'Le do…'],
        ['Salutation', 'Ciao!', 'Buongiorno! / ArrivederLa!']
      ] },
    { t: 'rule', title: 'Voi', text: 'Pour vouvoyer <b>plusieurs personnes</b>, on utilise simplement <b>voi</b>. Le <i>Voi</i> de politesse au singulier existe encore dans le sud de l’Italie et dans les textes anciens / commerciaux, mais le standard est <b>Lei</b>.' },
    { t: 'rule', title: 'Passer du Lei au tu', text: 'C’est la personne la plus âgée ou la plus haut placée qui propose le tutoiement :<br>— <i>Le posso dare del tu?</i> (Puis-je vous tutoyer ?)<br>— <i>Certo, diamoci del tu!</i> (Bien sûr, tutoyons-nous !)<br>— <i>Possiamo darci del tu?</i> — <i>Volentieri!</i>' },
    { t: 'warn', text: 'On écrit souvent <b>Lei, La, Le, Suo</b> avec une majuscule dans les courriers formels, pour marquer la politesse.' },
    { t: 'ex', items: [
      { it: 'Signora, che cosa desidera?', fr: 'Madame, que désirez-vous ?' },
      { it: 'Mi scusi, Le posso fare una domanda?', fr: 'Excusez-moi, puis-je vous poser une question ?' },
      { it: 'Dottore, si accomodi, prego.', fr: 'Docteur, installez-vous, je vous en prie.' }
    ] }
  ]
},
{
  id: 'genere', ue: 'UE1', icon: '⚥', title: 'Le genre : masculin / féminin',
  subtitle: 'Reconnaître le genre des noms',
  tags: ['nom'],
  blocks: [
    { t: 'table', caption: 'Règle générale', head: ['Terminaison', 'Genre', 'Singulier → Pluriel'],
      rows: [
        ['-O', 'masculin', 'il libro → i libri'],
        ['-A', 'féminin', 'la casa → le case'],
        ['-E', 'm. OU f.', 'il fiore → i fiori / la chiave → le chiavi']
      ] },
    { t: 'rule', title: 'Noms masculins en -A', text: '<i>il problema, il tema, il sistema, il programma, il clima, il poeta, il papa</i> (le pape).<br>Pluriel en <b>-i</b> : <i>i problemi, i programmi</i>.' },
    { t: 'rule', title: 'Noms féminins en -O', text: '<i>la mano</i> (→ le mani), <i>la foto</i>, <i>la moto</i>, <i>la radio</i>, <i>la biro</i>. Les abrégés (foto ← fotografia) restent invariables au pluriel : <i>le foto</i>.' },
    { t: 'rule', title: 'Les noms en -E', text: 'Impossible de deviner : il faut apprendre le nom <b>avec son article</b>. <i>il pesce, il mare, il fiore</i> (m.) mais <i>la chiave, la notte, la carne</i> (f.).<br>Astuce : les noms en <b>-zione, -sione, -tà, -tù, -ie</b> sont féminins (<i>la stazione, la città, la serie</i>). Les noms en <b>-ore, -ame, -ale</b> sont généralement masculins (<i>il colore, il giornale</i>).' },
    { t: 'table', caption: 'Professions : masculin / féminin', head: ['Masculin', 'Féminin', 'Type'],
      rows: [
        ['il cuoco', 'la cuoca', '-o → -a'],
        ['il cameriere', 'la cameriera', '-e → -a'],
        ['lo studente', 'la studentessa', '-e → -essa'],
        ['il professore', 'la professoressa', '-ore → -essa'],
        ['il traduttore', 'la traduttrice', '-tore → -trice'],
        ['il giornalista', 'la giornalista', 'invariable (-ista)'],
        ['l’insegnante', 'l’insegnante', 'invariable (-ante / -ente)']
      ] },
    { t: 'warn', text: 'Certains noms de métier restent au masculin même pour une femme : <i>il medico, l’architetto, l’ingegnere, il ministro</i>. On peut préciser : <i>Maria è un medico</i> / <i>la dottoressa Maria Rossi</i>.' }
  ]
},
{
  id: 'articoli-det', ue: 'UE1', icon: '📎', title: 'Les articles définis',
  subtitle: 'il, lo, l’, i, gli, la, le',
  tags: ['article'],
  blocks: [
    { t: 'p', text: 'Le choix de l’article dépend du <b>genre</b> et surtout de la <b>lettre qui commence le mot suivant</b>.' },
    { t: 'table', caption: 'Masculin', head: ['Singulier', 'Pluriel', 'Devant…', 'Exemple'],
      rows: [
        ['il', 'i', 'consonne ordinaire', 'il libro → i libri'],
        ['lo', 'gli', 's + consonne, z, ps, gn, x, y, pn', 'lo studente → gli studenti'],
        ['l’', 'gli', 'voyelle', 'l’amico → gli amici']
      ] },
    { t: 'table', caption: 'Féminin', head: ['Singulier', 'Pluriel', 'Devant…', 'Exemple'],
      rows: [
        ['la', 'le', 'consonne', 'la casa → le case'],
        ['l’', 'le', 'voyelle', 'l’amica → le amiche']
      ] },
    { t: 'rule', title: 'Gli ou i ?', text: 'C’est la <b>même règle qu’au singulier</b> : si le singulier est <b>lo</b> ou <b>l’</b>, le pluriel est <b>gli</b> ; si le singulier est <b>il</b>, le pluriel est <b>i</b>.<br><i>lo zaino → gli zaini</i> · <i>l’orologio → gli orologi</i> · <i>il tavolo → i tavoli</i>.' },
    { t: 'tip', text: 'Moyen mnémotechnique pour « lo » : <b>S impur</b> (s+consonne), <b>Z</b>, <b>PS</b>, <b>GN</b>, <b>X</b>, <b>Y</b>. → <i>lo sport, lo zucchero, lo psicologo, lo gnocco, lo xilofono, lo yogurt</i>.' },
    { t: 'ex', items: [
      { it: 'Gli studenti aspettano lo zio di Marco.', fr: 'Les étudiants attendent l’oncle de Marco.' },
      { it: 'Metti il libro sul tavolo, per favore.', fr: 'Mets le livre sur la table, s’il te plaît.' },
      { it: 'Le amiche di Anna arrivano oggi.', fr: 'Les amies d’Anna arrivent aujourd’hui.' }
    ] }
  ]
},
{
  id: 'articoli-ind', ue: 'UE1', icon: '1️⃣', title: 'Les articles indéfinis',
  subtitle: 'un, uno, una, un’',
  tags: ['article'],
  blocks: [
    { t: 'table', head: ['Forme', 'Genre', 'Devant…', 'Exemple'],
      rows: [
        ['un', 'masculin', 'consonne ou voyelle', 'un libro, un amico'],
        ['uno', 'masculin', 's+consonne, z, ps, gn, x, y', 'uno studente, uno zaino'],
        ['una', 'féminin', 'consonne', 'una casa'],
        ['un’', 'féminin', 'voyelle', 'un’amica']
      ] },
    { t: 'warn', text: 'Piège classique : <b>un amico</b> (masculin, <u>sans</u> apostrophe) mais <b>un’amica</b> (féminin, <u>avec</u> apostrophe). L’apostrophe est la marque du féminin !' },
    { t: 'rule', title: 'Pluriel de l’article indéfini', text: 'Il n’existe pas vraiment : on utilise l’article partitif <b>dei / degli / delle</b> ou <i>alcuni / alcune / qualche</i>.<br><i>un libro → dei libri</i> · <i>uno studente → degli studenti</i> · <i>una casa → delle case</i>.' },
    { t: 'ex', items: [
      { it: 'Vorrei un caffè e un’acqua minerale.', fr: 'Je voudrais un café et une eau minérale.' },
      { it: 'C’è uno sconto sui pantaloni.', fr: 'Il y a une réduction sur les pantalons.' }
    ] }
  ]
},
{
  id: 'plurale', ue: 'UE1', icon: '➕', title: 'Le pluriel des noms et des adjectifs',
  subtitle: 'Former le pluriel correctement',
  tags: ['nom', 'adjectif'],
  blocks: [
    { t: 'table', head: ['Singulier', 'Pluriel', 'Exemple'],
      rows: [
        ['-o (m.)', '-i', 'il libro → i libri'],
        ['-a (f.)', '-e', 'la casa → le case'],
        ['-a (m.)', '-i', 'il problema → i problemi'],
        ['-e (m. ou f.)', '-i', 'il fiore → i fiori · la chiave → le chiavi'],
        ['-co / -go (accent sur l’avant-dernière)', '-chi / -ghi', 'il gioco → i giochi · il lago → i laghi'],
        ['-ca / -ga', '-che / -ghe', 'l’amica → le amiche'],
        ['-cia / -gia (voyelle avant)', '-cie / -gie', 'la camicia → le camicie'],
        ['-cia / -gia (consonne avant)', '-ce / -ge', 'l’arancia → le arance'],
        ['-io (i non accentué)', '-i', 'il figlio → i figli']
      ] },
    { t: 'rule', title: 'Invariables', text: 'Restent identiques au pluriel : les mots accentués (<i>la città → le città</i>), les mots étrangers (<i>il film → i film, il bar → i bar</i>), les abrégés (<i>la foto → le foto</i>), les monosyllabes (<i>il re → i re</i>).' },
    { t: 'rule', title: 'Pluriels irréguliers utiles', text: '<i>l’uomo → gli uomini</i> · <i>l’uovo → le uova</i> · <i>il braccio → le braccia</i> · <i>il dito → le dita</i> · <i>il ginocchio → le ginocchia</i> · <i>la mano → le mani</i> · <i>il dio → gli dei</i>.' },
    { t: 'tip', text: 'Exceptions à connaître pour -co : <i>l’amico → gli amici</i>, <i>il medico → i medici</i>, <i>il greco → i greci</i> (accent sur l’avant-avant-dernière syllabe → -ci).' }
  ]
},
{
  id: 'quanto', ue: 'UE1', icon: '📏', title: 'Quanto / quanta / quanti / quante',
  subtitle: 'Demander une quantité',
  tags: ['interrogatif', 'quantité'],
  blocks: [
    { t: 'p', text: '<b>Quanto</b> s’accorde en genre et en nombre avec le nom qui suit, sauf lorsqu’il est adverbe (il est alors invariable).' },
    { t: 'table', head: ['Forme', 'Emploi', 'Exemple'],
      rows: [
        ['quanto', 'm. sing. / indénombrable', 'Quanto pane vuoi?'],
        ['quanta', 'f. sing. / indénombrable', 'Quanta acqua bevi al giorno?'],
        ['quanti', 'm. pluriel', 'Quanti anni hai?'],
        ['quante', 'f. pluriel', 'Quante volte alla settimana?'],
        ['quanto (adverbe)', 'invariable', 'Quanto costa? · Quanto ti piace?']
      ] },
    { t: 'warn', text: '<i>Quanto costa?</i> (un seul objet) mais <i>Quanto costano?</i> (plusieurs objets). Le verbe s’accorde, pas <i>quanto</i>.' },
    { t: 'ex', items: [
      { it: 'Quanti fratelli hai?', fr: 'Combien de frères as-tu ?' },
      { it: 'Quanta pasta compriamo?', fr: 'Combien de pâtes achetons-nous ?' },
      { it: 'Quanto tempo ci vuole?', fr: 'Combien de temps faut-il ?' }
    ] }
  ]
},
{
  id: 'lora', ue: 'UE1', icon: '🕒', title: 'Dire l’ora',
  subtitle: 'Donner et demander l’heure',
  tags: ['nombres'],
  blocks: [
    { t: 'rule', title: 'La question', text: '<i>Che ora è?</i> ou <i>Che ore sono?</i> — les deux sont corrects.' },
    { t: 'rule', title: 'La réponse', text: 'On utilise <b>le ore</b> (sous-entendu), donc l’article féminin pluriel <b>le</b> + le verbe au pluriel :<br><i>Sono <b>le</b> tre. Sono <b>le</b> otto e mezza.</i><br>Exceptions au singulier : <i>È l’una. È mezzogiorno. È mezzanotte.</i>' },
    { t: 'table', head: ['Heure', 'Italien'],
      rows: [
        ['13h00', 'È l’una.'],
        ['15h15', 'Sono le tre e un quarto. / e quindici.'],
        ['15h30', 'Sono le tre e mezza. / e trenta.'],
        ['15h45', 'Sono le quattro meno un quarto. / le tre e quarantacinque.'],
        ['12h00', 'È mezzogiorno.'],
        ['00h00', 'È mezzanotte.'],
        ['20h00 pile', 'Sono le otto in punto.']
      ] },
    { t: 'rule', title: 'À quelle heure ?', text: '<i>A che ora…?</i> → <b>alle</b> + heure : <i>alle tre, alle otto e mezza</i>. Exceptions : <i>all’una, a mezzogiorno, a mezzanotte</i>.' },
    { t: 'tip', text: 'Pour préciser le moment : <i>le sette <b>di mattina</b></i>, <i>le tre <b>di pomeriggio</b></i>, <i>le nove <b>di sera</b></i>, <i>le due <b>di notte</b></i>.' }
  ]
},
{
  id: 'quale', ue: 'UE1', icon: '❔', title: 'Qual / quale / quali',
  subtitle: 'Choisir dans un ensemble',
  tags: ['interrogatif'],
  blocks: [
    { t: 'table', head: ['Forme', 'Emploi', 'Exemple'],
      rows: [
        ['quale', 'singulier (m. et f.)', 'Quale libro preferisci?'],
        ['quali', 'pluriel (m. et f.)', 'Quali sono i tuoi hobby?'],
        ['qual', 'devant è (verbe essere)', 'Qual è il tuo numero?']
      ] },
    { t: 'warn', text: 'On écrit <b>qual è</b> — <u>jamais</u> « qual’è ». Ce n’est pas une élision mais une troncation : pas d’apostrophe !' },
    { t: 'rule', title: 'Che ou quale ?', text: '<b>Che</b> est plus courant à l’oral et plus général : <i>Che film guardiamo?</i><br><b>Quale</b> implique un choix dans un ensemble connu : <i>Quale di questi due film?</i>' },
    { t: 'ex', items: [
      { it: 'Qual è la tua città preferita?', fr: 'Quelle est ta ville préférée ?' },
      { it: 'Quali lingue parli?', fr: 'Quelles langues parles-tu ?' }
    ] }
  ]
},
{
  id: 'pron-indiretti', ue: 'UE1', icon: '➡️', title: 'Les pronoms personnels indirects',
  subtitle: 'mi, ti, gli, le, ci, vi, gli — et a lui / a lei',
  tags: ['pronom'],
  blocks: [
    { t: 'p', text: 'Le pronom indirect remplace un complément introduit par <b>a</b> : <i>a Marco → gli</i>, <i>a Maria → le</i>.' },
    { t: 'table', head: ['Forme atone', 'Forme tonique', 'Traduction'],
      rows: [
        ['mi', 'a me', 'à moi'],
        ['ti', 'a te', 'à toi'],
        ['gli', 'a lui', 'à lui'],
        ['le', 'a lei', 'à elle'],
        ['Le', 'a Lei', 'à vous (politesse)'],
        ['ci', 'a noi', 'à nous'],
        ['vi', 'a voi', 'à vous'],
        ['gli (loro)', 'a loro', 'à eux / à elles']
      ] },
    { t: 'rule', title: 'Différence gli / le vs a lui / a lei', text: 'Les formes <b>atones</b> (gli, le) se placent <b>avant le verbe</b> et sont neutres :<br><i>Gli telefono domani.</i><br>Les formes <b>toniques</b> (a lui, a lei) se placent <b>après le verbe</b> et servent à <b>insister ou opposer</b> :<br><i>Telefono <b>a lui</b>, non a lei!</i>' },
    { t: 'rule', title: 'Position', text: 'Avant le verbe conjugué : <i>Mi dai il libro?</i><br>Soudé à l’infinitif : <i>Voglio parlar<b>gli</b>.</i> = <i><b>Gli</b> voglio parlare.</i><br>Soudé à l’impératif (tu, noi, voi) : <i>Dammi il libro!</i>' },
    { t: 'ex', items: [
      { it: 'Le ho scritto una mail.', fr: 'Je lui ai écrit un mail (à elle).' },
      { it: 'Gli offro un caffè.', fr: 'Je lui offre un café (à lui).' },
      { it: 'A me piace, a lui no.', fr: 'Moi j’aime bien, lui non.' }
    ] }
  ]
},
{
  id: 'piacere', ue: 'UE1', icon: '❤️', title: 'Il verbo PIACERE',
  subtitle: 'mi piace / mi piacciono',
  tags: ['verbe', 'construction'],
  blocks: [
    { t: 'p', text: 'En italien, on ne dit pas « j’aime X » mais littéralement « <b>X me plaît</b> ». Ce qui est aimé devient le <b>sujet</b> du verbe : c’est lui qui commande l’accord.' },
    { t: 'table', head: ['Français', 'Italien', 'Analyse'],
      rows: [
        ['J’aime le café.', 'Mi piace il caffè.', 'sujet singulier → piace'],
        ['J’aime les gâteaux.', 'Mi piacciono i dolci.', 'sujet pluriel → piacciono'],
        ['J’aime voyager.', 'Mi piace viaggiare.', 'infinitif → toujours piace'],
        ['Il aime la mer.', 'Gli piace il mare.', 'gli = à lui'],
        ['Elle aime les films.', 'Le piacciono i film.', 'le = à elle']
      ] },
    { t: 'rule', title: 'Au passé', text: 'Auxiliaire <b>essere</b>, avec accord du participe : <i>Mi <b>è piaciuto</b> il film.</i> · <i>Mi <b>sono piaciute</b> le foto.</i>' },
    { t: 'rule', title: 'Réagir', text: '— <i>Mi piace il jazz.</i> → <b>Anche a me.</b> / <b>A me, invece, no.</b><br>— <i>Non mi piace il jazz.</i> → <b>Neanche a me.</b> / <b>A me, invece, sì.</b>' },
    { t: 'warn', text: 'Ne pas confondre : <i>mi piace</i> (goût) et <i>voglio</i> (volonté). Et <i>ti piaccio?</i> = « est-ce que je te plais ? » — le sujet est « io » !' },
    { t: 'ex', items: [
      { it: 'Ti piacciono gli spaghetti?', fr: 'Tu aimes les spaghettis ?' },
      { it: 'Non mi è piaciuto per niente.', fr: 'Ça ne m’a pas plu du tout.' },
      { it: 'A Marco piace andare al cinema.', fr: 'Marco aime aller au cinéma.' }
    ] }
  ]
},

/* ============================ UE2 ====================================== */
{
  id: 'prep-semplici', ue: 'UE2', icon: '🔤', title: 'Le preposizioni semplici',
  subtitle: 'a, di, da, in, con, su, per, tra/fra',
  tags: ['préposition'],
  blocks: [
    { t: 'table', head: ['Préposition', 'Sens principaux', 'Exemples'],
      rows: [
        ['a', 'lieu (ville), à, destination, heure', 'a Roma · a casa · alle otto · a Marco'],
        ['di', 'possession, matière, origine', 'il libro di Anna · di legno · sono di Milano'],
        ['da', 'provenance, chez, depuis, agent', 'vengo da Parigi · dal medico · da due anni'],
        ['in', 'lieu (pays, régions), moyen, dans', 'in Italia · in treno · in farmacia'],
        ['con', 'accompagnement, moyen', 'con Marco · con il treno'],
        ['su', 'sur, à propos de', 'sul tavolo · un libro sull’Italia'],
        ['per', 'but, destination, durée', 'per te · parto per Roma · per due ore'],
        ['tra / fra', 'entre, dans (futur)', 'tra noi · fra due ore']
      ] },
    { t: 'rule', title: 'A ou IN pour les lieux ?', text: '<b>A</b> + villes : <i>a Roma, a Parigi</i>.<br><b>IN</b> + pays, régions, îles grandes : <i>in Italia, in Toscana, in Sicilia</i>.<br><b>IN</b> + lieux génériques en -ia / -eria : <i>in farmacia, in pizzeria, in banca, in centro</i>.<br><b>DA</b> + personne : <i>dal medico, da Marco, dal fruttivendolo</i>.' },
    { t: 'rule', title: 'Moyens de transport', text: '<b>IN</b> : in treno, in aereo, in macchina, in bici.<br><b>A</b> : a piedi, a cavallo.' },
    { t: 'warn', text: '<i>tra</i> et <i>fra</i> sont <b>identiques</b> : on choisit celui qui sonne le mieux (on évite <i>tra treni</i> → <i>fra treni</i>).' }
  ]
},
{
  id: 'prep-articolate', ue: 'UE2', icon: '🔗', title: 'Le preposizioni articolate',
  subtitle: 'Préposition + article défini',
  tags: ['préposition', 'article'],
  blocks: [
    { t: 'p', text: 'Quand <b>a, di, da, in, su</b> rencontrent un article défini, ils fusionnent obligatoirement.' },
    { t: 'table', caption: 'Tableau complet', head: ['', 'il', 'lo', 'l’', 'i', 'gli', 'la', 'le'],
      rows: [
        ['a', 'al', 'allo', 'all’', 'ai', 'agli', 'alla', 'alle'],
        ['di', 'del', 'dello', 'dell’', 'dei', 'degli', 'della', 'delle'],
        ['da', 'dal', 'dallo', 'dall’', 'dai', 'dagli', 'dalla', 'dalle'],
        ['in', 'nel', 'nello', 'nell’', 'nei', 'negli', 'nella', 'nelle'],
        ['su', 'sul', 'sullo', 'sull’', 'sui', 'sugli', 'sulla', 'sulle']
      ] },
    { t: 'warn', text: 'Attention aux formes avec <b>IN</b> : elles changent de radical → <b>nel, nello, nella, nei, negli, nelle</b> (et non « inl… »).' },
    { t: 'rule', title: 'con, per, tra/fra', text: '<b>Ne fusionnent pas</b> en italien standard : <i>con il treno, per la strada, tra i libri</i>. (Les formes <i>col, coi</i> existent mais sont familières.)' },
    { t: 'rule', title: 'Le partitif', text: '<b>di + article</b> traduit « du, de la, des » : <i>Compro <b>del</b> pane, <b>della</b> frutta, <b>degli</b> spaghetti, <b>delle</b> mele.</i>' },
    { t: 'ex', items: [
      { it: 'Vado alla stazione e poi dal medico.', fr: 'Je vais à la gare puis chez le médecin.' },
      { it: 'Il libro è sul tavolo, nella borsa nera.', fr: 'Le livre est sur la table, dans le sac noir.' },
      { it: 'Parliamo degli esami di giugno.', fr: 'Nous parlons des examens de juin.' }
    ] }
  ]
},
{
  id: 'modali', ue: 'UE2', icon: '🔑', title: 'I verbi modali',
  subtitle: 'potere, dovere, volere',
  tags: ['verbe'],
  blocks: [
    { t: 'table', head: ['', 'potere (pouvoir)', 'dovere (devoir)', 'volere (vouloir)'],
      rows: [
        ['io', 'posso', 'devo', 'voglio'],
        ['tu', 'puoi', 'devi', 'vuoi'],
        ['lui/lei', 'può', 'deve', 'vuole'],
        ['noi', 'possiamo', 'dobbiamo', 'vogliamo'],
        ['voi', 'potete', 'dovete', 'volete'],
        ['loro', 'possono', 'devono', 'vogliono']
      ] },
    { t: 'rule', title: 'Construction', text: 'Modal + <b>infinitif</b> directement, sans préposition : <i>Devo studiare. Posso entrare? Voglio partire.</i>' },
    { t: 'rule', title: 'Passé composé', text: 'Le modal prend l’auxiliaire du verbe qui suit :<br><i>Ho dovuto <b>lavorare</b>.</i> (lavorare → avere)<br><i>Sono dovuto <b>andare</b> a casa.</i> (andare → essere)<br>À l’oral, <i>ho dovuto andare</i> est très fréquent et accepté.' },
    { t: 'rule', title: 'Position des pronoms', text: 'Deux possibilités, équivalentes :<br><i><b>Lo</b> posso fare.</i> = <i>Posso far<b>lo</b>.</i><br><i><b>Ti</b> devo parlare.</i> = <i>Devo parlar<b>ti</b>.</i>' },
    { t: 'tip', text: 'Poli : <i>Vorrei…</i> (conditionnel de volere) est bien plus poli que <i>Voglio…</i> pour commander.' }
  ]
},
{
  id: 'passato-prossimo', ue: 'UE2', icon: '⏮', title: 'Il passato prossimo',
  subtitle: 'Le passé composé italien',
  tags: ['verbe', 'passé'],
  blocks: [
    { t: 'p', text: 'Formation : <b>auxiliaire (avere ou essere) au présent + participe passé</b>. C’est le temps du récit d’un événement <b>achevé</b>.' },
    { t: 'table', caption: 'Participes réguliers', head: ['Infinitif', 'Participe', 'Exemple'],
      rows: [
        ['-ARE', '-ATO', 'parlare → parlato'],
        ['-ERE', '-UTO', 'credere → creduto'],
        ['-IRE', '-ITO', 'dormire → dormito']
      ] },
    { t: 'rule', title: 'Quel auxiliaire ?', text: '<b>ESSERE</b> avec : les verbes de mouvement / changement d’état (<i>andare, venire, partire, arrivare, tornare, entrare, uscire, salire, scendere, restare, rimanere, nascere, morire, diventare</i>), les verbes réfléchis (<i>mi sono alzato</i>), <i>essere</i> et <i>stare</i>, et <i>piacere</i>.<br><b>AVERE</b> avec : les verbes transitifs (qui ont un COD) et la plupart des autres.' },
    { t: 'warn', text: 'Avec <b>ESSERE</b>, le participe <b>s’accorde avec le sujet</b> : <i>Maria è andat<b>a</b>. I ragazzi sono andat<b>i</b>. Le ragazze sono andat<b>e</b>.</i><br>Avec <b>AVERE</b>, le participe est <b>invariable</b>… sauf devant un pronom direct (lo, la, li, le).' },
    { t: 'table', caption: 'Verbes à double auxiliaire', head: ['Verbe', 'avere (transitif)', 'essere (intransitif)'],
      rows: [
        ['cominciare', 'Ho cominciato il libro.', 'Il film è cominciato.'],
        ['finire', 'Ho finito il lavoro.', 'Il film è finito.'],
        ['cambiare', 'Ho cambiato casa.', 'Il tempo è cambiato.'],
        ['correre', 'Ho corso una maratona.', 'Sono corso a casa.']
      ] },
    { t: 'ex', items: [
      { it: 'Ieri ho mangiato una pizza buonissima.', fr: 'Hier j’ai mangé une pizza excellente.' },
      { it: 'Siamo arrivati alle otto.', fr: 'Nous sommes arrivés à huit heures.' },
      { it: 'Che cosa è successo?', fr: 'Que s’est-il passé ?' }
    ] }
  ]
},
{
  id: 'participi-irregolari', ue: 'UE2', icon: '🧩', title: 'I participi passati irregolari',
  subtitle: 'La liste à connaître par cœur',
  tags: ['verbe', 'passé'],
  blocks: [
    { t: 'table', head: ['Infinitif', 'Participe', 'Infinitif', 'Participe'],
      rows: [
        ['essere', 'stato', 'fare', 'fatto'],
        ['dire', 'detto', 'bere', 'bevuto'],
        ['leggere', 'letto', 'scrivere', 'scritto'],
        ['prendere', 'preso', 'mettere', 'messo'],
        ['vedere', 'visto', 'vivere', 'vissuto'],
        ['aprire', 'aperto', 'chiudere', 'chiuso'],
        ['offrire', 'offerto', 'soffrire', 'sofferto'],
        ['chiedere', 'chiesto', 'rispondere', 'risposto'],
        ['scegliere', 'scelto', 'spegnere', 'spento'],
        ['perdere', 'perso', 'vincere', 'vinto'],
        ['nascere', 'nato', 'morire', 'morto'],
        ['venire', 'venuto', 'rimanere', 'rimasto'],
        ['conoscere', 'conosciuto', 'piacere', 'piaciuto'],
        ['decidere', 'deciso', 'spendere', 'speso'],
        ['succedere', 'successo', 'rompere', 'rotto'],
        ['accendere', 'acceso', 'scendere', 'sceso'],
        ['correre', 'corso', 'muovere', 'mosso']
      ] },
    { t: 'tip', text: 'Beaucoup de participes en <b>-so</b> viennent de verbes en <i>-dere</i> (prendere → preso, decidere → deciso, spendere → speso) et beaucoup en <b>-tto</b> de verbes en <i>-ggere / -rre</i> (leggere → letto, dire → detto).' }
  ]
},
{
  id: 'imperfetto', ue: 'UE2', icon: '🌫', title: 'L’imperfetto',
  subtitle: 'Décrire le passé, les habitudes',
  tags: ['verbe', 'passé'],
  blocks: [
    { t: 'p', text: 'On enlève <b>-re</b> à l’infinitif et on ajoute : <b>-vo, -vi, -va, -vamo, -vate, -vano</b>. C’est le temps le plus régulier de l’italien !' },
    { t: 'table', head: ['', 'parlare', 'credere', 'dormire'],
      rows: [
        ['io', 'parlavo', 'credevo', 'dormivo'],
        ['tu', 'parlavi', 'credevi', 'dormivi'],
        ['lui/lei', 'parlava', 'credeva', 'dormiva'],
        ['noi', 'parlavamo', 'credevamo', 'dormivamo'],
        ['voi', 'parlavate', 'credevate', 'dormivate'],
        ['loro', 'parlavano', 'credevano', 'dormivano']
      ] },
    { t: 'table', caption: 'Les rares irréguliers', head: ['Verbe', 'Formes'],
      rows: [
        ['essere', 'ero, eri, era, eravamo, eravate, erano'],
        ['fare', 'facevo, facevi, faceva, facevamo, facevate, facevano'],
        ['dire', 'dicevo, dicevi, diceva, dicevamo, dicevate, dicevano'],
        ['bere', 'bevevo, bevevi, beveva, bevevamo, bevevate, bevevano']
      ] },
    { t: 'rule', title: 'Imperfetto ou passato prossimo ?', text: '<b>Imperfetto</b> = description, habitude, décor, action en cours, âge, heure, météo, état.<br><b>Passato prossimo</b> = action ponctuelle, achevée, qui fait avancer le récit.<br><i>Mentre <b>guardavo</b> la TV (décor), <b>è suonato</b> il telefono (événement).</i>' },
    { t: 'ex', items: [
      { it: 'Da bambino giocavo sempre a calcio.', fr: 'Enfant, je jouais toujours au football.' },
      { it: 'Era tardi e pioveva.', fr: 'Il était tard et il pleuvait.' },
      { it: 'Quando abitavo a Roma, andavo spesso al cinema.', fr: 'Quand j’habitais à Rome, j’allais souvent au cinéma.' }
    ] }
  ]
},
{
  id: 'congiuntivo', ue: 'UE2', icon: '🎭', title: 'Il congiuntivo presente',
  subtitle: 'Le subjonctif : doute, opinion, souhait',
  tags: ['verbe', 'mode'],
  blocks: [
    { t: 'table', head: ['', '-ARE', '-ERE', '-IRE', '-IRE (isc)'],
      rows: [
        ['che io', 'parli', 'creda', 'dorma', 'finisca'],
        ['che tu', 'parli', 'creda', 'dorma', 'finisca'],
        ['che lui/lei', 'parli', 'creda', 'dorma', 'finisca'],
        ['che noi', 'parliamo', 'crediamo', 'dormiamo', 'finiamo'],
        ['che voi', 'parliate', 'crediate', 'dormiate', 'finiate'],
        ['che loro', 'parlino', 'credano', 'dormano', 'finiscano']
      ] },
    { t: 'tip', text: 'Les 3 personnes du singulier sont <b>identiques</b> : on ajoute souvent le pronom sujet pour éviter l’ambiguïté (<i>che tu parli</i>).' },
    { t: 'table', caption: 'Irréguliers essentiels', head: ['Verbe', 'che io…', 'che noi…', 'che loro…'],
      rows: [
        ['essere', 'sia', 'siamo', 'siano'],
        ['avere', 'abbia', 'abbiamo', 'abbiano'],
        ['fare', 'faccia', 'facciamo', 'facciano'],
        ['andare', 'vada', 'andiamo', 'vadano'],
        ['venire', 'venga', 'veniamo', 'vengano'],
        ['potere', 'possa', 'possiamo', 'possano'],
        ['dovere', 'debba', 'dobbiamo', 'debbano'],
        ['volere', 'voglia', 'vogliamo', 'vogliano'],
        ['sapere', 'sappia', 'sappiamo', 'sappiano'],
        ['dire', 'dica', 'diciamo', 'dicano'],
        ['stare', 'stia', 'stiamo', 'stiano'],
        ['dare', 'dia', 'diamo', 'diano']
      ] },
    { t: 'rule', title: 'Quand l’utiliser ?', text: 'Après un verbe d’<b>opinion, doute, souhait, émotion</b> + <b>che</b> :<br><i>Penso che… Credo che… Spero che… Voglio che… Mi sembra che… Ho paura che…</i><br>Après certaines conjonctions : <i>benché, sebbene, affinché, prima che, a meno che, purché</i>.<br>Après <i>è possibile che, è importante che, bisogna che</i>.' },
    { t: 'warn', text: 'Si le sujet est <b>le même</b> dans les deux propositions, on utilise <b>di + infinitif</b> :<br><i>Penso <b>di partire</b> domani.</i> (moi je pars) vs <i>Penso <b>che tu parta</b> domani.</i> (toi tu pars)' },
    { t: 'ex', items: [
      { it: 'Credo che Marco sia italiano.', fr: 'Je crois que Marco est italien.' },
      { it: 'Spero che tu stia bene.', fr: 'J’espère que tu vas bien.' },
      { it: 'Bisogna che facciamo presto.', fr: 'Il faut que nous fassions vite.' }
    ] }
  ]
},
{
  id: 'ci', ue: 'UE2', icon: '📍', title: 'La particella CI',
  subtitle: 'Le « y » italien… et bien plus',
  tags: ['pronom'],
  blocks: [
    { t: 'rule', title: '1. CI de lieu', text: 'Remplace un lieu déjà mentionné (= « y ») :<br>— <i>Vai a Roma?</i> — <i>Sì, <b>ci</b> vado domani.</i><br>— <i>Sei mai stato in Sicilia?</i> — <i>No, non <b>ci</b> sono mai stato.</i>' },
    { t: 'rule', title: '2. C’è / ci sono', text: '<i><b>C’è</b> un problema.</i> (il y a un problème) · <i><b>Ci sono</b> molte persone.</i> (il y a beaucoup de gens)' },
    { t: 'rule', title: '3. CI avec certains verbes', text: '<b>pensarci</b> (y penser) : <i>Non ci penso mai.</i><br><b>crederci</b> (y croire) : <i>Non ci credo!</i><br><b>riuscirci</b> (y arriver) : <i>Non ci riesco.</i><br><b>volerci / metterci</b> (durée) · <b>averci</b> (avoir sur soi).' },
    { t: 'warn', title: 'Le cas conoscere / sapere', text: 'On <b>n’utilise pas CI</b> devant <i>conoscere</i> et <i>sapere</i> : on emploie le pronom direct <b>lo / la / li / le</b>.<br>— <i>Conosci Milano?</i> — <i>Sì, <b>la</b> conosco.</i> (et non « ci conosco »)<br>— <i>Sai la risposta?</i> — <i>Sì, <b>la</b> so.</i> / <i>Non <b>lo</b> so.</i>' },
    { t: 'ex', items: [
      { it: 'In palestra ci vado due volte alla settimana.', fr: 'À la salle, j’y vais deux fois par semaine.' },
      { it: 'Ci penso io!', fr: 'Je m’en occupe !' },
      { it: 'Quanto ci vuole per arrivare?', fr: 'Combien de temps faut-il pour arriver ?' }
    ] }
  ]
},
{
  id: 'dimostrativi', ue: 'UE2', icon: '👉', title: 'Aggettivi e pronomi dimostrativi',
  subtitle: 'questo / quello',
  tags: ['adjectif', 'pronom'],
  blocks: [
    { t: 'table', caption: 'QUESTO — ce…-ci (près de moi)', head: ['', 'Singulier', 'Pluriel'],
      rows: [['masculin', 'questo (quest’)', 'questi'], ['féminin', 'questa (quest’)', 'queste']] },
    { t: 'table', caption: 'QUELLO — ce…-là (loin) : suit la règle de l’article défini', head: ['Article', 'Adjectif', 'Exemple'],
      rows: [
        ['il', 'quel', 'quel libro'],
        ['lo', 'quello', 'quello studente'],
        ['l’', 'quell’', 'quell’amico'],
        ['i', 'quei', 'quei libri'],
        ['gli', 'quegli', 'quegli studenti'],
        ['la', 'quella', 'quella casa'],
        ['le', 'quelle', 'quelle case']
      ] },
    { t: 'rule', title: 'Pronoms', text: 'Employés seuls, ils prennent 4 formes seulement : <b>quello, quella, quelli, quelle</b>.<br><i>Prendo <b>questo</b>, non <b>quello</b>.</i> · <i>Quali scarpe? <b>Quelle</b> nere.</i>' },
    { t: 'tip', text: '<i>Quello</i> fonctionne exactement comme <i>bello</i> : même série de terminaisons.' }
  ]
},
{
  id: 'possessivi', ue: 'UE2', icon: '🔐', title: 'Aggettivi e pronomi possessivi',
  subtitle: 'il mio, il tuo, il suo…',
  tags: ['adjectif', 'pronom'],
  blocks: [
    { t: 'table', head: ['', 'm. sing.', 'f. sing.', 'm. pl.', 'f. pl.'],
      rows: [
        ['mon', 'il mio', 'la mia', 'i miei', 'le mie'],
        ['ton', 'il tuo', 'la tua', 'i tuoi', 'le tue'],
        ['son (à lui/elle)', 'il suo', 'la sua', 'i suoi', 'le sue'],
        ['votre (Lei)', 'il Suo', 'la Sua', 'i Suoi', 'le Sue'],
        ['notre', 'il nostro', 'la nostra', 'i nostri', 'le nostre'],
        ['votre', 'il vostro', 'la vostra', 'i vostri', 'le vostre'],
        ['leur', 'il loro', 'la loro', 'i loro', 'le loro']
      ] },
    { t: 'warn', text: 'Le possessif s’accorde avec l’<b>objet possédé</b>, pas avec le possesseur : <i>Marco e <b>la sua</b> macchina</i> (la voiture est féminine). <b>loro</b> est invariable.' },
    { t: 'rule', title: 'L’article est obligatoire…', text: '…sauf devant un nom de <b>famille au singulier</b> et non modifié :<br><i><b>mio</b> padre, <b>tua</b> sorella, <b>suo</b> fratello</i> (sans article)<br>MAIS : <i><b>i</b> miei genitori</i> (pluriel), <i><b>il</b> mio fratello maggiore</i> (modifié), <i><b>la</b> mia mamma</i> (affectif), <i><b>il</b> loro padre</i> (loro garde toujours l’article).' },
    { t: 'rule', title: 'Pronoms possessifs', text: 'Même forme, avec l’article : <i>La mia macchina è rossa, <b>la tua</b> è blu.</i><br>Après <i>essere</i>, l’article peut disparaître : <i>Questo libro è <b>mio</b>.</i>' },
    { t: 'ex', items: [
      { it: 'Mia sorella abita con i suoi amici.', fr: 'Ma sœur habite avec ses amis.' },
      { it: 'Di chi è questa borsa? — È la mia.', fr: 'À qui est ce sac ? — C’est le mien.' }
    ] }
  ]
},
{
  id: 'comparativo', ue: 'UE2', icon: '⚖️', title: 'Il comparativo',
  subtitle: 'Plus, moins, aussi… que',
  tags: ['adjectif'],
  blocks: [
    { t: 'table', head: ['Type', 'Formule', 'Exemple'],
      rows: [
        ['Supériorité', 'più … di / che', 'Marco è più alto di Luca.'],
        ['Infériorité', 'meno … di / che', 'Il treno è meno caro dell’aereo.'],
        ['Égalité', '(così) … come / (tanto) … quanto', 'Anna è (così) simpatica come Maria.']
      ] },
    { t: 'rule', title: 'DI ou CHE ?', text: '<b>DI</b> quand on compare <b>deux éléments</b> pour une même qualité :<br><i>Roma è più grande <b>di</b> Firenze.</i> (di + article → <i>del, della…</i>)<br><b>CHE</b> quand on compare <b>deux qualités, deux verbes, deux noms précédés d’une préposition, ou deux quantités</b> :<br><i>È più simpatico <b>che</b> intelligente.</i> · <i>Mi piace più leggere <b>che</b> scrivere.</i> · <i>Ci sono più turisti a Roma <b>che</b> a Bologna.</i>' },
    { t: 'table', caption: 'Comparatifs irréguliers', head: ['Adjectif', 'Comparatif', 'Superlatif'],
      rows: [
        ['buono', 'migliore (più buono)', 'il migliore / ottimo'],
        ['cattivo', 'peggiore (più cattivo)', 'il peggiore / pessimo'],
        ['grande', 'maggiore (più grande)', 'il maggiore / massimo'],
        ['piccolo', 'minore (più piccolo)', 'il minore / minimo'],
        ['bene (adv.)', 'meglio', 'benissimo'],
        ['male (adv.)', 'peggio', 'malissimo']
      ] },
    { t: 'rule', title: 'Le superlatif absolu', text: 'Adjectif – voyelle finale + <b>-issimo</b> : <i>bello → bellissimo, buono → buonissimo, facile → facilissimo</i>.' },
    { t: 'ex', items: [
      { it: 'L’aereo è più veloce del treno.', fr: 'L’avion est plus rapide que le train.' },
      { it: 'Viaggiare in treno è più comodo che guidare.', fr: 'Voyager en train est plus confortable que conduire.' }
    ] }
  ]
},
{
  id: 'mentre-durante', ue: 'UE2', icon: '⏳', title: 'Mentre / durante',
  subtitle: 'Deux façons de dire « pendant »',
  tags: ['connecteur'],
  blocks: [
    { t: 'rule', title: 'MENTRE + verbe conjugué', text: 'C’est une <b>conjonction</b> : elle introduit une proposition avec un verbe.<br><i><b>Mentre</b> guardavo la TV, è arrivato Marco.</i>' },
    { t: 'rule', title: 'DURANTE + nom', text: 'C’est une <b>préposition</b> : elle est suivie d’un nom.<br><i><b>Durante</b> il viaggio ho letto un libro.</i>' },
    { t: 'table', head: ['❌ Faux', '✅ Correct'],
      rows: [
        ['Durante studiavo…', 'Mentre studiavo…'],
        ['Mentre la lezione…', 'Durante la lezione…']
      ] },
    { t: 'tip', text: 'Avec <i>mentre</i>, le verbe est souvent à l’<b>imperfetto</b> : il décrit le décor pendant lequel survient l’événement.' }
  ]
},
{
  id: 'connettori', ue: 'UE2', icon: '🧵', title: 'I connettori temporali',
  subtitle: 'Organiser un récit',
  tags: ['connecteur'],
  blocks: [
    { t: 'table', head: ['Connecteur', 'Sens', 'Exemple'],
      rows: [
        ['prima', 'd’abord / avant', 'Prima faccio la spesa.'],
        ['prima di + inf.', 'avant de', 'Prima di uscire, chiudi la porta.'],
        ['poi', 'ensuite', 'Poi vado in palestra.'],
        ['dopo', 'après', 'Dopo torno a casa.'],
        ['dopo + nom', 'après (qqch)', 'Dopo cena guardiamo un film.'],
        ['a un certo punto', 'à un moment donné', 'A un certo punto è arrivata la polizia.'],
        ['improvvisamente / all’improvviso', 'soudain', 'All’improvviso ha cominciato a piovere.'],
        ['subito dopo', 'juste après', 'Subito dopo siamo usciti.'],
        ['intanto / nel frattempo', 'entre-temps', 'Nel frattempo preparavo la cena.'],
        ['alla fine / infine', 'finalement', 'Alla fine siamo tornati a casa.'],
        ['appena', 'dès que', 'Appena arrivo, ti chiamo.']
      ] },
    { t: 'tip', text: 'Pour raconter une histoire : <b>Prima… poi… a un certo punto… alla fine.</b> C’est la structure qu’on attend de vous à l’oral comme à l’écrit.' }
  ]
},
{
  id: 'colori-gram', ue: 'UE2', icon: '🎨', title: 'Gli aggettivi di colore',
  subtitle: 'Accords et invariables',
  tags: ['adjectif'],
  blocks: [
    { t: 'table', head: ['Type', 'Formes', 'Exemple'],
      rows: [
        ['4 formes (-o)', 'rosso / rossa / rossi / rosse', 'una macchina rossa'],
        ['2 formes (-e)', 'verde / verdi', 'i pantaloni verdi'],
        ['invariables', 'blu, rosa, viola, beige, lilla', 'le scarpe blu'],
        ['composés', 'verde chiaro, blu scuro', 'le camicie verde chiaro']
      ] },
    { t: 'warn', text: 'Les couleurs <b>composées</b> (avec <i>chiaro, scuro</i>) sont <b>invariables</b> : <i>due gonne <b>verde scuro</b></i>.' },
    { t: 'rule', title: 'Place de l’adjectif', text: 'Les adjectifs de couleur se placent <b>après</b> le nom : <i>una borsa nera</i> (et non « una nera borsa »).' }
  ]
},
{
  id: 'infinito-pronome', ue: 'UE2', icon: '🔧', title: 'Infinitif + pronom complément',
  subtitle: 'Le pronom soudé à l’infinitif',
  tags: ['pronom'],
  blocks: [
    { t: 'p', text: 'Avec un <b>infinitif</b>, le pronom se colle à la fin du verbe, qui perd son <b>-e</b> final.' },
    { t: 'table', head: ['Deux positions équivalentes', 'Traduction'],
      rows: [
        ['Voglio vederti. = Ti voglio vedere.', 'Je veux te voir.'],
        ['Devo parlargli. = Gli devo parlare.', 'Je dois lui parler.'],
        ['Posso farlo. = Lo posso fare.', 'Je peux le faire.'],
        ['Preferisco non dirglielo.', 'Je préfère ne pas le lui dire.']
      ] },
    { t: 'warn', text: 'L’infinitif perd le <b>-e</b> : <i>vedere + ti → veder<b>ti</b></i> (et non « vedereti »).' },
    { t: 'rule', title: 'Sans verbe modal', text: 'Le pronom se soude toujours : <i>Prima di farlo… · Dopo averlo visto… · È facile capirlo.</i>' }
  ]
},

/* ============================ UE3 ====================================== */
{
  id: 'imperativo', ue: 'UE3', icon: '❗', title: 'L’imperativo',
  subtitle: 'Donner un ordre, un conseil, une consigne',
  tags: ['verbe', 'mode'],
  blocks: [
    { t: 'table', caption: 'Formes directes', head: ['', '-ARE (parlare)', '-ERE (prendere)', '-IRE (dormire)', '-ISC (finire)'],
      rows: [
        ['tu', 'parla!', 'prendi!', 'dormi!', 'finisci!'],
        ['noi', 'parliamo!', 'prendiamo!', 'dormiamo!', 'finiamo!'],
        ['voi', 'parlate!', 'prendete!', 'dormite!', 'finite!'],
        ['Lei (politesse)', 'parli!', 'prenda!', 'dorma!', 'finisca!']
      ] },
    { t: 'warn', text: 'Le piège numéro 1 : à la 2<sup>e</sup> personne, les verbes en <b>-ARE</b> font <b>-a</b> (<i>parla!</i>) alors que le présent fait <i>parli</i>. Les autres font <b>-i</b> (<i>prendi!</i>) comme le présent.' },
    { t: 'rule', title: 'La forme de politesse (Lei)', text: 'Elle est empruntée au <b>congiuntivo presente</b> : <i>Parli più lentamente, per favore. · Si accomodi. · Mi scusi.</i>' },
    { t: 'table', caption: 'Impératifs irréguliers (tu)', head: ['Verbe', 'tu', 'Lei'],
      rows: [
        ['essere', 'sii', 'sia'], ['avere', 'abbi', 'abbia'], ['sapere', 'sappi', 'sappia'],
        ['andare', 'va’ (vai)', 'vada'], ['dare', 'da’ (dai)', 'dia'], ['fare', 'fa’ (fai)', 'faccia'],
        ['stare', 'sta’ (stai)', 'stia'], ['dire', 'di’', 'dica'], ['venire', 'vieni', 'venga']
      ] },
    { t: 'rule', title: 'L’impératif négatif', text: '<b>tu</b> : <i>non</i> + <b>infinitif</b> → <i><b>Non parlare!</b> Non fumare!</i><br><b>noi / voi / Lei</b> : simplement <i>non</i> + forme normale → <i>Non parlate! Non parli!</i>' },
    { t: 'rule', title: 'Impératif + pronoms', text: 'Aux formes <b>tu, noi, voi</b>, le pronom se <b>soude</b> à la fin : <i>Dimmi! Guardala! Prendiamolo! Ascoltatemi!</i><br>À la forme <b>Lei</b>, le pronom reste <b>avant</b> : <i><b>Mi</b> dica! <b>La</b> guardi! <b>Si</b> accomodi!</i>' },
    { t: 'warn', title: 'Le redoublement', text: 'Avec les impératifs monosyllabiques <b>va’, da’, fa’, sta’, di’</b>, la consonne du pronom <b>double</b> :<br><i>da’ + mi → <b>dammi</b></i> · <i>di’ + mi → <b>dimmi</b></i> · <i>fa’ + lo → <b>fallo</b></i> · <i>va’ + ci → <b>vacci</b></i> · <i>sta’ + ci → <b>stacci</b></i>.<br>Exception : <b>gli</b> ne double jamais → <i>digli, dagli, fagli</i>.' },
    { t: 'ex', items: [
      { it: 'Scusi, mi può aiutare? — Certo, mi dica!', fr: 'Excusez-moi, pouvez-vous m’aider ? — Bien sûr, dites-moi !' },
      { it: 'Non ti preoccupare, andrà tutto bene.', fr: 'Ne t’inquiète pas, tout ira bien.' },
      { it: 'Prendi la medicina e riposati!', fr: 'Prends le médicament et repose-toi !' }
    ] }
  ]
},
{
  id: 'pron-diretti', ue: 'UE3', icon: '🎯', title: 'I pronomi diretti',
  subtitle: 'lo, la, li, le',
  tags: ['pronom'],
  blocks: [
    { t: 'p', text: 'Ils remplacent un <b>complément d’objet direct</b> (sans préposition), pour éviter la répétition.' },
    { t: 'table', head: ['Personne', 'Pronom', 'Exemple'],
      rows: [
        ['me', 'mi', 'Mi chiami stasera?'],
        ['te', 'ti', 'Ti vedo domani.'],
        ['le (m. sing.)', 'lo', 'Il libro? Lo leggo.'],
        ['la (f. sing.)', 'la', 'La pizza? La mangio.'],
        ['vous (politesse)', 'La', 'La ringrazio, signora.'],
        ['nous', 'ci', 'Ci aspetti?'],
        ['vous', 'vi', 'Vi invito a cena.'],
        ['les (m. pl.)', 'li', 'I libri? Li compro.'],
        ['les (f. pl.)', 'le', 'Le scarpe? Le provo.']
      ] },
    { t: 'rule', title: 'Position', text: '<b>Avant</b> le verbe conjugué : <i>Lo mangio.</i> · <i>Non lo mangio.</i><br><b>Soudé</b> à l’infinitif, au gérondif et à l’impératif (tu/noi/voi) : <i>Voglio mangiarlo. · Mangiandolo… · Mangialo!</i>' },
    { t: 'rule', title: 'Élision', text: '<b>lo</b> et <b>la</b> s’élident devant une voyelle ou un h : <i>L’ho visto. L’ho vista.</i> — <b>li</b> et <b>le</b> ne s’élident <u>jamais</u> : <i>Li ho visti. Le ho viste.</i>' },
    { t: 'warn', title: 'Accord du participe passé', text: 'Au passato prossimo avec <b>avere</b>, le participe <b>s’accorde obligatoirement</b> avec le pronom direct qui précède :<br><i>La pizza? <b>L’</b>ho mangiat<b>a</b>.</i><br><i>I libri? <b>Li</b> ho lett<b>i</b>.</i><br><i>Le mele? <b>Le</b> ho comprat<b>e</b>.</i>' },
    { t: 'rule', title: 'Pronoms directs + tutto', text: 'Le pronom reprend l’objet, <i>tutto</i> s’accorde aussi :<br><i><b>Li</b> ho mangiat<b>i tutti</b>.</i> (je les ai tous mangés)<br><i><b>L’</b>ho bevut<b>o tutto</b>.</i> (je l’ai bu en entier)<br><i><b>Le</b> ho lett<b>e tutte</b>.</i>' },
    { t: 'ex', items: [
      { it: 'Conosci Maria? — Sì, la conosco bene.', fr: 'Tu connais Maria ? — Oui, je la connais bien.' },
      { it: 'Hai visto i miei occhiali? — Sì, li ho visti in cucina.', fr: 'Tu as vu mes lunettes ? — Oui, je les ai vues à la cuisine.' }
    ] }
  ]
},
{
  id: 'ne', ue: 'UE3', icon: '🍰', title: 'La particella NE',
  subtitle: 'Exprimer une partie d’une quantité',
  tags: ['pronom'],
  blocks: [
    { t: 'p', text: '<b>NE</b> remplace un nom précédé d’une <b>quantité</b> ou d’une <b>partie</b> (= « en » en français).' },
    { t: 'table', head: ['Question', 'Réponse avec NE', 'Traduction'],
      rows: [
        ['Quanti caffè bevi?', 'Ne bevo due.', 'J’en bois deux.'],
        ['Compri le mele?', 'Sì, ne compro un chilo.', 'J’en achète un kilo.'],
        ['Hai usato i fogli?', 'Ne ho usati solo due.', 'Je n’en ai utilisé que deux.'],
        ['Vuoi del vino?', 'Ne prendo un po’.', 'J’en prends un peu.']
      ] },
    { t: 'rule', title: 'NE avec molto / poco / nessuno', text: '<i>Hai amici italiani? — <b>Ne</b> ho <b>molti</b>.</i><br><i>Hai tempo? — <b>Ne</b> ho <b>poco</b>.</i><br><i>Hai domande? — <b>Non ne</b> ho <b>nessuna</b>.</i>' },
    { t: 'warn', title: 'NE ou pronom direct ?', text: '<b>Quantité partielle → NE</b> · <b>Totalité → lo / la / li / le</b><br><i>Le mele? <b>Ne</b> ho comprat<b>e</b> tre.</i> (une partie : trois)<br><i>Le mele? <b>Le</b> ho comprat<b>e</b> tutte.</i> (toutes)' },
    { t: 'rule', title: 'Accord du participe', text: 'Avec <b>NE</b>, le participe s’accorde avec la <b>quantité exprimée</b> :<br><i>Ne ho mangiat<b>i</b> due.</i> (due panini) · <i>Ne ho mangiat<b>e</b> tre.</i> (tre mele) · <i>Ne ho bevut<b>o</b> un po’.</i>' },
    { t: 'rule', title: 'Autres emplois de NE', text: '= « de cela » : <i>Che <b>ne</b> pensi?</i> (qu’en penses-tu ?) · <i>Non <b>ne</b> so nulla.</i> · <i><b>Ne</b> parliamo domani.</i> (on en parle demain)' }
  ]
},
{
  id: 'quantita', ue: 'UE3', icon: '📊', title: 'Molto / tanto / troppo / poco',
  subtitle: 'Adverbe (invariable) ou adjectif (accordé) ?',
  tags: ['quantité'],
  blocks: [
    { t: 'rule', title: 'ADVERBE → invariable', text: 'Quand il modifie un <b>verbe</b> ou un <b>adjectif</b>, il ne change jamais :<br><i>Ho mangiato <b>molto</b>.</i> · <i>Lavoro <b>troppo</b>.</i> · <i>È <b>molto</b> bella.</i> · <i>Sono <b>poco</b> convinto.</i>' },
    { t: 'rule', title: 'ADJECTIF → accord', text: 'Quand il accompagne un <b>nom</b>, il s’accorde en genre et en nombre :<br><i>Ho <b>molta</b> fame.</i> · <i>Ci sono <b>molte</b> persone.</i> · <i>Ho <b>pochi</b> amici.</i> · <i>Bevi <b>troppo</b> caffè.</i>' },
    { t: 'table', caption: 'Les quatre formes', head: ['Base', 'm. sing.', 'f. sing.', 'm. pl.', 'f. pl.'],
      rows: [
        ['molto', 'molto', 'molta', 'molti', 'molte'],
        ['tanto', 'tanto', 'tanta', 'tanti', 'tante'],
        ['troppo', 'troppo', 'troppa', 'troppi', 'troppe'],
        ['poco', 'poco', 'poca', 'pochi', 'poche']
      ] },
    { t: 'warn', text: 'Attention à l’orthographe de <b>poco</b> au pluriel : <i>po<b>ch</b>i, po<b>ch</b>e</i> (le h maintient le son [k]).' },
    { t: 'tip', text: 'Test rapide : « molto » est suivi d’un <b>nom</b> → accord. Il est suivi d’un <b>adjectif</b> ou suit un <b>verbe</b> → invariable.<br><i>molt<b>e</b> persone</i> (nom) vs <i><b>molto</b> simpatiche</i> (adjectif).' },
    { t: 'rule', title: 'Tanto… quanto / così… come', text: '<i>Ho <b>tanti</b> libri <b>quanti</b> te.</i> (autant de livres que toi)<br><i>un po’ di</i> = un peu de : <i>un po’ di pazienza</i>.' }
  ]
},
{
  id: 'nessuno', ue: 'UE3', icon: '🚫', title: 'NESSUNO',
  subtitle: 'Personne, aucun — et la double négation',
  tags: ['négation'],
  blocks: [
    { t: 'rule', title: 'Pronom : « personne »', text: '<i><b>Nessuno</b> è venuto.</i> (personne n’est venu)<br><i>Non conosco <b>nessuno</b>.</i> (je ne connais personne)' },
    { t: 'rule', title: 'Adjectif : « aucun »', text: 'Toujours au <b>singulier</b>, il se comporte comme l’article indéfini <i>un / uno / una / un’</i> :<br><i><b>nessun</b> problema</i> · <i><b>nessuno</b> studente</i> · <i><b>nessuna</b> idea</i> · <i><b>nessun’</b>altra volta</i>.' },
    { t: 'warn', title: 'La double négation', text: 'En italien, la double négation est <b>obligatoire</b> quand le mot négatif suit le verbe :<br><i><b>Non</b> conosco <b>nessuno</b>.</i> · <i><b>Non</b> ho <b>niente</b>.</i> · <i><b>Non</b> vado <b>mai</b> al cinema.</i><br>Mais si le mot négatif est <b>avant</b> le verbe, on supprime <i>non</i> :<br><i><b>Nessuno</b> mi ha chiamato.</i> · <i><b>Mai</b> più!</i>' },
    { t: 'table', caption: 'Les autres négatifs', head: ['Mot', 'Sens', 'Exemple'],
      rows: [
        ['niente / nulla', 'rien', 'Non ho capito niente.'],
        ['mai', 'jamais', 'Non ci vado mai.'],
        ['più', 'ne… plus', 'Non fumo più.'],
        ['ancora', 'ne… pas encore', 'Non è ancora arrivato.'],
        ['neanche / nemmeno / neppure', 'même pas, non plus', 'Non l’ho neanche visto.'],
        ['né… né', 'ni… ni', 'Non bevo né caffè né tè.']
      ] }
  ]
},
{
  id: 'stare-gerundio', ue: 'UE3', icon: '🔄', title: 'STARE + GERUNDIO',
  subtitle: 'Une action en cours',
  tags: ['verbe', 'aspect'],
  blocks: [
    { t: 'p', text: 'Équivalent de « être en train de ». On conjugue <b>stare</b> et on ajoute le <b>gérondif</b>.' },
    { t: 'table', caption: 'Formation du gérondif', head: ['Infinitif', 'Gérondif', 'Exemple'],
      rows: [
        ['-ARE → -ANDO', 'mangiare → mangiando', 'Sto mangiando.'],
        ['-ERE → -ENDO', 'leggere → leggendo', 'Stai leggendo?'],
        ['-IRE → -ENDO', 'dormire → dormendo', 'Sta dormendo.']
      ] },
    { t: 'table', caption: 'Gérondifs irréguliers', head: ['Verbe', 'Gérondif'],
      rows: [['fare', 'facendo'], ['dire', 'dicendo'], ['bere', 'bevendo'], ['tradurre', 'traducendo'], ['porre', 'ponendo']] },
    { t: 'table', caption: 'Conjugaison complète', head: ['', 'stare + gerundio'],
      rows: [
        ['io', 'sto mangiando'], ['tu', 'stai lavorando'], ['lui/lei', 'sta parlando'],
        ['noi', 'stiamo studiando'], ['voi', 'state guardando'], ['loro', 'stanno parlando']
      ] },
    { t: 'warn', text: 'Contrairement au français, on ne l’emploie <b>que</b> pour une action réellement en cours <b>maintenant</b>. Pour le futur proche, on utilise le <b>présent</b> : <i>Domani vado a Roma.</i> (et non « sto andando »)' },
    { t: 'rule', title: 'Pronoms', text: 'Le pronom peut précéder <i>stare</i> ou se souder au gérondif : <i><b>Lo</b> sto leggendo.</i> = <i>Sto leggendo<b>lo</b>.</i>' }
  ]
},
{
  id: 'bello', ue: 'UE3', icon: '✨', title: 'L’aggettivo BELLO',
  subtitle: 'bel, bello, bella, bei, begli, belle',
  tags: ['adjectif'],
  blocks: [
    { t: 'p', text: 'Placé <b>avant</b> le nom, <i>bello</i> se comporte exactement comme l’<b>article défini</b>.' },
    { t: 'table', head: ['Article', 'BELLO', 'Exemple'],
      rows: [
        ['il', 'bel', 'un bel libro'],
        ['lo', 'bello', 'un bello studente'],
        ['l’ (m.)', 'bell’', 'un bell’albergo'],
        ['i', 'bei', 'dei bei libri'],
        ['gli', 'begli', 'dei begli occhi'],
        ['la', 'bella', 'una bella casa'],
        ['l’ (f.)', 'bell’', 'una bell’idea'],
        ['le', 'belle', 'delle belle case']
      ] },
    { t: 'rule', title: 'Après le nom ou le verbe', text: 'Il redevient un adjectif normal à 4 formes : <i>bello / bella / belli / belle</i>.<br><i>Un ragazzo <b>bello</b>.</i> · <i>Questi fiori sono <b>belli</b>.</i>' },
    { t: 'tip', text: '<b>quello</b> suit exactement la même règle : <i>quel libro, quello studente, quei libri, quegli occhi</i>.<br><b>buono</b> au singulier suit l’article <b>indéfini</b> : <i>un buon caffè, un buono studente, una buona idea, un buon’amica</i>.' },
    { t: 'ex', items: [
      { it: 'Che bella giornata!', fr: 'Quelle belle journée !' },
      { it: 'Ho visto un bel film ieri sera.', fr: 'J’ai vu un beau film hier soir.' },
      { it: 'Ha dei begli occhi azzurri.', fr: 'Il/Elle a de beaux yeux bleus.' }
    ] }
  ]
}

];

/* ---- suite UE3 ---- */
window.DATA.grammar.push(
{
  id: 'volerci', ue: 'UE3', icon: '⏲', title: 'VOLERCI',
  subtitle: 'Il faut / c’est nécessaire',
  tags: ['construction'],
  blocks: [
    { t: 'p', text: '<b>Volerci</b> = <i>essere necessario / servire</i>. Il s’emploie de façon <b>impersonnelle</b> et n’existe qu’à la 3<sup>e</sup> personne : il s’accorde avec <b>ce qui est nécessaire</b>.' },
    { t: 'table', head: ['Forme', 'Emploi', 'Exemple'],
      rows: [
        ['ci vuole', 'singulier', 'Ci vuole un’ora. / Ci vuole pazienza.'],
        ['ci vogliono', 'pluriel', 'Ci vogliono due ore. / Ci vogliono 3 uova.'],
        ['ci è voluto/a', 'passé sing. (essere)', 'C’è voluta un’ora.'],
        ['ci sono voluti/e', 'passé pluriel', 'Ci sono volute tre ore.'],
        ['ci vorrà / ci vorranno', 'futur', 'Ci vorranno due giorni.']
      ] },
    { t: 'warn', title: 'Volerci ou metterci ?', text: '<b>VOLERCI</b> = impersonnel, valable pour tout le monde (« il faut »).<br><i><b>Ci vuole</b> un’ora per andare a Roma.</i><br><b>METTERCI</b> = personnel, on conjugue selon le sujet (« je mets »).<br><i><b>Ci metto</b> un’ora per andare a Roma.</i>' },
    { t: 'ex', items: [
      { it: 'Quanto ci vuole per arrivare in centro?', fr: 'Combien de temps faut-il pour arriver au centre ?' },
      { it: 'Ci vogliono due francobolli.', fr: 'Il faut deux timbres.' },
      { it: 'Per fare una torta ci vuole tempo.', fr: 'Pour faire un gâteau, il faut du temps.' }
    ] }
  ]
},
{
  id: 'metterci', ue: 'UE3', icon: '⌛', title: 'METTERCI',
  subtitle: 'Mettre (un certain temps)',
  tags: ['construction'],
  blocks: [
    { t: 'p', text: '<b>Metterci</b> exprime le temps que <b>quelqu’un</b> met à faire quelque chose. Il se conjugue à toutes les personnes, avec <b>ci</b> devant le verbe.' },
    { t: 'table', head: ['Personne', 'Présent', 'Passé (avere)'],
      rows: [
        ['io', 'ci metto', 'ci ho messo'],
        ['tu', 'ci metti', 'ci hai messo'],
        ['lui/lei', 'ci mette', 'ci ha messo'],
        ['noi', 'ci mettiamo', 'ci abbiamo messo'],
        ['voi', 'ci mettete', 'ci avete messo'],
        ['loro', 'ci mettono', 'ci hanno messo']
      ] },
    { t: 'ex', items: [
      { it: 'Ci metto un’ora per andare al lavoro.', fr: 'Je mets une heure pour aller au travail.' },
      { it: 'Quanto ci metti ad arrivare?', fr: 'Tu mets combien de temps pour arriver ?' },
      { it: 'Ci abbiamo messo tre ore!', fr: 'On a mis trois heures !' }
    ] },
    { t: 'tip', text: 'Mémo : <b>VOLERCI</b> → « il faut » (personne précise). <b>METTERCI</b> → « je mets, tu mets… » (quelqu’un de précis).' }
  ]
},
{
  id: 'averci', ue: 'UE3', icon: '🔑', title: 'AVERCI — Ce l’ho',
  subtitle: 'CI + LO / LA / LI / LE',
  tags: ['pronom'],
  blocks: [
    { t: 'p', text: 'À l’oral, <i>avere</i> est souvent renforcé par <b>ci</b> quand on parle d’une chose <b>déjà connue</b> (les clés, le billet, le temps…). Devant <i>lo, la, li, le</i>, le <b>ci</b> devient <b>ce</b>.' },
    { t: 'table', head: ['Question', 'Réponse affirmative', 'Réponse négative'],
      rows: [
        ['Hai la chiave?', 'Sì, ce l’ho.', 'No, non ce l’ho.'],
        ['Hai il biglietto?', 'Sì, ce l’ho.', 'No, non ce l’ho.'],
        ['Hai i documenti?', 'Sì, ce li ho.', 'No, non ce li ho.'],
        ['Hai le monete?', 'Sì, ce le ho.', 'No, non ce le ho.'],
        ['Ce l’hai un euro?', '(familier) « Tu as un euro ? »', '—']
      ] },
    { t: 'warn', text: '<b>ci + lo → ce lo</b> (le i devient e devant un autre pronom). Au singulier, <i>ce lo / ce la</i> s’élident : <b>ce l’ho</b>. Au pluriel, jamais d’élision : <b>ce li ho, ce le ho</b>.' },
    { t: 'rule', title: 'Au passé', text: '<i>Ce l’<b>ho avuto</b>… </i> reste rare ; on utilise surtout le présent. Attention à l’accord avec le pronom : <i>Le chiavi? Ce le ho <b>avute</b> fino a ieri.</i>' }
  ]
},
{
  id: 'pronomi-combinati', ue: 'UE3', icon: '🔗', title: 'I pronomi combinati',
  subtitle: 'Pronom indirect + pronom direct',
  tags: ['pronom'],
  blocks: [
    { t: 'p', text: 'Quand deux pronoms se rencontrent, l’<b>indirect passe en premier</b> et se transforme : <b>mi → me</b>, <b>ti → te</b>, <b>ci → ce</b>, <b>vi → ve</b>, <b>gli / le → glie</b> (soudé).' },
    { t: 'table', caption: 'Tableau complet', head: ['+', 'lo', 'la', 'li', 'le', 'ne'],
      rows: [
        ['mi', 'me lo', 'me la', 'me li', 'me le', 'me ne'],
        ['ti', 'te lo', 'te la', 'te li', 'te le', 'te ne'],
        ['gli / le / Le', 'glielo', 'gliela', 'glieli', 'gliele', 'gliene'],
        ['ci', 'ce lo', 'ce la', 'ce li', 'ce le', 'ce ne'],
        ['vi', 've lo', 've la', 've li', 've le', 've ne'],
        ['gli (loro)', 'glielo', 'gliela', 'glieli', 'gliele', 'gliene']
      ] },
    { t: 'warn', text: '<b>glielo</b> s’écrit en <b>un seul mot</b> et sert aussi bien pour « à lui », « à elle », « à vous (Lei) » et « à eux ». Le contexte lève l’ambiguïté.' },
    { t: 'rule', title: 'Position', text: 'Avant le verbe conjugué : <i><b>Me lo</b> dai?</i><br>Soudés à l’infinitif (le bloc reste entier) : <i>Posso portar<b>glielo</b>.</i> = <i><b>Glielo</b> posso portare.</i><br>Soudés à l’impératif : <i>Dam<b>melo</b>! Portaglie<b>lo</b>!</i>' },
    { t: 'rule', title: 'Accord du participe', text: 'Le participe s’accorde avec le <b>pronom direct</b> :<br><i>Le foto? <b>Te le</b> ho già mandat<b>e</b>.</i> · <i>Il libro? <b>Gliel’</b>ho dat<b>o</b> ieri.</i>' },
    { t: 'ex', items: [
      { it: 'Mi presti la macchina? — Sì, te la presto volentieri.', fr: 'Tu me prêtes la voiture ? — Oui, je te la prête volontiers.' },
      { it: 'Hai detto la verità a Marco? — Sì, gliel’ho detta.', fr: 'Tu as dit la vérité à Marco ? — Oui, je la lui ai dite.' },
      { it: 'Quante mele vuoi? — Me ne dia due chili.', fr: 'Combien de pommes voulez-vous ? — Donnez-m’en deux kilos.' }
    ] }
  ]
},
{
  id: 'bisogna', ue: 'UE3', icon: '📢', title: 'BISOGNA + infinito',
  subtitle: 'Il faut (impersonnel)',
  tags: ['construction'],
  blocks: [
    { t: 'p', text: '<b>Bisogna</b> est <b>impersonnel</b> et <b>invariable</b> : il ne se conjugue pas et ne change jamais. Il est suivi de l’<b>infinitif</b>.' },
    { t: 'ex', items: [
      { it: 'Bisogna studiare ogni giorno.', fr: 'Il faut étudier tous les jours.' },
      { it: 'Bisogna sapere l’inglese.', fr: 'Il faut savoir l’anglais.' },
      { it: 'Bisogna prenotare in anticipo.', fr: 'Il faut réserver à l’avance.' }
    ] },
    { t: 'rule', title: 'Bisogna che + congiuntivo', text: 'Si l’on veut préciser <b>qui</b> doit agir, on utilise <i>bisogna che</i> + <b>subjonctif</b> :<br><i><b>Bisogna che tu venga</b> subito.</i>' },
    { t: 'warn', title: 'Ne pas confondre !', text: '<b>bisogna</b> + infinitif = « il est nécessaire de » (général, personne précise)<br><b>avere bisogno di</b> = « avoir besoin de » (une personne précise)<br><i><b>Bisogna</b> dormire otto ore.</i> vs <i><b>Ho bisogno di</b> dormire.</i>' },
    { t: 'tip', text: 'Synonymes utiles : <i>è necessario + inf.</i>, <i>occorre + inf.</i>, <i>si deve + inf.</i>' }
  ]
},
{
  id: 'avere-bisogno', ue: 'UE3', icon: '🙋', title: 'AVERE BISOGNO DI',
  subtitle: 'Avoir besoin de',
  tags: ['construction'],
  blocks: [
    { t: 'p', text: 'Construction <b>personnelle</b> : on conjugue <i>avere</i> et on ajoute <b>bisogno di</b> + nom ou infinitif.' },
    { t: 'table', head: ['Personne', 'Forme', 'Exemple'],
      rows: [
        ['io', 'ho bisogno di', 'Ho bisogno di aiuto.'],
        ['tu', 'hai bisogno di', 'Hai bisogno di qualcosa?'],
        ['lui/lei', 'ha bisogno di', 'Ha bisogno di riposo.'],
        ['noi', 'abbiamo bisogno di', 'Abbiamo bisogno di tempo.'],
        ['voi', 'avete bisogno di', 'Avete bisogno di me?'],
        ['loro', 'hanno bisogno di', 'Hanno bisogno di parlarti.']
      ] },
    { t: 'warn', text: 'La préposition <b>di</b> est obligatoire. Devant un article, elle devient articulée : <i>Ho bisogno <b>del</b> tuo aiuto.</i>' },
    { t: 'table', caption: 'Résumé', head: ['Construction', 'Sens', 'Exemple'],
      rows: [
        ['bisogna + inf.', 'il est nécessaire de… (tous)', 'Bisogna partire presto.'],
        ['avere bisogno di + nom/inf.', 'avoir besoin de… (moi)', 'Ho bisogno di partire presto.'],
        ['servire', 'servir / être utile à', 'Mi serve una penna.']
      ] }
  ]
},
{
  id: 'che-successo', ue: 'UE3', icon: '⚡', title: 'Che cos’è successo?',
  subtitle: 'Raconter un événement',
  tags: ['communication'],
  blocks: [
    { t: 'p', text: 'Pour demander ce qui s’est passé : <b>Che cos’è successo?</b> · <b>Che cosa è accaduto?</b> · <b>Cos’è capitato?</b>' },
    { t: 'rule', title: 'Succedere', text: 'Verbe impersonnel, auxiliaire <b>essere</b>, participe <b>successo</b> :<br><i>Che cos’è successo? · È successo un incidente. · Sono successe molte cose.</i>' },
    { t: 'table', caption: 'Boîte à outils du récit', head: ['Fonction', 'Expressions'],
      rows: [
        ['Ouvrir', 'Allora… / Sai che cosa è successo? / Ti racconto…'],
        ['Situer', 'Ieri sera… / Due giorni fa… / L’anno scorso…'],
        ['Décor (imperfetto)', 'Era tardi, pioveva, non c’era nessuno…'],
        ['Événements (passato pross.)', 'Ho visto… / È arrivato… / Abbiamo deciso…'],
        ['Enchaîner', 'Prima… poi… a un certo punto… all’improvviso…'],
        ['Réagir', 'Davvero?! / Ma dai! / Che peccato! / Meno male!'],
        ['Conclure', 'Alla fine… / Per fortuna… / Insomma…']
      ] },
    { t: 'ex', items: [
      { it: 'Ieri sera è successa una cosa incredibile.', fr: 'Hier soir il s’est passé une chose incroyable.' },
      { it: 'Mentre tornavo a casa, all’improvviso è cominciato a piovere.', fr: 'Alors que je rentrais, il s’est soudain mis à pleuvoir.' }
    ] }
  ]
},
{
  id: 'agg-da-inf', ue: 'UE3', icon: '🧳', title: 'Aggettivo + DA + infinito',
  subtitle: 'facile da capire, utile da sapere',
  tags: ['construction'],
  blocks: [
    { t: 'p', text: 'Pour dire qu’une chose est « facile / difficile / agréable… <b>à</b> faire », l’italien utilise <b>DA</b> (et non <i>a</i> ni <i>di</i>).' },
    { t: 'table', head: ['Italien', 'Français'],
      rows: [
        ['facile da capire', 'facile à comprendre'],
        ['difficile da spiegare', 'difficile à expliquer'],
        ['utile da sapere', 'utile à savoir'],
        ['comodo da portare', 'confortable à porter'],
        ['facile da pulire', 'facile à nettoyer'],
        ['facile da seguire', 'facile à suivre'],
        ['bello da vedere', 'beau à voir'],
        ['buono da mangiare', 'bon à manger'],
        ['pronto da usare', 'prêt à l’emploi']
      ] },
    { t: 'rule', title: 'Autres emplois de DA + infinitif', text: '<i>qualcosa <b>da</b> bere</i> (quelque chose à boire) · <i>niente <b>da</b> fare</i> · <i>molto <b>da</b> studiare</i> · <i>una casa <b>da</b> vendere</i>.' },
    { t: 'warn', text: 'Ne pas confondre avec <b>è facile capire</b> (sans complément : « il est facile de comprendre ») — la structure avec DA suppose un objet sous-entendu : <i>Questo testo è facile <b>da</b> capire.</i>' }
  ]
},
{
  id: 'che-relativo', ue: 'UE3', icon: '🪢', title: 'Il pronome relativo CHE',
  subtitle: 'Relier deux propositions',
  tags: ['pronom'],
  blocks: [
    { t: 'p', text: '<b>CHE</b> est le relatif universel : il remplace le sujet ou le complément d’objet direct, pour les <b>personnes comme pour les choses</b>. Il est <b>invariable</b>.' },
    { t: 'ex', items: [
      { it: 'La ragazza che fa il corso è italiana.', fr: 'La fille qui suit le cours est italienne.' },
      { it: 'Il libro che mi hai dato è bellissimo.', fr: 'Le livre que tu m’as donné est magnifique.' },
      { it: 'Il film che abbiamo visto era noioso.', fr: 'Le film que nous avons vu était ennuyeux.' }
    ] },
    { t: 'rule', title: 'Avec une préposition → CUI', text: 'Après une préposition, on emploie <b>cui</b> (invariable lui aussi) :<br><i>La città <b>in cui</b> vivo.</i> · <i>L’amico <b>con cui</b> studio.</i> · <i>La ragazza <b>a cui</b> ho scritto.</i> · <i>Il motivo <b>per cui</b> sono qui.</i>' },
    { t: 'warn', text: 'Contrairement au français, <b>che</b> ne s’élide <u>jamais</u> devant une voyelle : <i>il libro <b>che</b> ho letto</i> (et non « ch’ho »).' },
    { t: 'tip', text: '<b>il che</b> = « ce qui » : <i>È partito, <b>il che</b> mi ha sorpreso.</i><br><b>quello che / ciò che</b> = « ce que » : <i>Non capisco <b>quello che</b> dici.</i>' }
  ]
},
{
  id: 'futuro-semplice', ue: 'UE3', icon: '🔮', title: 'Il futuro semplice',
  subtitle: 'Parler de l’avenir, faire des prévisions',
  tags: ['verbe', 'futur'],
  blocks: [
    { t: 'p', text: 'Formation : radical du futur + <b>-ò, -ai, -à, -emo, -ete, -anno</b>. Les verbes en <b>-ARE</b> transforment le <i>a</i> en <b>e</b> : <i>parl<b>a</b>re → parl<b>e</b>rò</i>.' },
    { t: 'table', head: ['', '-ARE → -ER-', '-ERE → -ER-', '-IRE → -IR-'],
      rows: [
        ['io', 'parlerò', 'leggerò', 'dormirò'],
        ['tu', 'parlerai', 'leggerai', 'dormirai'],
        ['lui/lei', 'parlerà', 'leggerà', 'dormirà'],
        ['noi', 'parleremo', 'leggeremo', 'dormiremo'],
        ['voi', 'parlerete', 'leggerete', 'dormirete'],
        ['loro', 'parleranno', 'leggeranno', 'dormiranno']
      ] },
    { t: 'rule', title: 'Particularités orthographiques', text: '<b>-care / -gare</b> → ajout d’un <b>h</b> : <i>pagare → pag<b>h</b>erò</i>, <i>cercare → cerc<b>h</b>erò</i>.<br><b>-ciare / -giare</b> → le <b>i</b> tombe : <i>mangiare → mangerò</i>, <i>cominciare → comincerò</i>.<br><b>finire → finirò</b> (les -isc- ne se voient pas au futur).' },
    { t: 'table', caption: 'Radicaux contractés', head: ['Verbe', 'Futur', 'Verbe', 'Futur'],
      rows: [
        ['avere', 'avrò', 'dovere', 'dovrò'],
        ['potere', 'potrò', 'andare', 'andrò'],
        ['vedere', 'vedrò', 'vivere', 'vivrò'],
        ['sapere', 'saprò', 'cadere', 'cadrò']
      ] },
    { t: 'table', caption: 'Principaux irréguliers', head: ['Verbe', 'Futur', 'Verbe', 'Futur'],
      rows: [
        ['essere', 'sarò', 'fare', 'farò'],
        ['volere', 'vorrò', 'dare', 'darò'],
        ['stare', 'starò', 'venire', 'verrò'],
        ['rimanere', 'rimarrò', 'bere', 'berrò'],
        ['tenere', 'terrò', 'dire', 'dirò']
      ] },
    { t: 'rule', title: 'Le futur de probabilité', text: 'Le futur exprime aussi une <b>supposition sur le présent</b> :<br><i>Che ore <b>saranno</b>? — <b>Saranno</b> le tre.</i> (il doit être trois heures)<br><i>Dov’è Marco? — <b>Sarà</b> a casa.</i> (il doit être chez lui)' },
    { t: 'ex', items: [
      { it: 'L’anno prossimo andrò in Italia.', fr: 'L’année prochaine j’irai en Italie.' },
      { it: 'Tra cinque anni vivrò in una grande città.', fr: 'Dans cinq ans je vivrai dans une grande ville.' }
    ] }
  ]
},
{
  id: 'tra-fra', ue: 'UE3', icon: '📆', title: 'TRA / FRA + futur',
  subtitle: 'Exprimer un délai',
  tags: ['préposition', 'futur'],
  blocks: [
    { t: 'p', text: '<b>Tra</b> et <b>fra</b> (identiques) + expression de temps = « dans » (délai à venir).' },
    { t: 'ex', items: [
      { it: 'Tra due mesi finirò gli studi.', fr: 'Dans deux mois je finirai mes études.' },
      { it: 'Fra cinque anni avrò trent’anni.', fr: 'Dans cinq ans j’aurai trente ans.' },
      { it: 'Il treno parte tra dieci minuti.', fr: 'Le train part dans dix minutes.' }
    ] },
    { t: 'warn', title: 'Tra/fra ≠ in', text: '<b>tra / fra</b> = « dans » (à partir de maintenant) → <i>Tra un’ora.</i><br><b>in</b> = « en » (durée nécessaire) → <i>Ho fatto il lavoro <b>in</b> un’ora.</i>' },
    { t: 'rule', title: 'Autre sens de tra/fra', text: '« entre / parmi » : <i><b>Tra</b> me e te…</i> · <i><b>Fra</b> tutti gli amici, preferisco Marco.</i>' },
    { t: 'tip', text: 'Autres marqueurs du futur : <i>domani, dopodomani, la settimana prossima, il mese prossimo, l’anno prossimo, presto, un giorno, in futuro</i>.' }
  ]
},
{
  id: 'periodo-ipotetico', ue: 'UE3', icon: '🌦', title: 'Il periodo ipotetico',
  subtitle: 'La phrase hypothétique avec SE',
  tags: ['syntaxe'],
  blocks: [
    { t: 'p', text: 'Le « periodo ipotetico della realtà » (1<sup>er</sup> type) exprime une hypothèse <b>réelle, probable</b>.' },
    { t: 'table', head: ['Structure', 'Exemple'],
      rows: [
        ['se + présent → présent', 'Se piove, resto a casa.'],
        ['se + présent → futur', 'Se piove, resterò a casa.'],
        ['se + futur → futur', 'Se avrete pazienza, riuscirete a realizzare i vostri progetti.'],
        ['se + présent → impératif', 'Se hai fame, mangia!']
      ] },
    { t: 'warn', text: 'Contrairement au français, l’italien peut mettre le <b>futur après SE</b> : <i>Se <b>andrò</b> in Italia, <b>visiterò</b> Roma.</i> (le français dirait « si je vais »). Le présent reste toutefois plus courant.' },
    { t: 'rule', title: 'Autres types (pour info)', text: '<b>Possibilité</b> : se + congiuntivo imperfetto → condizionale → <i>Se avessi tempo, verrei.</i><br><b>Irréalité</b> : se + congiuntivo trapassato → condizionale passato → <i>Se avessi saputo, sarei venuto.</i>' },
    { t: 'ex', items: [
      { it: 'Se studi, passerai l’esame.', fr: 'Si tu étudies, tu réussiras l’examen.' },
      { it: 'Se domani farà bel tempo, andremo al mare.', fr: 'S’il fait beau demain, nous irons à la mer.' }
    ] }
  ]
},
{
  id: 'registro', ue: 'UE3', icon: '✉️', title: 'Registro formale e informale',
  subtitle: 'Choisir le bon niveau de langue',
  tags: ['communication', 'registre'],
  blocks: [
    { t: 'table', head: ['', 'Informel (tu)', 'Formel (Lei)'],
      rows: [
        ['Salutation', 'Ciao! / Ehi!', 'Buongiorno / Buonasera'],
        ['Ouverture (mail)', 'Caro Marco, / Ciao Anna,', 'Gentile Signor Rossi, / Egregio Dottore,'],
        ['Demander', 'Mi puoi aiutare?', 'Mi potrebbe aiutare? / Le chiedo cortesemente…'],
        ['Remercier', 'Grazie mille!', 'La ringrazio per la Sua disponibilità.'],
        ['Clôture', 'Un abbraccio, / A presto! / Baci', 'Cordiali saluti, / Distinti saluti,'],
        ['Congé', 'Ciao, ci vediamo!', 'ArrivederLa. / Buona giornata.']
      ] },
    { t: 'rule', title: 'Structure d’un e-mail formel', text: '1. <b>Oggetto</b> clair (<i>Richiesta di informazioni</i>)<br>2. <b>Formule d’appel</b> : <i>Gentile Signora Bianchi,</i><br>3. <b>Motif</b> : <i>Le scrivo in merito a… / La contatto per…</i><br>4. <b>Corps</b> : demande précise, phrases complètes, pas d’abréviations<br>5. <b>Clôture</b> : <i>In attesa di una Sua risposta, La ringrazio anticipatamente.</i><br>6. <b>Salutations</b> : <i>Cordiali saluti,</i> + prénom et nom' },
    { t: 'rule', title: 'Structure d’un e-mail informel', text: '<i>Ciao Luca!</i> → <i>Come stai? Ti scrivo perché…</i> → nouvelles, questions → <i>Fammi sapere! Un abbraccio, Marco</i>' },
    { t: 'warn', text: 'Dans un mail formel : <b>vouvoiement (Lei)</b>, majuscules de politesse (<i>La ringrazio, il Suo messaggio</i>), conditionnel de politesse (<i>vorrei, potrebbe, sarebbe possibile</i>), aucune abréviation ni émoji.' },
    { t: 'tip', text: 'Le <b>conditionnel</b> adoucit toujours : <i>Vorrei…</i> plutôt que <i>Voglio…</i> ; <i>Potrebbe…?</i> plutôt que <i>Può…?</i>' }
  ]
},
{
  id: 'prep-luoghi', ue: 'UE3', icon: '🗺', title: 'Prépositions et lieux (services)',
  subtitle: 'in / a / da : où va-t-on ?',
  tags: ['préposition'],
  blocks: [
    { t: 'table', head: ['Préposition', 'Emploi', 'Exemples'],
      rows: [
        ['IN', 'lieux « génériques », souvent en -ia / -eria', 'in farmacia, in pizzeria, in banca, in ufficio, in palestra, in piscina, in centro, in montagna'],
        ['A / ALLA / AL', 'lieu précis ou identifié', 'alla posta, al mercato, al cinema, al bar, al ristorante, a teatro, a scuola'],
        ['DA', 'chez quelqu’un (personne, métier)', 'dal farmacista, dal fruttivendolo, dal medico, dal parrucchiere, da Marco']
      ] },
    { t: 'rule', title: 'Aller / être', text: 'La même préposition sert pour la destination et la position :<br><i>Vado <b>in</b> farmacia.</i> / <i>Sono <b>in</b> farmacia.</i><br><i>Vado <b>dal</b> medico.</i> / <i>Sono <b>dal</b> medico.</i>' },
    { t: 'warn', text: 'Quelques expressions figées <b>sans article</b> : <i>a casa, a scuola, a letto, a teatro, in ufficio, in città, in campagna, in vacanza</i>.' },
    { t: 'tip', text: 'Astuce : si le lieu est <b>une personne</b> (le pharmacien) → <b>DA</b>. Si c’est <b>le commerce</b> (la pharmacie) → <b>IN</b>.' }
  ]
},
{
  id: 'accordo-disaccordo', ue: 'UE3', icon: '👍', title: 'Être d’accord ou pas',
  subtitle: 'Anche a me / Neanche a me / Io, invece…',
  tags: ['communication'],
  blocks: [
    { t: 'p', text: 'La réaction dépend de <b>deux choses</b> : la phrase de départ est-elle <b>affirmative ou négative</b> ? Et le verbe est-il <b>piacere</b> (construction indirecte) ou un verbe normal ?' },
    { t: 'table', caption: 'Avec PIACERE (à moi = a me)', head: ['Phrase', 'Je suis d’accord', 'Je ne suis pas d’accord'],
      rows: [
        ['Mi piace il jazz. (+)', 'Anche a me.', 'A me, invece, no.'],
        ['Non mi piace il jazz. (–)', 'Neanche a me. / Nemmeno a me.', 'A me, invece, sì.']
      ] },
    { t: 'table', caption: 'Avec un verbe normal (io)', head: ['Phrase', 'Je suis d’accord', 'Je ne suis pas d’accord'],
      rows: [
        ['Vado al cinema. (+)', 'Anch’io.', 'Io, invece, no.'],
        ['Non vado al cinema. (–)', 'Neanch’io. / Nemmeno io.', 'Io, invece, sì.']
      ] },
    { t: 'warn', text: 'Après une phrase <b>négative</b>, on ne peut pas répondre « anche a me » : il faut <b>neanche / nemmeno / neppure</b>.' },
    { t: 'rule', title: 'Exprimer son opinion', text: '<i>Secondo me… / Per me… / A mio parere…</i><br><i>Penso che + congiuntivo</i> · <i>Sono (assolutamente) d’accordo</i> · <i>Non sono per niente d’accordo</i> · <i>Hai ragione / Hai torto</i> · <i>Dipende</i>.' },
    { t: 'ex', items: [
      { it: 'Non mi piace il freddo. — Neanche a me!', fr: 'Je n’aime pas le froid. — Moi non plus !' },
      { it: 'Io preferisco il treno. — Io, invece, l’aereo.', fr: 'Moi je préfère le train. — Moi, en revanche, l’avion.' }
    ] }
  ]
}
);
