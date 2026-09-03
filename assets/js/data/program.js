/* =========================================================================
   PROGRAMMA — arborescence fidèle au document « Mes cours d'italien »
   grammar / vocab / ex = identifiants vers les autres modules
   ========================================================================= */
window.DATA = window.DATA || {};

window.DATA.program = [
{
  ue: 'UE1', icon: '🇮🇹', title: 'Fondations de l’italien',
  subtitle: 'Bases grammaticales, présentation, bar, hôtel, e-mail',
  sections: [
    { title: 'Indicativo presente', points: ['verbes réguliers', 'principaux verbes irréguliers'], grammar: 'presente', ex: 'presente' },
    { title: 'La forme de politesse Lei / Voi', points: ['passage du Lei au tu', 'Le posso dare del tu?'], grammar: 'politesse', ex: 'politesse', vocab: 'saluti' },
    { title: 'Genre masculin / féminin', points: ['distinguer masculin et féminin', 'noms masculins en -a', 'noms féminins en -o', 'noms en -e', 'professions : homme / femme'], grammar: 'genere', ex: 'genere', vocab: 'professioni' },
    { title: 'Articles déterminatifs', points: ['il, lo, l’, i, gli, la, le', 'Gli ou i ?'], grammar: 'articoli-det', ex: 'articoli-det' },
    { title: 'Articles indéterminatifs', points: ['un, uno, una, un’'], grammar: 'articoli-ind', ex: 'articoli-ind' },
    { title: 'Le pluriel', points: ['noms et adjectifs', 'pluriels irréguliers'], grammar: 'plurale' },
    { title: 'Nazionalità e provenienza', points: ['nationalités', 'pays et provenance'], vocab: 'nazionalita' },
    { title: 'Professioni', points: ['métiers au masculin et au féminin'], vocab: 'professioni' },
    { title: 'Numeri', points: ['cardinali', 'ordinali'], vocab: 'numeri' },
    { title: 'Quanto / quanti / quanta / quante', points: ['accord avec le nom', 'emploi adverbial'], grammar: 'quanto', ex: 'quanto' },
    { title: 'Dire l’ora', points: ['heures, quarts, demies', 'à quelle heure ?'], grammar: 'lora', ex: 'lora', vocab: 'ora' },
    { title: 'I mesi', points: ['mois, jours, saisons', 'dates'], vocab: 'calendario' },
    { title: 'Qual / quale / quali', points: ['qual è sans apostrophe'], grammar: 'quale', ex: 'quale' },
    { title: 'Pronoms personnels indirects', points: ['a lui / a lei / a Lei', 'différence entre gli / le et a lui / a lei'], grammar: 'pron-indiretti', ex: 'pron-indiretti' },
    { title: 'Piacere', points: ['mi piace / mi piacciono', 'construction particulière du verbe piacere'], grammar: 'piacere', ex: 'piacere' },
    { title: 'Communication au bar ☕', points: ['commander', 'payer', 'offrir', 'accepter', 'refuser', 'insister', 'vocabulaire du bar'], vocab: 'bar', ex: 'lessico-bar', dialogue: 'dial-bar' },
    { title: 'Hôtel 🏨', points: ['réserver une chambre', 'demander les disponibilités', 'dates', 'caractéristiques des chambres', 'prix', 'paiement et réservation', 'donner ses informations personnelles', 'demander des informations complémentaires'], vocab: 'hotel', ex: 'lessico-hotel', dialogue: 'dial-hotel' },
    { title: 'Communication écrite ✉️', points: ['structure d’un e-mail informel', 'commencer et terminer un e-mail formel', 'formules d’ouverture et de clôture'], vocab: 'email', email: true }
  ]
},
{
  ue: 'UE2', icon: '🧩', title: 'Consolidation grammaticale et communication',
  subtitle: 'Prépositions, passé, subjonctif, alimentation, famille',
  sections: [
    { title: 'Preposizioni semplici', points: ['a, di, da, in, con, su, per, tra/fra'], grammar: 'prep-semplici', ex: 'prep-semplici' },
    { title: 'Preposizioni articolate', points: ['notamment les formes avec in'], grammar: 'prep-articolate', ex: 'prep-articolate' },
    { title: 'Verbi modali', points: ['potere, dovere, volere'], grammar: 'modali', ex: 'modali' },
    { title: 'Avverbi', points: ['lieu', 'temps', 'manière', 'quantité'], vocab: 'avverbi' },
    { title: 'Congiunzioni', points: ['relier les idées'], vocab: 'connettivi' },
    { title: 'Parole interrogative', points: ['chi, che/cosa, dove, quando, come, perché, quanto…'], vocab: 'interrogativi' },
    { title: 'Infinitif + pronom complément', points: ['vederti, parlargli, farlo'], grammar: 'infinito-pronome' },
    { title: 'Adjectifs de couleur', points: ['accord et invariables'], grammar: 'colori-gram', ex: 'colori-gram', vocab: 'colori' },
    { title: 'Passato prossimo', points: ['formation', 'auxiliaires avere / essere', 'choix de l’auxiliaire'], grammar: 'passato-prossimo', ex: 'passato-prossimo' },
    { title: 'Participi passati irregolari', points: ['la liste à connaître'], grammar: 'participi-irregolari' },
    { title: 'Congiuntivo presente', points: ['formation', 'emplois'], grammar: 'congiuntivo', ex: 'congiuntivo' },
    { title: 'CI', points: ['utilisation de ci', 'pas de ci devant conoscere / sapere'], grammar: 'ci', ex: 'ci' },
    { title: 'Imperfetto', points: ['verbes réguliers', 'verbes irréguliers', 'imperfetto ou passato prossimo ?'], grammar: 'imperfetto', ex: 'imperfetto' },
    { title: 'Adjectifs et pronoms démonstratifs', points: ['questo / quello'], grammar: 'dimostrativi', ex: 'dimostrativi' },
    { title: 'Adjectifs et pronoms possessifs', points: ['article avec les adjectifs possessifs', 'article avec les pronoms possessifs'], grammar: 'possessivi', ex: 'possessivi' },
    { title: 'Comparatif', points: ['più / meno … di ou che', 'comparatifs irréguliers'], grammar: 'comparativo', ex: 'comparativo' },
    { title: 'Mentre / durante', points: ['mentre + verbe, durante + nom'], grammar: 'mentre-durante', ex: 'mentre-durante' },
    { title: 'Connecteurs temporels', points: ['prima', 'poi', 'dopo', 'a un certo punto', 'improvvisamente'], grammar: 'connettori', vocab: 'connettivi' },
    { title: 'Fare la spesa 🛒', points: ['quantités et emballages', 'au marché'], vocab: 'spesa' },
    { title: 'La piramide alimentare 🍝', points: ['alimentation et équilibre'], vocab: 'alimenti' },
    { title: 'Abbigliamento 👕', points: ['vêtements et accessoires'], vocab: 'abbigliamento' },
    { title: 'I tipi di caffè ☕', points: ['espresso, macchiato, corretto…'], vocab: 'caffe' },
    { title: 'La famiglia 🧑‍🧑‍🧒', points: ['liens familiaux', 'parler de sa famille'], vocab: 'famiglia' }
  ]
},
{
  ue: 'UE3', icon: '🚀', title: 'Italien — compétences avancées',
  subtitle: 'Santé, pronoms, services, cinéma, voyages, travail, futur',
  sections: [
    { title: '1. STARE BENE — Santé et bien-être', points: ['vocabulaire de la santé et du corps', 'bien-être, habitudes, mode de vie', 'expressions de fréquence', 'vaccin, convalescence, danger, écran'], vocab: 'salute', ex: 'lessico-salute', dialogue: 'dial-medico' },
    { title: 'Bien-être et habitudes', points: ['una volta al mese', 'in settimana / nel fine settimana', 'andare in palestra / in piscina'], vocab: 'benessere' },
    { title: 'Impératif', points: ['forme directe : tu / noi / voi', 'forme de politesse : Lei', 'formes régulières et irrégulières', 'impératif affirmatif et négatif', 'impératif + pronoms'], grammar: 'imperativo', ex: 'imperativo' },
    { title: '2. PRONOMS DIRECTS', points: ['lo, la, li, le', 'position du pronom', 'accord du participe passé', 'pronoms directs + tutto/a/i/e'], grammar: 'pron-diretti', ex: 'pron-diretti' },
    { title: '3. NE', points: ['exprimer une partie d’une quantité', 'NE avec molto / poco / nessuno', 'différence entre NE et les pronoms directs'], grammar: 'ne', ex: 'ne' },
    { title: '4. QUANTITÀ — molto / tanto / troppo / poco', points: ['adverbes (invariables)', 'adjectifs (accordés)', 'accord en genre et en nombre'], grammar: 'quantita', ex: 'quantita' },
    { title: '5. NESSUNO', points: ['adjectif et pronom', 'accord et formes', 'double négation'], grammar: 'nessuno', ex: 'nessuno' },
    { title: '6. PRÉPOSITIONS ARTICULÉES', points: ['del, della, dello, dei, degli, delle, dell’', 'utilisation avec les lieux'], grammar: 'prep-articolate', ex: 'prep-articolate' },
    { title: '7. SERVIZI — Commerces et services 🛍️', points: ['types de commerces', 'lo sconto, i saldi, in saldo, scontato', 'ordinare, provare, scegliere, comprare', 'couleurs et tailles', 'in / a / da avec les lieux'], vocab: 'servizi', grammar: 'prep-luoghi', ex: 'prep-luoghi', dialogue: 'dial-negozio' },
    { title: 'Acquisti e taglie', points: ['essayer, échanger, rembourser'], vocab: 'acquisti' },
    { title: '8. STARE + GERUNDIO', points: ['-are → -ando', '-ere / -ire → -endo', 'action en cours'], grammar: 'stare-gerundio', ex: 'stare-gerundio' },
    { title: '9. BELLO', points: ['bello / bel / bella / bei / begli / belle', 'fonctionnement proche de l’article défini'], grammar: 'bello', ex: 'bello' },
    { title: '10. VOLERCI 📮', points: ['ci vuole / ci vogliono', 'accord selon la quantité', 'différence avec metterci'], grammar: 'volerci', ex: 'volerci' },
    { title: '11. VOCABULAIRE — Poste et commissions', points: ['segnare, firmare, francobollo, timbro', 'scontrino, conto, provare, assaggiare, tagliare, buco'], vocab: 'posta', dialogue: 'dial-posta' },
    { title: '12. AVERCI 📌', points: ['CI + LO/LA/LI/LE', 'Ce l’ho. Ce l’hai? Non ce l’ho.'], grammar: 'averci', ex: 'averci' },
    { title: '13. CHE COS’È SUCCESSO?', points: ['Che cos’è successo / accaduto ?', 'narration d’événements'], grammar: 'che-successo' },
    { title: '14. CINEMA 🎬', points: ['vocabulaire du cinéma', 'parler de ses goûts', 'fréquence', 'La grande bellezza', 'Basilicata Coast to Coast', 'donner son opinion sur un film'], vocab: 'cinema', dialogue: 'dial-cinema' },
    { title: '15. BISOGNA', points: ['bisogna + infinito', 'construction impersonnelle'], grammar: 'bisogna', ex: 'bisogna' },
    { title: '16. AVERE BISOGNO DI', points: ['Ho / hai / abbiamo bisogno di…', 'différence avec bisogna'], grammar: 'avere-bisogno', ex: 'bisogna' },
    { title: '17. PRONOMI COMBINATI 🔗', points: ['me lo, te lo, glielo, ce lo, ve lo…', 'position avec le verbe', 'avec l’infinitif'], grammar: 'pronomi-combinati', ex: 'pronomi-combinati' },
    { title: '18. DONNER SON AVIS 💬', points: ['Mi piace / non mi piace', 'Neanche a me / nemmeno a me', 'A me, invece, sì', 'Neanch’io / nemmeno io'], grammar: 'accordo-disaccordo', ex: 'accordo-disaccordo', vocab: 'opinione' },
    { title: '19. VIAGGI — Voyages ✈️', points: ['voyager en avion / en train', 'noleggiare / affittare', 'avantages et inconvénients', 'il binario, il biglietto, la carrozza-bar, l’imbarco, l’attesa, l’incidente', 'comparer avion et train'], vocab: 'viaggi', ex: 'lessico-viaggi', dialogue: 'dial-viaggio' },
    { title: '20. CONSIGNES ET PANNEAUX', points: ['Spegnere i telefoni cellulari', 'Vietato fumare', 'Allacciare le cinture', 'Obliterare il biglietto', 'Avvicinarsi / allontanarsi'], vocab: 'segnali' },
    { title: '21. AGGETTIVO + DA + INFINITO 🧳', points: ['facile da capire', 'utile da sapere', 'comodo da portare'], grammar: 'agg-da-inf', ex: 'agg-da-inf' },
    { title: '22. VITA E LAVORO 👩‍💼', points: ['giornata lavorativa, orario di lavoro', 'giorno di riposo, ferie, stipendio', 'datore di lavoro, collega, pensione', 'décrire son travail et sa journée'], vocab: 'lavoro', ex: 'lessico-lavoro', dialogue: 'dial-lavoro' },
    { title: '23. METTERCI', points: ['Ci metto un’ora per andare al lavoro', 'différence avec volerci'], grammar: 'metterci', ex: 'volerci' },
    { title: '24. PRONOME RELATIVO CHE 🔗', points: ['relier deux propositions', 'CHE pour les personnes et les choses', 'CHE est invariable'], grammar: 'che-relativo', ex: 'che-relativo' },
    { title: '25. IL MIO FUTURO 🔮', points: ['faire des prévisions', 'parler de ses projets', 'Come ti immagini tra 5 anni?', 'signes du zodiaque'], vocab: 'futuro', dialogue: 'dial-futuro' },
    { title: '26. FUTURO SEMPLICE', points: ['-ARE → -ER-, -ERE → -ER-, -IRE → -IR-', 'pagherò, mangerò, finirò', 'radicaux contractés : avrò, dovrò, potrò, andrò, vedrò, vivrò', 'irréguliers : sarò, farò, vorrò, darò'], grammar: 'futuro-semplice', ex: 'futuro-semplice' },
    { title: '27. TRA / FRA + FUTUR', points: ['Tra due mesi…', 'Fra cinque anni…'], grammar: 'tra-fra', ex: 'tra-fra' },
    { title: '28. PERIODO IPOTETICO', points: ['construction avec se', 'Se avrete pazienza, riuscirete…'], grammar: 'periodo-ipotetico', ex: 'periodo-ipotetico' },
    { title: '29. IL MONDO DI DOMANI 🌍', points: ['environnement, changements climatiques', 'Il mare è inquinato / L’automobile è inquinante', 'a causa del riscaldamento globale', 'imaginer le futur'], vocab: 'ambiente', ex: 'lessico-ambiente' },
    { title: '30. REGISTRO FORMALE E INFORMALE ✉️', points: ['TU / LEI', 'écrire un e-mail formel', 'formules de communication écrite'], grammar: 'registro', ex: 'registro', email: true }
  ]
}
];

/* Compétences de communication travaillées (page 11 du programme) */
window.DATA.competenze = [
  'parler de moi et de mes habitudes', 'parler de ma santé', 'donner des conseils',
  'donner mon opinion', 'être d’accord / pas d’accord', 'parler de mes goûts',
  'parler d’un film', 'organiser une sortie', 'parler de voyages',
  'comparer des moyens de transport', 'parler de mon travail', 'parler de mes horaires',
  'parler de mes projets', 'faire des prévisions', 'parler de mon avenir',
  'imaginer le monde de demain', 'écrire une lettre / un e-mail formel',
  'comprendre des dialogues et documents audio', 'comprendre des textes',
  'produire des textes écrits', 'prendre la parole à l’oral'
];

/* Fil rouge grammatical (page 12) */
window.DATA.filoRosso = [
  'pron-diretti', 'ne', 'averci', 'imperativo', 'volerci', 'stare-gerundio',
  'bisogna', 'avere-bisogno', 'pronomi-combinati', 'quantita', 'che-relativo',
  'metterci', 'futuro-semplice', 'periodo-ipotetico', 'registro'
];
