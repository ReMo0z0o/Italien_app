/* =========================================================================
   ESERCIZI — banque d'exercices par point du programme
   types : qcm | fill | trad | order | vf
   ========================================================================= */
window.DATA = window.DATA || {};

window.DATA.exercises = [

{ topic: 'presente', ue: 'UE1', title: 'Indicativo presente', items: [
  { t: 'fill', q: 'Marco (lavorare) ___ in banca.', a: 'lavora' },
  { t: 'fill', q: 'Noi (finire) ___ il lavoro alle sei.', a: 'finiamo' },
  { t: 'fill', q: 'Loro (capire) ___ bene l’italiano.', a: 'capiscono' },
  { t: 'fill', q: 'Tu (pagare) ___ con la carta?', a: 'paghi', why: '-gare → ajout du h devant i' },
  { t: 'fill', q: 'Noi (cercare) ___ un albergo.', a: 'cerchiamo', why: '-care → cerchiamo' },
  { t: 'fill', q: 'Io (mangiare) ___ spesso al bar.', a: 'mangio' },
  { t: 'fill', q: 'Voi (venire) ___ con noi?', a: 'venite' },
  { t: 'fill', q: 'Lei (uscire) ___ ogni sera.', a: 'esce' },
  { t: 'qcm', q: 'Noi ___ a Roma da tre anni.', opts: ['abitiamo', 'abitate', 'abitano'], a: 0 },
  { t: 'qcm', q: 'Loro ___ molto lavoro.', opts: ['ha', 'hanno', 'anno'], a: 1, why: 'avere : loro hanno' },
  { t: 'qcm', q: 'Che cosa ___ stasera, Marco?', opts: ['fa', 'fai', 'facciamo'], a: 1 },
  { t: 'qcm', q: 'Io non ___ la risposta.', opts: ['so', 'sa', 'sai'], a: 0 },
  { t: 'vf', q: '« Loro preferiscono il tè. » est correct.', a: true, why: 'preferire est un verbe en -isc-' },
  { t: 'vf', q: '« Noi finisciamo alle otto. » est correct.', a: false, why: 'À la 1re pers. du pluriel : noi finiamo (pas de -isc-)' },
  { t: 'trad', fr: 'Je ne comprends pas bien.', a: 'Non capisco bene.' },
  { t: 'trad', fr: 'Nous allons au bar.', a: 'Andiamo al bar.' }
]},

{ topic: 'politesse', ue: 'UE1', title: 'La forme de politesse', items: [
  { t: 'qcm', q: 'À une cliente inconnue : « Buongiorno, come ___ ? »', opts: ['stai', 'sta', 'state'], a: 1 },
  { t: 'qcm', q: 'Formel : « ___ posso dare del tu? »', opts: ['Ti', 'Le', 'La'], a: 1, why: 'dare del tu A qualcuno → pronom indirect Le' },
  { t: 'qcm', q: 'Formel : « Come ___ chiama, scusi? »', opts: ['ti', 'si', 've'], a: 1 },
  { t: 'fill', q: 'Passe au vouvoiement : « Di dove sei? » → « Di dov’___ ? »', a: 'è' },
  { t: 'fill', q: 'Vouvoiement : « Ti do il mio numero. » → « ___ do il mio numero. »', a: 'Le' },
  { t: 'vf', q: 'Le « Lei » de politesse se conjugue à la 3e personne du singulier.', a: true },
  { t: 'vf', q: 'Pour vouvoyer plusieurs personnes, on utilise « Lei ».', a: false, why: 'On utilise « voi »' },
  { t: 'trad', fr: 'Excusez-moi, puis-je vous poser une question ?', a: 'Mi scusi, Le posso fare una domanda?', alts: ['Scusi, Le posso fare una domanda?', 'Mi scusi, posso farLe una domanda?'] },
  { t: 'trad', fr: 'Tutoyons-nous !', a: 'Diamoci del tu!' }
]},

{ topic: 'genere', ue: 'UE1', title: 'Masculin / féminin', items: [
  { t: 'qcm', q: 'Quel est le genre de « il problema » ?', opts: ['masculin', 'féminin'], a: 0, why: 'Nom masculin en -a ; pluriel : i problemi' },
  { t: 'qcm', q: '« la mano » au pluriel :', opts: ['le mani', 'le mane', 'i mani'], a: 0 },
  { t: 'qcm', q: 'Féminin de « lo studente » :', opts: ['la studenta', 'la studentessa', 'la studente'], a: 1 },
  { t: 'qcm', q: 'Féminin de « il traduttore » :', opts: ['la traduttora', 'la traduttrice', 'la traduttoressa'], a: 1 },
  { t: 'qcm', q: '« la stazione » est…', opts: ['masculin', 'féminin'], a: 1, why: 'Les noms en -zione sont féminins' },
  { t: 'fill', q: 'Pluriel de « il programma » : i ___', a: 'programmi' },
  { t: 'fill', q: 'Pluriel de « l’amico » : gli ___', a: 'amici' },
  { t: 'fill', q: 'Pluriel de « l’amica » : le ___', a: 'amiche' },
  { t: 'fill', q: 'Pluriel de « l’uovo » : le ___', a: 'uova' },
  { t: 'vf', q: '« la foto » est un nom féminin en -o.', a: true, why: 'Abrégé de « la fotografia »' },
  { t: 'vf', q: 'Tous les noms en -e sont masculins.', a: false, why: 'la chiave, la notte sont féminins' }
]},

{ topic: 'articoli-det', ue: 'UE1', title: 'Articles définis', items: [
  { t: 'qcm', q: '___ zaino è nuovo.', opts: ['Il', 'Lo', 'L’'], a: 1, why: 'z → lo' },
  { t: 'qcm', q: '___ studenti sono in classe.', opts: ['I', 'Gli', 'Le'], a: 1, why: 's+consonne → gli' },
  { t: 'qcm', q: '___ amica di Maria arriva domani.', opts: ['Il', 'La', 'L’'], a: 2 },
  { t: 'qcm', q: '___ ragazzi giocano a calcio.', opts: ['I', 'Gli', 'Li'], a: 0 },
  { t: 'qcm', q: '___ psicologo lavora in ospedale.', opts: ['Il', 'Lo', 'L’'], a: 1, why: 'ps → lo' },
  { t: 'qcm', q: '___ orologio è rotto.', opts: ['Il', 'Lo', 'L’'], a: 2 },
  { t: 'qcm', q: 'Pluriel de « l’orologio » :', opts: ['i orologi', 'gli orologi', 'le orologi'], a: 1 },
  { t: 'fill', q: '___ yogurt è nel frigo.', a: 'Lo', why: 'y → lo' },
  { t: 'fill', q: '___ case di questa via sono vecchie.', a: 'Le' },
  { t: 'fill', q: '___ sport preferito di Marco è il calcio.', a: 'Lo' },
  { t: 'fill', q: '___ gnocchi sono buonissimi.', a: 'Gli', why: 'gn → lo / gli' },
  { t: 'vf', q: 'Le pluriel de « il libro » est « gli libri ».', a: false, why: 'i libri' }
]},

{ topic: 'articoli-ind', ue: 'UE1', title: 'Articles indéfinis', items: [
  { t: 'qcm', q: 'Vorrei ___ caffè.', opts: ['un', 'uno', 'una'], a: 0 },
  { t: 'qcm', q: 'C’è ___ studente alla porta.', opts: ['un', 'uno', 'un’'], a: 1 },
  { t: 'qcm', q: 'Ho ___ amica italiana.', opts: ['un', 'uno', 'un’'], a: 2, why: 'féminin + voyelle → un’' },
  { t: 'qcm', q: 'Marco è ___ amico di Luca.', opts: ['un', 'un’', 'uno'], a: 0, why: 'masculin : pas d’apostrophe' },
  { t: 'fill', q: 'Prendo ___ spremuta d’arancia.', a: 'una' },
  { t: 'fill', q: 'C’è ___ zaino sul tavolo.', a: 'uno' },
  { t: 'fill', q: 'Ho comprato ___ ombrello nuovo.', a: 'un' },
  { t: 'vf', q: 'On écrit « un’amico » pour un ami (garçon).', a: false, why: 'un amico — l’apostrophe est réservée au féminin' }
]},

{ topic: 'quanto', ue: 'UE1', title: 'Quanto / quanti / quanta / quante', items: [
  { t: 'qcm', q: '___ anni hai?', opts: ['Quanto', 'Quanti', 'Quante'], a: 1 },
  { t: 'qcm', q: '___ acqua bevi al giorno?', opts: ['Quanto', 'Quanta', 'Quante'], a: 1 },
  { t: 'qcm', q: '___ costano queste scarpe?', opts: ['Quanto', 'Quanti', 'Quante'], a: 0, why: 'adverbe → invariable' },
  { t: 'qcm', q: '___ volte alla settimana vai in palestra?', opts: ['Quanti', 'Quante', 'Quanto'], a: 1 },
  { t: 'fill', q: '___ pane compriamo?', a: 'Quanto' },
  { t: 'fill', q: '___ persone ci sono?', a: 'Quante' },
  { t: 'fill', q: '___ tempo ci vuole per arrivare?', a: 'Quanto' },
  { t: 'trad', fr: 'Combien de frères as-tu ?', a: 'Quanti fratelli hai?' }
]},

{ topic: 'lora', ue: 'UE1', title: 'Dire l’heure', items: [
  { t: 'qcm', q: '13h00 se dit :', opts: ['Sono le una.', 'È l’una.', 'È una.'], a: 1 },
  { t: 'qcm', q: '15h30 :', opts: ['Sono le tre e mezza.', 'È le tre e mezza.', 'Sono le tre e mezzo di.'], a: 0 },
  { t: 'qcm', q: '« À une heure » :', opts: ['a l’una', 'all’una', 'alle una'], a: 1 },
  { t: 'fill', q: '20h00 : Sono ___ otto.', a: 'le' },
  { t: 'fill', q: '12h00 : È ___.', a: 'mezzogiorno' },
  { t: 'fill', q: '« À huit heures et demie » : ___ otto e mezza.', a: 'alle' },
  { t: 'trad', fr: 'Quelle heure est-il ?', a: 'Che ore sono?', alts: ['Che ora è?'] },
  { t: 'trad', fr: 'Il est neuf heures moins le quart.', a: 'Sono le nove meno un quarto.' }
]},

{ topic: 'quale', ue: 'UE1', title: 'Qual / quale / quali', items: [
  { t: 'qcm', q: '___ è il tuo numero di telefono?', opts: ['Qual', 'Qual’', 'Quale'], a: 0, why: 'qual è : sans apostrophe' },
  { t: 'qcm', q: '___ lingue parli?', opts: ['Quale', 'Quali', 'Qual'], a: 1 },
  { t: 'qcm', q: '___ film preferisci, questo o quello?', opts: ['Quale', 'Quali', 'Qual'], a: 0 },
  { t: 'fill', q: '___ sono i tuoi hobby?', a: 'Quali' },
  { t: 'vf', q: 'On peut écrire « qual’è » avec une apostrophe.', a: false, why: 'C’est une troncation, jamais d’apostrophe' }
]},

{ topic: 'pron-indiretti', ue: 'UE1', title: 'Pronoms indirects', items: [
  { t: 'qcm', q: 'Telefono a Maria → ___ telefono.', opts: ['la', 'le', 'gli'], a: 1 },
  { t: 'qcm', q: 'Scrivo a Marco → ___ scrivo.', opts: ['lo', 'le', 'gli'], a: 2 },
  { t: 'qcm', q: 'Parlo ai miei genitori → ___ parlo.', opts: ['gli', 'li', 'le'], a: 0, why: 'gli remplace « a loro » en italien courant' },
  { t: 'qcm', q: 'Formel : « Signora, ___ porto il conto. »', opts: ['ti', 'Le', 'La'], a: 1 },
  { t: 'fill', q: 'Offro un caffè a Luca → ___ offro un caffè.', a: 'Gli' },
  { t: 'fill', q: 'Regalo dei fiori a mia madre → ___ regalo dei fiori.', a: 'Le' },
  { t: 'trad', fr: 'Je lui ai écrit un mail (à elle).', a: 'Le ho scritto una mail.', alts: ['Le ho scritto un’email.'] },
  { t: 'vf', q: '« A lui » est une forme tonique qui sert à insister.', a: true }
]},

{ topic: 'piacere', ue: 'UE1', title: 'Le verbe piacere', items: [
  { t: 'qcm', q: 'Mi ___ gli spaghetti.', opts: ['piace', 'piacciono', 'piaci'], a: 1 },
  { t: 'qcm', q: 'Mi ___ viaggiare.', opts: ['piace', 'piacciono'], a: 0, why: 'infinitif → toujours singulier' },
  { t: 'qcm', q: 'A Marco ___ la musica classica.', opts: ['piace', 'piacciono', 'piaci'], a: 0 },
  { t: 'qcm', q: 'Le passé : « Mi ___ il film. »', opts: ['ha piaciuto', 'è piaciuto', 'sono piaciuto'], a: 1 },
  { t: 'fill', q: 'Ti ___ le lasagne? (piacere)', a: 'piacciono' },
  { t: 'fill', q: 'Mi ___ piaciute molto le foto. (essere)', a: 'sono' },
  { t: 'qcm', q: '« Non mi piace il calcio. » → réaction d’accord :', opts: ['Anche a me.', 'Neanche a me.', 'A me sì.'], a: 1 },
  { t: 'trad', fr: 'Nous aimons voyager en train.', a: 'Ci piace viaggiare in treno.' },
  { t: 'trad', fr: 'Le film ne m’a pas plu.', a: 'Il film non mi è piaciuto.', alts: ['Non mi è piaciuto il film.'] }
]},

{ topic: 'prep-semplici', ue: 'UE2', title: 'Prépositions simples', items: [
  { t: 'qcm', q: 'Vivo ___ Italia.', opts: ['a', 'in', 'da'], a: 1 },
  { t: 'qcm', q: 'Abito ___ Roma.', opts: ['a', 'in', 'da'], a: 0 },
  { t: 'qcm', q: 'Vado ___ medico.', opts: ['al', 'dal', 'nel'], a: 1, why: 'DA + personne' },
  { t: 'qcm', q: 'Vado ___ farmacia.', opts: ['in', 'a', 'da'], a: 0 },
  { t: 'qcm', q: 'Parto ___ Milano domani.', opts: ['a', 'per', 'in'], a: 1 },
  { t: 'qcm', q: 'Studio italiano ___ due anni.', opts: ['per', 'da', 'in'], a: 1, why: 'DA = depuis' },
  { t: 'qcm', q: 'Viaggio ___ treno.', opts: ['in', 'a', 'con'], a: 0 },
  { t: 'fill', q: 'Il libro ___ Anna è sul tavolo. (possession)', a: 'di' },
  { t: 'fill', q: 'Vado a scuola ___ piedi.', a: 'a' },
  { t: 'fill', q: 'Il treno parte ___ due ore. (délai)', a: 'tra', alts: ['fra'] }
]},

{ topic: 'prep-articolate', ue: 'UE2', title: 'Prépositions articulées', items: [
  { t: 'fill', q: 'a + il = ___', a: 'al' },
  { t: 'fill', q: 'di + gli = ___', a: 'degli' },
  { t: 'fill', q: 'in + la = ___', a: 'nella' },
  { t: 'fill', q: 'su + i = ___', a: 'sui' },
  { t: 'fill', q: 'da + lo = ___', a: 'dallo' },
  { t: 'fill', q: 'in + gli = ___', a: 'negli' },
  { t: 'fill', q: 'di + l’ = ___', a: 'dell’', alts: ['dell\''] },
  { t: 'qcm', q: 'Il libro è ___ tavolo.', opts: ['sul', 'sullo', 'sui'], a: 0 },
  { t: 'qcm', q: 'Vado ___ stazione.', opts: ['al', 'alla', 'allo'], a: 1 },
  { t: 'qcm', q: 'Parliamo ___ esami di giugno.', opts: ['degli', 'dei', 'delle'], a: 0 },
  { t: 'qcm', q: 'Le chiavi sono ___ borsa.', opts: ['nella', 'nel', 'nelle'], a: 0 },
  { t: 'qcm', q: 'Compro ___ pane e ___ frutta.', opts: ['del / della', 'dello / delle', 'dei / delle'], a: 0 },
  { t: 'vf', q: '« con » fusionne obligatoirement avec l’article en italien standard.', a: false, why: 'con il treno (les formes col/coi sont familières)' }
]},

{ topic: 'modali', ue: 'UE2', title: 'Verbes modaux', items: [
  { t: 'fill', q: 'Io non (potere) ___ venire stasera.', a: 'posso' },
  { t: 'fill', q: 'Noi (dovere) ___ studiare di più.', a: 'dobbiamo' },
  { t: 'fill', q: 'Loro (volere) ___ andare al mare.', a: 'vogliono' },
  { t: 'fill', q: 'Tu (potere) ___ aiutarmi?', a: 'puoi' },
  { t: 'qcm', q: 'Passé : « Sono dovuto andare a casa. » L’auxiliaire est essere car…', opts: ['dovere prend toujours essere', 'andare prend essere', 'c’est une exception'], a: 1 },
  { t: 'qcm', q: 'Quelle phrase est correcte ?', opts: ['Devo di partire.', 'Devo partire.', 'Devo a partire.'], a: 1, why: 'Modal + infinitif direct' },
  { t: 'trad', fr: 'Puis-je entrer ?', a: 'Posso entrare?' },
  { t: 'trad', fr: 'Je dois lui parler.', a: 'Devo parlargli.', alts: ['Gli devo parlare.'] }
]},

{ topic: 'passato-prossimo', ue: 'UE2', title: 'Passato prossimo', items: [
  { t: 'fill', q: 'Ieri (io - mangiare) ___ una pizza.', a: 'ho mangiato' },
  { t: 'fill', q: 'Maria (andare) ___ al cinema.', a: 'è andata' },
  { t: 'fill', q: 'Noi (arrivare) ___ alle otto.', a: 'siamo arrivati', alts: ['siamo arrivate'] },
  { t: 'fill', q: 'Loro (vedere) ___ un bel film.', a: 'hanno visto' },
  { t: 'fill', q: 'Tu (fare) ___ i compiti?', a: 'hai fatto' },
  { t: 'fill', q: 'Le ragazze (partire) ___ ieri.', a: 'sono partite' },
  { t: 'qcm', q: 'Marco e Luca ___ tardi.', opts: ['sono arrivato', 'sono arrivati', 'hanno arrivati'], a: 1 },
  { t: 'qcm', q: 'Choisis : « Il film ___ alle nove. »', opts: ['ha cominciato', 'è cominciato'], a: 1, why: 'cominciare intransitif → essere' },
  { t: 'qcm', q: 'Choisis : « ___ il libro ieri sera. »', opts: ['Ho finito', 'Sono finito'], a: 0, why: 'finire transitif → avere' },
  { t: 'qcm', q: 'Participe de « scrivere » :', opts: ['scriveto', 'scritto', 'scrivuto'], a: 1 },
  { t: 'qcm', q: 'Participe de « chiedere » :', opts: ['chiesto', 'chieduto', 'chiedato'], a: 0 },
  { t: 'qcm', q: 'Participe de « rimanere » :', opts: ['rimanuto', 'rimasto', 'rimanito'], a: 1 },
  { t: 'trad', fr: 'Nous sommes allés à Rome.', a: 'Siamo andati a Roma.', alts: ['Siamo andate a Roma.'] },
  { t: 'trad', fr: 'Que s’est-il passé ?', a: 'Che cosa è successo?', alts: ['Che cos’è successo?', 'Cosa è successo?'] }
]},

{ topic: 'imperfetto', ue: 'UE2', title: 'Imperfetto', items: [
  { t: 'fill', q: 'Da bambino (io - giocare) ___ a calcio.', a: 'giocavo' },
  { t: 'fill', q: 'Quando (noi - abitare) ___ a Roma…', a: 'abitavamo' },
  { t: 'fill', q: '(essere) ___ tardi e pioveva.', a: 'Era', alts: ['era'] },
  { t: 'fill', q: 'Mio nonno (fare) ___ il medico.', a: 'faceva' },
  { t: 'fill', q: 'Loro (bere) ___ sempre il caffè dopo pranzo.', a: 'bevevano' },
  { t: 'fill', q: 'Che cosa (tu - dire) ___ ?', a: 'dicevi' },
  { t: 'qcm', q: 'Mentre ___ la TV, è suonato il telefono.', opts: ['ho guardato', 'guardavo', 'guarderò'], a: 1 },
  { t: 'qcm', q: 'Ieri ___ un incidente in centro.', opts: ['c’era', 'c’è stato', 'ci sarà'], a: 1, why: 'Événement ponctuel → passato prossimo' },
  { t: 'vf', q: 'L’imperfetto sert à décrire une habitude passée.', a: true },
  { t: 'trad', fr: 'Quand j’étais petit, j’allais souvent à la mer.', a: 'Quando ero piccolo, andavo spesso al mare.' }
]},

{ topic: 'congiuntivo', ue: 'UE2', title: 'Congiuntivo presente', items: [
  { t: 'fill', q: 'Penso che Marco (essere) ___ italiano.', a: 'sia' },
  { t: 'fill', q: 'Spero che tu (stare) ___ bene.', a: 'stia' },
  { t: 'fill', q: 'Credo che loro (avere) ___ ragione.', a: 'abbiano' },
  { t: 'fill', q: 'Bisogna che noi (fare) ___ presto.', a: 'facciamo' },
  { t: 'fill', q: 'Non credo che lui (potere) ___ venire.', a: 'possa' },
  { t: 'fill', q: 'Voglio che voi (parlare) ___ più lentamente.', a: 'parliate' },
  { t: 'qcm', q: 'Penso che loro ___ in ritardo.', opts: ['sono', 'siano', 'siate'], a: 1 },
  { t: 'qcm', q: 'Même sujet : « Penso ___ domani. »', opts: ['che parto', 'di partire', 'che parta'], a: 1, why: 'Même sujet → di + infinitif' },
  { t: 'vf', q: 'Au congiuntivo presente, les trois personnes du singulier ont la même forme.', a: true }
]},

{ topic: 'ci', ue: 'UE2', title: 'La particule CI', items: [
  { t: 'qcm', q: 'Vai a Roma? — Sì, ___ vado domani.', opts: ['ci', 'lo', 'ne'], a: 0 },
  { t: 'qcm', q: 'Conosci Milano? — Sì, ___ conosco bene.', opts: ['ci', 'la', 'ne'], a: 1, why: 'Pas de CI avec conoscere' },
  { t: 'qcm', q: 'Sai la risposta? — No, non ___ so.', opts: ['ci', 'lo', 'la'], a: 1, why: '« Non lo so » est figé' },
  { t: 'qcm', q: '___ sono molte persone in piazza.', opts: ['C’è', 'Ci sono', 'Ci ha'], a: 1 },
  { t: 'fill', q: 'In palestra ___ vado due volte alla settimana.', a: 'ci' },
  { t: 'fill', q: 'Non ___ credo! (crederci)', a: 'ci' },
  { t: 'vf', q: 'On dit « ci conosco Roma ».', a: false, why: 'On dit « la conosco »' }
]},

{ topic: 'dimostrativi', ue: 'UE2', title: 'Démonstratifs', items: [
  { t: 'qcm', q: '___ studente è bravo. (celui-là)', opts: ['Quel', 'Quello', 'Quegli'], a: 1 },
  { t: 'qcm', q: '___ occhi sono bellissimi. (ces…-là)', opts: ['Quei', 'Quegli', 'Quelle'], a: 1 },
  { t: 'qcm', q: '___ libro costa dieci euro. (ce…-là)', opts: ['Quel', 'Quello', 'Quell’'], a: 0 },
  { t: 'fill', q: '___ casa è la mia. (celle-ci)', a: 'Questa' },
  { t: 'fill', q: 'Prendo ___ , non quello. (celui-ci)', a: 'questo' },
  { t: 'vf', q: '« quello » suit la même règle que l’article défini.', a: true }
]},

{ topic: 'possessivi', ue: 'UE2', title: 'Possessifs', items: [
  { t: 'qcm', q: '___ padre lavora in banca.', opts: ['Il mio', 'Mio', 'Mia'], a: 1, why: 'Nom de famille au singulier : pas d’article' },
  { t: 'qcm', q: '___ genitori abitano a Napoli.', opts: ['Miei', 'I miei', 'Il mio'], a: 1, why: 'Pluriel → article' },
  { t: 'qcm', q: '___ fratello maggiore studia a Roma.', opts: ['Mio', 'Il mio', 'Miei'], a: 1, why: 'Nom modifié → article' },
  { t: 'qcm', q: 'Marco e ___ macchina nuova.', opts: ['il suo', 'la sua', 'le sue'], a: 1, why: 'Accord avec l’objet possédé' },
  { t: 'fill', q: '___ loro casa è grande. (leur)', a: 'La' },
  { t: 'fill', q: 'Di chi è questa borsa? — È ___ mia.', a: 'la' },
  { t: 'trad', fr: 'Ma sœur habite avec ses amis.', a: 'Mia sorella abita con i suoi amici.' }
]},

{ topic: 'comparativo', ue: 'UE2', title: 'Comparatif', items: [
  { t: 'qcm', q: 'Roma è più grande ___ Firenze.', opts: ['di', 'che', 'come'], a: 0 },
  { t: 'qcm', q: 'È più simpatico ___ intelligente.', opts: ['di', 'che'], a: 1, why: 'Deux adjectifs → che' },
  { t: 'qcm', q: 'Mi piace più leggere ___ scrivere.', opts: ['di', 'che'], a: 1, why: 'Deux verbes → che' },
  { t: 'qcm', q: 'Il treno è meno caro ___ aereo.', opts: ['di', 'dell’', 'che'], a: 1 },
  { t: 'qcm', q: 'Comparatif irrégulier de « buono » :', opts: ['più buono / migliore', 'più bene', 'meglio'], a: 0 },
  { t: 'fill', q: 'Superlatif absolu de « bello » : ___', a: 'bellissimo' },
  { t: 'fill', q: 'Anna canta ___ di me. (bene → comparatif)', a: 'meglio' },
  { t: 'trad', fr: 'L’avion est plus rapide que le train.', a: 'L’aereo è più veloce del treno.' }
]},

{ topic: 'mentre-durante', ue: 'UE2', title: 'Mentre / durante', items: [
  { t: 'qcm', q: '___ il viaggio ho letto un libro.', opts: ['Mentre', 'Durante'], a: 1 },
  { t: 'qcm', q: '___ studiavo, è arrivato Marco.', opts: ['Mentre', 'Durante'], a: 0 },
  { t: 'qcm', q: '___ la lezione non si parla.', opts: ['Mentre', 'Durante'], a: 1 },
  { t: 'fill', q: '___ aspettavo il treno, ho bevuto un caffè.', a: 'Mentre' },
  { t: 'vf', q: '« Durante » est suivi d’un verbe conjugué.', a: false, why: 'Durante + nom ; mentre + verbe' }
]},

{ topic: 'colori-gram', ue: 'UE2', title: 'Couleurs', items: [
  { t: 'qcm', q: 'Le scarpe ___ (bleu).', opts: ['blu', 'blue', 'blui'], a: 0, why: 'blu est invariable' },
  { t: 'qcm', q: 'Una camicia ___ (blanc).', opts: ['bianco', 'bianca', 'bianche'], a: 1 },
  { t: 'qcm', q: 'I pantaloni ___ (vert).', opts: ['verde', 'verdi', 'verda'], a: 1 },
  { t: 'qcm', q: 'Due gonne ___ (vert foncé).', opts: ['verdi scure', 'verde scuro', 'verdi scuri'], a: 1, why: 'Couleur composée → invariable' },
  { t: 'fill', q: 'Le magliette ___ (rose).', a: 'rosa' },
  { t: 'fill', q: 'I calzini ___ (noir).', a: 'neri' }
]},

{ topic: 'imperativo', ue: 'UE3', title: 'Impératif', items: [
  { t: 'fill', q: '(tu - parlare) ___ più lentamente!', a: 'Parla', alts: ['parla'] },
  { t: 'fill', q: '(tu - prendere) ___ la medicina!', a: 'Prendi', alts: ['prendi'] },
  { t: 'fill', q: '(Lei - scusare) Mi ___ !', a: 'scusi' },
  { t: 'fill', q: '(Lei - parlare) ___ più lentamente, per favore.', a: 'Parli', alts: ['parli'] },
  { t: 'fill', q: '(voi - finire) ___ i compiti!', a: 'Finite', alts: ['finite'] },
  { t: 'qcm', q: 'Impératif négatif (tu) de « fumare » :', opts: ['Non fumi!', 'Non fumare!', 'Non fuma!'], a: 1 },
  { t: 'qcm', q: '« Dis-moi ! » se dit :', opts: ['Dimmi!', 'Dicimi!', 'Dimi!'], a: 0, why: 'di’ + mi → dimmi (redoublement)' },
  { t: 'qcm', q: '« Donne-le-moi ! » :', opts: ['Damelo!', 'Dammelo!', 'Dammilo!'], a: 1 },
  { t: 'qcm', q: 'Formel : « Asseyez-vous. »', opts: ['Si accomodi.', 'Accomodati.', 'Ti accomodi.'], a: 0 },
  { t: 'qcm', q: 'Impératif (tu) de « essere » :', opts: ['sei', 'sii', 'sia'], a: 1 },
  { t: 'qcm', q: 'Impératif (tu) de « andare » :', opts: ['va’', 'vada', 'andi'], a: 0 },
  { t: 'trad', fr: 'Ne t’inquiète pas !', a: 'Non ti preoccupare!', alts: ['Non preoccuparti!'] },
  { t: 'trad', fr: 'Regarde-la !', a: 'Guardala!' }
]},

{ topic: 'pron-diretti', ue: 'UE3', title: 'Pronoms directs', items: [
  { t: 'qcm', q: 'Il libro? ___ leggo stasera.', opts: ['Lo', 'La', 'Ne'], a: 0 },
  { t: 'qcm', q: 'Le scarpe? ___ provo subito.', opts: ['Li', 'Le', 'Ne'], a: 1 },
  { t: 'qcm', q: 'I documenti? ___ ho dimenticati.', opts: ['Li', 'Le', 'Ne'], a: 0 },
  { t: 'qcm', q: 'La pizza? ___ ho mangiata tutta.', opts: ['Lo', 'L’', 'Ne'], a: 1 },
  { t: 'fill', q: 'Le mele? Le ho comprat___ tutte.', a: 'e', why: 'Accord avec le pronom direct « le »' },
  { t: 'fill', q: 'I libri? Li ho lett___ .', a: 'i' },
  { t: 'fill', q: 'Il caffè? L’ho bevut___ tutto.', a: 'o' },
  { t: 'qcm', q: 'Quelle phrase est correcte ?', opts: ['Li ho visto.', 'Li ho visti.', 'Li ho vista.'], a: 1 },
  { t: 'qcm', q: '« Je les ai tous mangés. » :', opts: ['Li ho mangiati tutti.', 'Ne ho mangiato tutto.', 'Li ho mangiato tutti.'], a: 0 },
  { t: 'trad', fr: 'Tu connais Maria ? — Oui, je la connais bien.', a: 'Conosci Maria? — Sì, la conosco bene.' }
]},

{ topic: 'ne', ue: 'UE3', title: 'La particule NE', items: [
  { t: 'qcm', q: 'Quanti caffè bevi? — ___ bevo due.', opts: ['Li', 'Ne', 'Lo'], a: 1 },
  { t: 'qcm', q: 'Compri le mele? — Sì, ___ compro un chilo.', opts: ['le', 'ne', 'la'], a: 1 },
  { t: 'qcm', q: 'Hai amici italiani? — ___ ho molti.', opts: ['Li', 'Ne', 'Ci'], a: 1 },
  { t: 'qcm', q: 'Le mele? Le ho comprate tutte. / Ne ho comprate tre. La différence :', opts: ['aucune', 'le = totalité, ne = partie', 'ne = totalité'], a: 1 },
  { t: 'fill', q: 'Ho usato solo due fogli → ___ ho usati solo due.', a: 'Ne', alts: ['ne'] },
  { t: 'fill', q: 'Ne ho mangiat___ tre. (le mele)', a: 'e' },
  { t: 'fill', q: 'Ne ho bevut___ un po’. (il vino)', a: 'o' },
  { t: 'qcm', q: 'Hai domande? — Non ___ ho ___ .', opts: ['ne / nessuna', 'le / nessuna', 'ne / niente'], a: 0 },
  { t: 'trad', fr: 'Qu’en penses-tu ?', a: 'Che ne pensi?', alts: ['Cosa ne pensi?'] }
]},

{ topic: 'quantita', ue: 'UE3', title: 'Molto / tanto / troppo / poco', items: [
  { t: 'fill', q: 'Ho ___ fame. (molto)', a: 'molta' },
  { t: 'fill', q: 'Ci sono ___ persone. (molto)', a: 'molte' },
  { t: 'fill', q: 'Ho mangiato ___ . (molto)', a: 'molto', why: 'Adverbe → invariable' },
  { t: 'fill', q: 'È ___ simpatica. (molto)', a: 'molto', why: 'Devant un adjectif → invariable' },
  { t: 'fill', q: 'Ho ___ amici. (poco)', a: 'pochi' },
  { t: 'fill', q: 'Bevi ___ caffè! (troppo)', a: 'troppo' },
  { t: 'fill', q: 'Ci sono ___ macchine. (troppo)', a: 'troppe' },
  { t: 'fill', q: 'Ho ___ tempo libero. (poco)', a: 'poco' },
  { t: 'qcm', q: 'Loro sono ___ gentili.', opts: ['molti', 'molto', 'molte'], a: 1, why: 'Devant adjectif → invariable' },
  { t: 'qcm', q: 'Abbiamo ___ cose da fare.', opts: ['tanto', 'tante', 'tanti'], a: 1 },
  { t: 'vf', q: '« Ho molto fame » est correct.', a: false, why: 'Ho MOLTA fame (fame est un nom féminin)' }
]},

{ topic: 'nessuno', ue: 'UE3', title: 'Nessuno et la négation', items: [
  { t: 'qcm', q: 'Non conosco ___ qui.', opts: ['nessuno', 'niente', 'nessun'], a: 0 },
  { t: 'qcm', q: 'Non ho ___ problema.', opts: ['nessuno', 'nessun', 'nessuna'], a: 1, why: 'Comme « un » : nessun problema' },
  { t: 'qcm', q: 'Non c’è ___ studente in classe.', opts: ['nessun', 'nessuno', 'nessuna'], a: 1, why: 'Comme « uno » : s+consonne' },
  { t: 'qcm', q: '___ mi ha chiamato.', opts: ['Non nessuno', 'Nessuno', 'Nessuno non'], a: 1, why: 'Avant le verbe → pas de « non »' },
  { t: 'fill', q: 'Non ho ___ idea. (nessuno)', a: 'nessuna' },
  { t: 'fill', q: 'Non vado ___ al cinema. (jamais)', a: 'mai' },
  { t: 'fill', q: 'Non bevo ___ caffè né tè. (ni… ni…)', a: 'né', why: 'La structure est « né… né… » — avec l’accent aigu.' },
  { t: 'vf', q: 'La double négation est obligatoire en italien quand le mot négatif suit le verbe.', a: true },
  { t: 'trad', fr: 'Je n’ai rien compris.', a: 'Non ho capito niente.', alts: ['Non ho capito nulla.'] }
]},

{ topic: 'stare-gerundio', ue: 'UE3', title: 'Stare + gerundio', items: [
  { t: 'fill', q: 'Io (mangiare) sto ___ .', a: 'mangiando' },
  { t: 'fill', q: 'Loro (parlare) stanno ___ .', a: 'parlando' },
  { t: 'fill', q: 'Tu (leggere) stai ___ ?', a: 'leggendo' },
  { t: 'fill', q: 'Lui (dormire) sta ___ .', a: 'dormendo' },
  { t: 'fill', q: 'Gérondif de « fare » : ___', a: 'facendo' },
  { t: 'fill', q: 'Gérondif de « bere » : ___', a: 'bevendo' },
  { t: 'fill', q: 'Gérondif de « dire » : ___', a: 'dicendo' },
  { t: 'qcm', q: 'Que fais-tu maintenant ? →', opts: ['Che cosa fai?', 'Che cosa stai facendo?', 'les deux'], a: 2 },
  { t: 'qcm', q: '« Demain je vais à Rome » se dit :', opts: ['Domani sto andando a Roma.', 'Domani vado a Roma.'], a: 1, why: 'Le gérondif ne s’emploie pas pour le futur' },
  { t: 'qcm', q: '« Je suis en train de le lire » :', opts: ['Lo sto leggendo.', 'Sto leggendolo.', 'les deux'], a: 2 }
]},

{ topic: 'bello', ue: 'UE3', title: 'L’adjectif bello', items: [
  { t: 'qcm', q: 'Un ___ libro.', opts: ['bel', 'bello', 'bell’'], a: 0 },
  { t: 'qcm', q: 'Un ___ studente.', opts: ['bel', 'bello', 'bell’'], a: 1 },
  { t: 'qcm', q: 'Dei ___ occhi.', opts: ['bei', 'begli', 'belli'], a: 1 },
  { t: 'qcm', q: 'Una ___ giornata.', opts: ['bella', 'bell’', 'bel'], a: 0 },
  { t: 'qcm', q: 'Un ___ albergo.', opts: ['bel', 'bello', 'bell’'], a: 2 },
  { t: 'fill', q: 'Dei ___ libri. (bello)', a: 'bei' },
  { t: 'fill', q: 'Questi fiori sono ___ . (bello, après le verbe)', a: 'belli' },
  { t: 'trad', fr: 'Quelle belle journée !', a: 'Che bella giornata!' }
]},

{ topic: 'volerci', ue: 'UE3', title: 'Volerci / metterci', items: [
  { t: 'qcm', q: '___ un’ora per arrivare.', opts: ['Ci vuole', 'Ci vogliono', 'Ci metto'], a: 0 },
  { t: 'qcm', q: '___ due ore di treno.', opts: ['Ci vuole', 'Ci vogliono'], a: 1 },
  { t: 'qcm', q: '(io) ___ venti minuti per andare al lavoro.', opts: ['Ci vuole', 'Ci metto', 'Ci mette'], a: 1 },
  { t: 'qcm', q: '___ pazienza!', opts: ['Ci vuole', 'Ci vogliono'], a: 0 },
  { t: 'fill', q: 'Per fare la torta ___ tre uova. (volerci)', a: 'ci vogliono' },
  { t: 'fill', q: 'Quanto tempo ___ tu per arrivare? (metterci)', a: 'ci metti' },
  { t: 'vf', q: '« Volerci » se conjugue à toutes les personnes.', a: false, why: 'Seulement 3e pers. sing. et pluriel' },
  { t: 'trad', fr: 'Il faut deux heures.', a: 'Ci vogliono due ore.' }
]},

{ topic: 'averci', ue: 'UE3', title: 'Averci — Ce l’ho', items: [
  { t: 'qcm', q: 'Hai la chiave? — Sì, ___ .', opts: ['ce l’ho', 'ci ho', 'l’ho ci'], a: 0 },
  { t: 'qcm', q: 'Hai i documenti? — Sì, ___ .', opts: ['ce l’ho', 'ce li ho', 'ce le ho'], a: 1 },
  { t: 'qcm', q: 'Hai le monete? — No, non ___ .', opts: ['ce l’ho', 'ce li ho', 'ce le ho'], a: 2 },
  { t: 'fill', q: 'Hai il biglietto? — No, non ___ ho.', a: 'ce l’', alts: ['ce l\''] },
  { t: 'vf', q: 'Au pluriel, on peut élider : « ce l’ho » pour « ce li ho ».', a: false, why: 'Pas d’élision au pluriel : ce li ho' }
]},

{ topic: 'pronomi-combinati', ue: 'UE3', title: 'Pronoms combinés', items: [
  { t: 'fill', q: 'mi + lo = ___', a: 'me lo' },
  { t: 'fill', q: 'ti + la = ___', a: 'te la' },
  { t: 'fill', q: 'gli + lo = ___', a: 'glielo' },
  { t: 'fill', q: 'le + le = ___', a: 'gliele' },
  { t: 'fill', q: 'ci + ne = ___', a: 'ce ne' },
  { t: 'fill', q: 'vi + li = ___', a: 've li' },
  { t: 'qcm', q: 'Mi presti la macchina? — Sì, ___ presto.', opts: ['te la', 'me la', 'ti la'], a: 0 },
  { t: 'qcm', q: 'Hai dato il libro a Marco? — Sì, ___ ho dato.', opts: ['gli lo', 'glielo', 'lo gli'], a: 1 },
  { t: 'qcm', q: 'Posso portarlo a lei? →', opts: ['Posso portarglielo.', 'Posso portare glielo.', 'Posso gli lo portare.'], a: 0, why: 'Le bloc de pronoms se soude à l’infinitif (<i>portarglielo</i>) ou se place avant le verbe conjugué (<i>Glielo posso portare</i>) — jamais entre les deux.' },
  { t: 'fill', q: 'Le foto? Te le ho mandat___ .', a: 'e' },
  { t: 'trad', fr: 'Donnez-m’en deux kilos.', a: 'Me ne dia due chili.' }
]},

{ topic: 'bisogna', ue: 'UE3', title: 'Bisogna / avere bisogno di', items: [
  { t: 'qcm', q: '___ studiare ogni giorno.', opts: ['Bisogna', 'Ho bisogno', 'Bisogno'], a: 0 },
  { t: 'qcm', q: 'Io ___ di aiuto.', opts: ['bisogna', 'ho bisogno', 'sono bisogno'], a: 1 },
  { t: 'qcm', q: 'Noi ___ di più tempo.', opts: ['abbiamo bisogno', 'bisogniamo', 'bisogna'], a: 0 },
  { t: 'fill', q: '___ prenotare in anticipo. (il faut)', a: 'Bisogna', alts: ['bisogna'] },
  { t: 'fill', q: 'Hai bisogno ___ qualcosa?', a: 'di' },
  { t: 'vf', q: '« Bisogna » se conjugue selon le sujet.', a: false, why: 'Il est invariable et impersonnel' },
  { t: 'trad', fr: 'Il faut savoir l’anglais.', a: 'Bisogna sapere l’inglese.' }
]},

{ topic: 'agg-da-inf', ue: 'UE3', title: 'Adjectif + DA + infinitif', items: [
  { t: 'fill', q: 'Questo testo è facile ___ capire.', a: 'da' },
  { t: 'fill', q: 'È utile ___ sapere.', a: 'da' },
  { t: 'qcm', q: '« Confortable à porter » :', opts: ['comodo a portare', 'comodo da portare', 'comodo di portare'], a: 1 },
  { t: 'qcm', q: 'Vuoi qualcosa ___ bere?', opts: ['a', 'da', 'di'], a: 1 },
  { t: 'trad', fr: 'C’est facile à nettoyer.', a: 'È facile da pulire.' }
]},

{ topic: 'che-relativo', ue: 'UE3', title: 'Le relatif CHE', items: [
  { t: 'fill', q: 'Il libro ___ mi hai dato è bellissimo.', a: 'che' },
  { t: 'fill', q: 'La città in ___ vivo è Roma.', a: 'cui' },
  { t: 'fill', q: 'L’amico con ___ studio è italiano.', a: 'cui' },
  { t: 'qcm', q: 'La ragazza ___ fa il corso è simpatica.', opts: ['che', 'cui', 'chi'], a: 0 },
  { t: 'qcm', q: 'Non capisco ___ dici.', opts: ['che', 'quello che', 'cui'], a: 1 },
  { t: 'vf', q: '« che » s’élide devant une voyelle : « ch’ho letto ».', a: false, why: 'CHE ne s’élide jamais' },
  { t: 'trad', fr: 'Le film que nous avons vu était ennuyeux.', a: 'Il film che abbiamo visto era noioso.' }
]},

{ topic: 'futuro-semplice', ue: 'UE3', title: 'Futuro semplice', items: [
  { t: 'fill', q: 'Domani (io - parlare) ___ con il capo.', a: 'parlerò' },
  { t: 'fill', q: 'L’anno prossimo (noi - andare) ___ in Italia.', a: 'andremo' },
  { t: 'fill', q: 'Tu (essere) ___ felice.', a: 'sarai' },
  { t: 'fill', q: 'Loro (avere) ___ molto lavoro.', a: 'avranno' },
  { t: 'fill', q: 'Io (pagare) ___ il conto.', a: 'pagherò', why: '-gare → pagherò' },
  { t: 'fill', q: 'Noi (mangiare) ___ al ristorante.', a: 'mangeremo', why: '-giare → mangeremo' },
  { t: 'fill', q: 'Lui (venire) ___ alle otto.', a: 'verrà' },
  { t: 'fill', q: 'Voi (fare) ___ un bel viaggio.', a: 'farete' },
  { t: 'fill', q: 'Io (volere) ___ un caffè.', a: 'vorrò' },
  { t: 'fill', q: 'Tu (vivere) ___ in una grande città.', a: 'vivrai' },
  { t: 'qcm', q: 'Futur de « potere » (io) :', opts: ['poterò', 'potrò', 'poterei'], a: 1 },
  { t: 'qcm', q: 'Futur de « rimanere » (io) :', opts: ['rimanerò', 'rimarrò', 'rimanirò'], a: 1 },
  { t: 'qcm', q: '« Che ore saranno? » exprime :', opts: ['une action future', 'une supposition', 'un ordre'], a: 1 },
  { t: 'trad', fr: 'Dans cinq ans je vivrai à Rome.', a: 'Tra cinque anni vivrò a Roma.', alts: ['Fra cinque anni vivrò a Roma.'] }
]},

{ topic: 'tra-fra', ue: 'UE3', title: 'Tra / fra + futur', items: [
  { t: 'qcm', q: 'Il treno parte ___ dieci minuti.', opts: ['in', 'tra', 'per'], a: 1 },
  { t: 'qcm', q: 'Ho fatto il lavoro ___ un’ora. (durée nécessaire)', opts: ['in', 'tra', 'fra'], a: 0 },
  { t: 'fill', q: '___ due mesi finirò gli studi.', a: 'Tra', alts: ['Fra', 'tra', 'fra'] },
  { t: 'vf', q: '« tra » et « fra » ont exactement le même sens.', a: true }
]},

{ topic: 'periodo-ipotetico', ue: 'UE3', title: 'Periodo ipotetico', items: [
  { t: 'fill', q: 'Se (piovere) ___ , resto a casa.', a: 'piove' },
  { t: 'fill', q: 'Se studi, (passare) ___ l’esame.', a: 'passerai' },
  { t: 'fill', q: 'Se domani (fare) ___ bel tempo, andremo al mare.', a: 'farà', alts: ['fa'] },
  { t: 'qcm', q: 'Complète : « Se avrete pazienza, ___ a realizzare i vostri progetti. »', opts: ['riuscite', 'riuscirete', 'riusciate'], a: 1 },
  { t: 'vf', q: 'En italien, on peut mettre le futur après « se ».', a: true, why: 'Contrairement au français' }
]},

{ topic: 'registro', ue: 'UE3', title: 'Registre formel / informel', items: [
  { t: 'qcm', q: 'Ouverture d’un mail formel :', opts: ['Ciao Marco,', 'Gentile Signor Rossi,', 'Caro Marco,'], a: 1 },
  { t: 'qcm', q: 'Clôture formelle :', opts: ['Un abbraccio,', 'Baci,', 'Cordiali saluti,'], a: 2 },
  { t: 'qcm', q: 'Version formelle de « Mi puoi aiutare? » :', opts: ['Mi potrebbe aiutare?', 'Mi puoi aiutare, per favore?', 'Aiutami!'], a: 0 },
  { t: 'qcm', q: '« In attesa di una Sua risposta » appartient au registre :', opts: ['informel', 'formel'], a: 1 },
  { t: 'fill', q: 'Formel : « ___ ringrazio anticipatamente. »', a: 'La' },
  { t: 'trad', fr: 'Dans l’attente de votre réponse, je vous remercie.', a: 'In attesa di una Sua risposta, La ringrazio.' }
]},

{ topic: 'prep-luoghi', ue: 'UE3', title: 'Prépositions et lieux', items: [
  { t: 'qcm', q: 'Vado ___ farmacia.', opts: ['in', 'alla', 'dalla'], a: 0 },
  { t: 'qcm', q: 'Vado ___ farmacista.', opts: ['in', 'al', 'dal'], a: 2 },
  { t: 'qcm', q: 'Vado ___ posta.', opts: ['in', 'alla', 'dalla'], a: 1 },
  { t: 'qcm', q: 'Vado ___ fruttivendolo.', opts: ['in', 'al', 'dal'], a: 2 },
  { t: 'qcm', q: 'Vado ___ mercato.', opts: ['in', 'al', 'dal'], a: 1 },
  { t: 'fill', q: 'Sono ___ palestra. (à la salle de sport)', a: 'in' },
  { t: 'fill', q: 'Vado ___ dentista.', a: 'dal' },
  { t: 'fill', q: 'Torno ___ casa. (chez moi)', a: 'a' }
]},

{ topic: 'accordo-disaccordo', ue: 'UE3', title: 'Accord / désaccord', items: [
  { t: 'qcm', q: '« Mi piace il jazz. » — accord :', opts: ['Anche a me.', 'Neanche a me.', 'Anch’io.'], a: 0 },
  { t: 'qcm', q: '« Non mi piace il jazz. » — accord :', opts: ['Anche a me.', 'Neanche a me.', 'A me sì.'], a: 1 },
  { t: 'qcm', q: '« Vado al cinema. » — accord :', opts: ['Anche a me.', 'Anch’io.', 'Neanch’io.'], a: 1 },
  { t: 'qcm', q: '« Non vado al cinema. » — désaccord :', opts: ['Io, invece, sì.', 'Neanch’io.', 'Anche a me.'], a: 0 },
  { t: 'fill', q: '« Non mi piacciono i film horror. » — « ___ a me. » (moi non plus)', a: 'Neanche', alts: ['Nemmeno', 'neanche', 'nemmeno'] },
  { t: 'vf', q: 'Après une phrase négative on peut répondre « anche a me ».', a: false, why: 'Il faut neanche / nemmeno' }
]},

{ topic: 'lessico-bar', ue: 'UE1', title: 'Communication au bar', items: [
  { t: 'qcm', q: 'Pour commander poliment :', opts: ['Voglio un caffè.', 'Vorrei un caffè, per favore.', 'Dammi un caffè.'], a: 1 },
  { t: 'qcm', q: '« C’est moi qui offre ! » :', opts: ['Offro io!', 'Io offrire!', 'Pago tu!'], a: 0 },
  { t: 'qcm', q: 'Un café avec une goutte de lait :', opts: ['un latte macchiato', 'un caffè macchiato', 'un cappuccino'], a: 1 },
  { t: 'qcm', q: 'Demander l’addition :', opts: ['Il conto, per favore.', 'Lo scontrino, prego.', 'Quanto costa il bar?'], a: 0 },
  { t: 'trad', fr: 'Je prends un cappuccino et un croissant.', a: 'Prendo un cappuccino e un cornetto.', alts: ['Prendo un cappuccino e una brioche.'] },
  { t: 'trad', fr: 'Je vous dois combien ?', a: 'Quanto Le devo?', alts: ['Quanto le devo?'] }
]},

{ topic: 'lessico-hotel', ue: 'UE1', title: 'À l’hôtel', items: [
  { t: 'qcm', q: 'Une chambre avec un grand lit :', opts: ['una camera doppia', 'una camera matrimoniale', 'una camera singola'], a: 1 },
  { t: 'qcm', q: '« Avez-vous des chambres libres ? » :', opts: ['Avete camere libere?', 'Ci sono camere gratis?', 'Avete stanze aperte?'], a: 0 },
  { t: 'trad', fr: 'Je voudrais réserver une chambre pour trois nuits.', a: 'Vorrei prenotare una camera per tre notti.' },
  { t: 'trad', fr: 'Le petit-déjeuner est inclus ?', a: 'La colazione è inclusa?' },
  { t: 'fill', q: 'Il prezzo è ___ 90 euro a notte.', a: 'di' }
]},

{ topic: 'lessico-salute', ue: 'UE3', title: 'Santé et corps', items: [
  { t: 'qcm', q: '« J’ai mal à la tête » :', opts: ['Ho male la testa.', 'Mi fa male la testa.', 'Mi fanno male la testa.'], a: 1 },
  { t: 'qcm', q: '« J’ai mal aux dents » :', opts: ['Mi fa male i denti.', 'Mi fanno male i denti.', 'Ho mal ai denti.'], a: 1 },
  { t: 'fill', q: 'Pluriel de « il braccio » : le ___', a: 'braccia' },
  { t: 'fill', q: 'Pluriel de « il dito » : le ___', a: 'dita' },
  { t: 'qcm', q: '« una volta ogni due mesi » signifie :', opts: ['deux fois par mois', 'une fois tous les deux mois', 'deux mois de suite'], a: 1 },
  { t: 'trad', fr: 'J’ai de la fièvre et mal à la gorge.', a: 'Ho la febbre e mal di gola.' }
]},

{ topic: 'lessico-viaggi', ue: 'UE3', title: 'Voyages', items: [
  { t: 'qcm', q: 'Louer une voiture :', opts: ['affittare una macchina', 'noleggiare una macchina', 'prendere una macchina'], a: 1 },
  { t: 'qcm', q: 'Louer un appartement :', opts: ['noleggiare un appartamento', 'affittare un appartamento'], a: 1 },
  { t: 'qcm', q: '« il binario » est :', opts: ['le wagon', 'le quai / la voie', 'le billet'], a: 1 },
  { t: 'qcm', q: '« Obliterare il biglietto » signifie :', opts: ['acheter le billet', 'composter le billet', 'annuler le billet'], a: 1 },
  { t: 'trad', fr: 'Le train est en retard.', a: 'Il treno è in ritardo.' },
  { t: 'trad', fr: 'L’avion est plus cher mais plus rapide.', a: 'L’aereo è più caro ma più veloce.' }
]},

{ topic: 'lessico-lavoro', ue: 'UE3', title: 'Vie et travail', items: [
  { t: 'qcm', q: '« lo stipendio » est :', opts: ['le stage', 'le salaire', 'le contrat'], a: 1 },
  { t: 'qcm', q: '« le ferie » sont :', opts: ['les fériés', 'les congés', 'les heures sup'], a: 1 },
  { t: 'qcm', q: '« il datore di lavoro » est :', opts: ['l’employeur', 'l’employé', 'le collègue'], a: 0 },
  { t: 'fill', q: 'Ci ___ un’ora per andare al lavoro. (metterci, io)', a: 'metto' },
  { t: 'trad', fr: 'Je travaille à temps plein.', a: 'Lavoro a tempo pieno.' }
]},

{ topic: 'lessico-ambiente', ue: 'UE3', title: 'Environnement', items: [
  { t: 'qcm', q: '« Il mare è ___ . » (pollué)', opts: ['inquinante', 'inquinato', 'inquinare'], a: 1 },
  { t: 'qcm', q: '« L’automobile è ___ . » (polluante)', opts: ['inquinante', 'inquinata', 'inquinamento'], a: 0 },
  { t: 'fill', q: '___ causa del riscaldamento globale…', a: 'A', alts: ['a'] },
  { t: 'qcm', q: '« la raccolta differenziata » est :', opts: ['la collecte de fonds', 'le tri sélectif', 'la déchetterie'], a: 1 },
  { t: 'trad', fr: 'Il faut agir tout de suite.', a: 'Bisogna agire subito.' }
]}

];
