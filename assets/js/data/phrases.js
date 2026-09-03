/* =========================================================================
   DIALOGHI & COMUNICAZIONE — situations complètes
   ========================================================================= */
window.DATA = window.DATA || {};

window.DATA.dialogues = [
{
  id: 'dial-bar', ue: 'UE1', icon: '☕', title: 'Al bar', context: 'Deux amis entrent dans un bar. L’un veut offrir le café à l’autre.',
  lines: [
    { who: 'Barista', it: 'Buongiorno! Desidera?', fr: 'Bonjour ! Vous désirez ?' },
    { who: 'Luca', it: 'Buongiorno. Un caffè macchiato, per favore.', fr: 'Bonjour. Un café noisette, s’il vous plaît.' },
    { who: 'Barista', it: 'E per Lei, signora?', fr: 'Et pour vous, madame ?' },
    { who: 'Anna', it: 'Per me un cappuccino e un cornetto.', fr: 'Pour moi un cappuccino et un croissant.' },
    { who: 'Luca', it: 'Offro io!', fr: 'C’est moi qui offre !' },
    { who: 'Anna', it: 'No, dai, offro io questa volta!', fr: 'Non, allez, c’est moi qui offre cette fois !' },
    { who: 'Luca', it: 'Ma no, insisto. Tu hai pagato ieri.', fr: 'Mais non, j’insiste. Tu as payé hier.' },
    { who: 'Anna', it: 'E va bene, grazie! La prossima volta offro io.', fr: 'D’accord, merci ! La prochaine fois c’est moi.' },
    { who: 'Luca', it: 'Quanto le devo?', fr: 'Je vous dois combien ?' },
    { who: 'Barista', it: 'Sono quattro euro e cinquanta. Alla cassa, per favore.', fr: 'Cela fait 4,50 €. À la caisse, s’il vous plaît.' }
  ],
  useful: [
    { it: 'Offro io! / Offri tu?', fr: 'C’est moi qui offre ! / C’est toi qui offres ?' },
    { it: 'Ma dai, insisto!', fr: 'Allez, j’insiste !' },
    { it: 'Volentieri! / No, grazie, davvero.', fr: 'Volontiers ! / Non merci, vraiment.' },
    { it: 'Al banco o al tavolo?', fr: 'Au comptoir ou à table ?' }
  ]
},
{
  id: 'dial-hotel', ue: 'UE1', icon: '🏨', title: 'Prenotare una camera', context: 'Réservation téléphonique d’une chambre d’hôtel.',
  lines: [
    { who: 'Receptionist', it: 'Hotel Bellavista, buongiorno.', fr: 'Hôtel Bellavista, bonjour.' },
    { who: 'Cliente', it: 'Buongiorno, vorrei prenotare una camera.', fr: 'Bonjour, je voudrais réserver une chambre.' },
    { who: 'Receptionist', it: 'Certo. Per quante persone e per quante notti?', fr: 'Bien sûr. Pour combien de personnes et combien de nuits ?' },
    { who: 'Cliente', it: 'Per due persone, dal 3 al 7 aprile.', fr: 'Pour deux personnes, du 3 au 7 avril.' },
    { who: 'Receptionist', it: 'Matrimoniale o doppia?', fr: 'Lit double ou deux lits ?' },
    { who: 'Cliente', it: 'Matrimoniale, con bagno privato. Quanto costa a notte?', fr: 'Lit double, avec salle de bain. Combien par nuit ?' },
    { who: 'Receptionist', it: 'Novanta euro a notte, colazione inclusa.', fr: '90 euros la nuit, petit-déjeuner inclus.' },
    { who: 'Cliente', it: 'C’è il wi-fi? E il parcheggio?', fr: 'Y a-t-il le wifi ? Et le parking ?' },
    { who: 'Receptionist', it: 'Sì, il wi-fi è gratuito. Il parcheggio costa dieci euro al giorno.', fr: 'Oui, le wifi est gratuit. Le parking coûte 10 € par jour.' },
    { who: 'Cliente', it: 'Va bene, prenoto.', fr: 'D’accord, je réserve.' },
    { who: 'Receptionist', it: 'A che nome, scusi? E mi può dare un numero di telefono?', fr: 'À quel nom ? Et pouvez-vous me donner un numéro ?' },
    { who: 'Cliente', it: 'Rossi, Marco Rossi. Il mio numero è 06 555 4321.', fr: 'Rossi, Marco Rossi. Mon numéro est le 06 555 4321.' },
    { who: 'Receptionist', it: 'Perfetto. A che ora arriverà?', fr: 'Parfait. À quelle heure arriverez-vous ?' },
    { who: 'Cliente', it: 'Verso le sei di sera. Posso pagare con la carta?', fr: 'Vers 18h. Puis-je payer par carte ?' },
    { who: 'Receptionist', it: 'Certamente. La aspettiamo!', fr: 'Bien sûr. Nous vous attendons !' }
  ],
  useful: [
    { it: 'Avete camere libere per il weekend?', fr: 'Avez-vous des chambres libres pour le week-end ?' },
    { it: 'La colazione è inclusa?', fr: 'Le petit-déjeuner est-il inclus ?' },
    { it: 'A che ora è il check-out?', fr: 'À quelle heure est le départ ?' }
  ]
},
{
  id: 'dial-medico', ue: 'UE3', icon: '🩺', title: 'Dal medico', context: 'Consultation : décrire ses symptômes et recevoir des conseils.',
  lines: [
    { who: 'Medico', it: 'Buongiorno, si accomodi. Che cosa c’è che non va?', fr: 'Bonjour, installez-vous. Qu’est-ce qui ne va pas ?' },
    { who: 'Paziente', it: 'Da tre giorni mi fa male la gola e ho la febbre.', fr: 'Depuis trois jours j’ai mal à la gorge et de la fièvre.' },
    { who: 'Medico', it: 'Quanta febbre ha?', fr: 'Combien avez-vous de fièvre ?' },
    { who: 'Paziente', it: 'Ieri sera avevo trentotto e mezzo.', fr: 'Hier soir j’avais 38,5.' },
    { who: 'Medico', it: 'Ha anche la tosse? Le fanno male le orecchie?', fr: 'Avez-vous aussi de la toux ? Avez-vous mal aux oreilles ?' },
    { who: 'Paziente', it: 'Un po’ di tosse, sì. Le orecchie no.', fr: 'Un peu de toux, oui. Les oreilles non.' },
    { who: 'Medico', it: 'È solo un’influenza. Bisogna riposare e bere molta acqua.', fr: 'C’est juste une grippe. Il faut se reposer et boire beaucoup d’eau.' },
    { who: 'Paziente', it: 'Devo prendere qualcosa?', fr: 'Dois-je prendre quelque chose ?' },
    { who: 'Medico', it: 'Le faccio una ricetta. Prenda una pastiglia due volte al giorno.', fr: 'Je vous fais une ordonnance. Prenez un comprimé deux fois par jour.' },
    { who: 'Paziente', it: 'Per quanti giorni?', fr: 'Pendant combien de jours ?' },
    { who: 'Medico', it: 'Per cinque giorni. E non vada al lavoro fino a lunedì!', fr: 'Pendant cinq jours. Et n’allez pas au travail avant lundi !' },
    { who: 'Paziente', it: 'Grazie, dottore. Arrivederci.', fr: 'Merci, docteur. Au revoir.' }
  ],
  useful: [
    { it: 'Mi fa male… / Mi fanno male…', fr: 'J’ai mal à…' },
    { it: 'Non mi sento bene.', fr: 'Je ne me sens pas bien.' },
    { it: 'Ti consiglio di riposare.', fr: 'Je te conseille de te reposer.' },
    { it: 'Guarisci presto!', fr: 'Rétablis-toi vite !' }
  ]
},
{
  id: 'dial-negozio', ue: 'UE3', icon: '🛍️', title: 'In negozio — i saldi', context: 'Acheter un vêtement pendant les soldes.',
  lines: [
    { who: 'Commessa', it: 'Buongiorno, posso aiutarLa?', fr: 'Bonjour, puis-je vous aider ?' },
    { who: 'Cliente', it: 'Sì, grazie. Cerco una giacca leggera.', fr: 'Oui, merci. Je cherche une veste légère.' },
    { who: 'Commessa', it: 'Che taglia porta?', fr: 'Quelle taille faites-vous ?' },
    { who: 'Cliente', it: 'La media. Questa quanto costa?', fr: 'Du M. Celle-ci coûte combien ?' },
    { who: 'Commessa', it: 'Ottanta euro, ma è in saldo: sessanta.', fr: '80 euros, mais elle est en solde : 60.' },
    { who: 'Cliente', it: 'Posso provarla?', fr: 'Puis-je l’essayer ?' },
    { who: 'Commessa', it: 'Certo, il camerino è là in fondo.', fr: 'Bien sûr, la cabine est au fond.' },
    { who: 'Cliente', it: 'Mi sta un po’ stretta. Ne avete una più grande?', fr: 'Elle me serre un peu. En avez-vous une plus grande ?' },
    { who: 'Commessa', it: 'Gliela porto subito. La vuole anche in un altro colore?', fr: 'Je vous l’apporte tout de suite. La voulez-vous dans une autre couleur ?' },
    { who: 'Cliente', it: 'Ce l’ha in blu?', fr: 'L’avez-vous en bleu ?' },
    { who: 'Commessa', it: 'Sì, ce l’abbiamo. Ecco.', fr: 'Oui, nous l’avons. Voilà.' },
    { who: 'Cliente', it: 'Perfetta! La prendo. Posso pagare con la carta?', fr: 'Parfaite ! Je la prends. Puis-je payer par carte ?' },
    { who: 'Commessa', it: 'Certo. Ecco lo scontrino, grazie e arrivederci!', fr: 'Bien sûr. Voici le ticket, merci et au revoir !' }
  ],
  useful: [
    { it: 'Sto solo guardando, grazie.', fr: 'Je regarde seulement, merci.' },
    { it: 'Mi sta bene? — Ti sta benissimo!', fr: 'Ça me va ? — Ça te va très bien !' },
    { it: 'Avete una taglia più grande / più piccola?', fr: 'Avez-vous une taille au-dessus / en dessous ?' },
    { it: 'È in saldo? C’è uno sconto?', fr: 'C’est en solde ? Il y a une réduction ?' }
  ]
},
{
  id: 'dial-posta', ue: 'UE3', icon: '📮', title: 'Alla posta', context: 'Envoyer un colis et acheter des timbres.',
  lines: [
    { who: 'Impiegato', it: 'Numero 43, sportello due. Buongiorno, mi dica.', fr: 'Numéro 43, guichet 2. Bonjour, je vous écoute.' },
    { who: 'Cliente', it: 'Buongiorno, vorrei spedire questo pacco in Francia.', fr: 'Bonjour, je voudrais envoyer ce colis en France.' },
    { who: 'Impiegato', it: 'Raccomandata o posta ordinaria?', fr: 'Recommandé ou courrier ordinaire ?' },
    { who: 'Cliente', it: 'Raccomandata, per favore. Quanto ci vuole?', fr: 'Recommandé, s’il vous plaît. Combien de temps faut-il ?' },
    { who: 'Impiegato', it: 'Ci vogliono circa cinque giorni. Compili questo modulo e firmi qui.', fr: 'Il faut environ cinq jours. Remplissez ce formulaire et signez ici.' },
    { who: 'Cliente', it: 'Devo segnare anche il mio indirizzo?', fr: 'Dois-je noter aussi mon adresse ?' },
    { who: 'Impiegato', it: 'Sì, in alto a destra. Ecco il timbro.', fr: 'Oui, en haut à droite. Voici le tampon.' },
    { who: 'Cliente', it: 'Vorrei anche cinque francobolli per l’Italia.', fr: 'Je voudrais aussi cinq timbres pour l’Italie.' },
    { who: 'Impiegato', it: 'Eccoli. In tutto sono diciotto euro e venti.', fr: 'Les voici. En tout ça fait 18,20 €.' },
    { who: 'Cliente', it: 'Ecco a Lei. Mi dà lo scontrino?', fr: 'Voilà. Vous me donnez le reçu ?' },
    { who: 'Impiegato', it: 'Certo, ecco la ricevuta. Buona giornata!', fr: 'Bien sûr, voici le reçu. Bonne journée !' }
  ],
  useful: [
    { it: 'Vorrei spedire una raccomandata.', fr: 'Je voudrais envoyer un recommandé.' },
    { it: 'Deve compilare il modulo e firmare.', fr: 'Vous devez remplir le formulaire et signer.' },
    { it: 'Quanto ci vuole per arrivare?', fr: 'Combien de temps faut-il pour que ça arrive ?' }
  ]
},
{
  id: 'dial-cinema', ue: 'UE3', icon: '🎬', title: 'Parlare di un film', context: 'Deux amis parlent d’un film et organisent une sortie.',
  lines: [
    { who: 'Giulia', it: 'Hai visto « La grande bellezza »?', fr: 'Tu as vu « La grande bellezza » ?' },
    { who: 'Paolo', it: 'Sì, l’ho visto l’anno scorso. Ti è piaciuto?', fr: 'Oui, je l’ai vu l’année dernière. Il t’a plu ?' },
    { who: 'Giulia', it: 'Moltissimo! Le immagini di Roma sono bellissime.', fr: 'Énormément ! Les images de Rome sont magnifiques.' },
    { who: 'Paolo', it: 'A me, invece, è sembrato un po’ lento.', fr: 'Moi, en revanche, je l’ai trouvé un peu lent.' },
    { who: 'Giulia', it: 'Davvero? E « Basilicata Coast to Coast »?', fr: 'Vraiment ? Et « Basilicata Coast to Coast » ?' },
    { who: 'Paolo', it: 'Quello sì, mi è piaciuto molto: divertente e pieno di musica.', fr: 'Celui-là oui, il m’a beaucoup plu : drôle et plein de musique.' },
    { who: 'Giulia', it: 'Anche a me! Vai spesso al cinema?', fr: 'À moi aussi ! Tu vas souvent au cinéma ?' },
    { who: 'Paolo', it: 'Una volta al mese, più o meno. E tu?', fr: 'Une fois par mois environ. Et toi ?' },
    { who: 'Giulia', it: 'Io ci vado una volta ogni tre mesi. Andiamo insieme venerdì?', fr: 'Moi j’y vais une fois tous les trois mois. On y va ensemble vendredi ?' },
    { who: 'Paolo', it: 'Volentieri! Ci vediamo davanti al cinema alle otto.', fr: 'Volontiers ! On se retrouve devant le cinéma à 20h.' }
  ],
  useful: [
    { it: 'Ti è piaciuto? — Mi è piaciuto molto.', fr: 'Ça t’a plu ? — Ça m’a beaucoup plu.' },
    { it: 'È un film commovente / noioso / divertente.', fr: 'C’est un film émouvant / ennuyeux / drôle.' },
    { it: 'Te lo consiglio!', fr: 'Je te le conseille !' },
    { it: 'Ci vediamo alle otto davanti al cinema.', fr: 'On se voit à 20h devant le cinéma.' }
  ]
},
{
  id: 'dial-lavoro', ue: 'UE3', icon: '💼', title: 'Parlare del proprio lavoro', context: 'Décrire sa journée de travail et ses horaires.',
  lines: [
    { who: 'Elena', it: 'Che lavoro fai?', fr: 'Quel travail fais-tu ?' },
    { who: 'Marco', it: 'Faccio l’impiegato in una ditta di trasporti.', fr: 'Je suis employé dans une entreprise de transports.' },
    { who: 'Elena', it: 'Com’è la tua giornata lavorativa?', fr: 'Comment est ta journée de travail ?' },
    { who: 'Marco', it: 'Comincio alle nove e finisco alle sei, con un’ora di pausa pranzo.', fr: 'Je commence à 9h et je finis à 18h, avec une heure de pause déjeuner.' },
    { who: 'Elena', it: 'Ci metti molto per arrivare in ufficio?', fr: 'Tu mets longtemps pour aller au bureau ?' },
    { who: 'Marco', it: 'Ci metto un’ora: prendo il treno e poi la metro.', fr: 'Je mets une heure : je prends le train puis le métro.' },
    { who: 'Elena', it: 'E il tuo capo com’è?', fr: 'Et ton chef, comment est-il ?' },
    { who: 'Marco', it: 'È abbastanza simpatico, ma chiede troppo. Faccio molti straordinari.', fr: 'Il est assez sympa, mais il demande trop. Je fais beaucoup d’heures sup.' },
    { who: 'Elena', it: 'Lavoriamo per vivere o viviamo per lavorare?', fr: 'On travaille pour vivre ou on vit pour travailler ?' },
    { who: 'Marco', it: 'Bella domanda! Secondo me bisogna trovare un equilibrio.', fr: 'Bonne question ! Selon moi il faut trouver un équilibre.' }
  ],
  useful: [
    { it: 'Faccio il / la + métier', fr: 'Je suis + métier' },
    { it: 'Lavoro a tempo pieno / part-time.', fr: 'Je travaille à temps plein / partiel.' },
    { it: 'Ci metto un’ora per andare al lavoro.', fr: 'Je mets une heure pour aller au travail.' },
    { it: 'Il mio giorno di riposo è il lunedì.', fr: 'Mon jour de repos est le lundi.' }
  ]
},
{
  id: 'dial-viaggio', ue: 'UE3', icon: '🚆', title: 'Alla stazione', context: 'Acheter un billet et comparer train et avion.',
  lines: [
    { who: 'Viaggiatore', it: 'Buongiorno, un biglietto per Firenze, per favore.', fr: 'Bonjour, un billet pour Florence, s’il vous plaît.' },
    { who: 'Impiegata', it: 'Andata e ritorno?', fr: 'Aller-retour ?' },
    { who: 'Viaggiatore', it: 'Solo andata. C’è un treno diretto?', fr: 'Aller simple. Y a-t-il un train direct ?' },
    { who: 'Impiegata', it: 'Sì, parte alle 14:35 dal binario 7.', fr: 'Oui, il part à 14h35 du quai 7.' },
    { who: 'Viaggiatore', it: 'Quanto ci vuole?', fr: 'Combien de temps faut-il ?' },
    { who: 'Impiegata', it: 'Ci vogliono circa due ore. Ci sono anche la carrozza-bar e il wi-fi.', fr: 'Il faut environ deux heures. Il y a aussi le wagon-bar et le wifi.' },
    { who: 'Viaggiatore', it: 'Perfetto. Devo obliterare il biglietto?', fr: 'Parfait. Dois-je composter le billet ?' },
    { who: 'Impiegata', it: 'No, questo è elettronico. Buon viaggio!', fr: 'Non, celui-ci est électronique. Bon voyage !' },
    { who: 'Amico', it: 'Perché non prendi l’aereo?', fr: 'Pourquoi ne prends-tu pas l’avion ?' },
    { who: 'Viaggiatore', it: 'Il treno è più comodo dell’aereo: niente attesa, niente imbarco.', fr: 'Le train est plus confortable que l’avion : pas d’attente, pas d’embarquement.' },
    { who: 'Amico', it: 'Ma l’aereo è più veloce!', fr: 'Mais l’avion est plus rapide !' },
    { who: 'Viaggiatore', it: 'Sì, però è anche più inquinante e spesso più caro.', fr: 'Oui, mais il est aussi plus polluant et souvent plus cher.' }
  ],
  useful: [
    { it: 'A che ora parte / arriva?', fr: 'À quelle heure part / arrive-t-il ?' },
    { it: 'Da quale binario parte?', fr: 'De quel quai part-il ?' },
    { it: 'Il vantaggio è… lo svantaggio è…', fr: 'L’avantage est… l’inconvénient est…' }
  ]
},
{
  id: 'dial-futuro', ue: 'UE3', icon: '🔮', title: 'Come ti immagini tra 5 anni?', context: 'Parler de ses projets et faire des prévisions.',
  lines: [
    { who: 'Sara', it: 'Come ti immagini tra cinque anni?', fr: 'Comment t’imagines-tu dans cinq ans ?' },
    { who: 'Davide', it: 'Penso che vivrò in un’altra città, forse all’estero.', fr: 'Je pense que je vivrai dans une autre ville, peut-être à l’étranger.' },
    { who: 'Sara', it: 'E che lavoro farai?', fr: 'Et quel travail feras-tu ?' },
    { who: 'Davide', it: 'Spero di lavorare nel turismo. Studierò ancora due lingue.', fr: 'J’espère travailler dans le tourisme. J’étudierai encore deux langues.' },
    { who: 'Sara', it: 'Bello! Io invece resterò qui, ma cambierò casa.', fr: 'Super ! Moi je resterai ici, mais je changerai de maison.' },
    { who: 'Davide', it: 'Avrai una famiglia?', fr: 'Tu auras une famille ?' },
    { who: 'Sara', it: 'Chissà! Se avrò tempo e soldi, farò anche un lungo viaggio.', fr: 'Qui sait ! Si j’ai le temps et l’argent, je ferai aussi un long voyage.' },
    { who: 'Davide', it: 'Di che segno sei? Vediamo l’oroscopo!', fr: 'Tu es de quel signe ? Regardons l’horoscope !' },
    { who: 'Sara', it: 'Sono del Leone. Dice che sarà un anno fortunato.', fr: 'Je suis Lion. Il dit que ce sera une année de chance.' },
    { who: 'Davide', it: 'Se avrete pazienza, riuscirete a realizzare i vostri progetti!', fr: 'Si vous avez de la patience, vous réussirez à réaliser vos projets !' }
  ],
  useful: [
    { it: 'Ho intenzione di… / Penso di… / Spero di…', fr: 'J’ai l’intention de… / Je pense… / J’espère…' },
    { it: 'Tra due mesi… / Fra cinque anni…', fr: 'Dans deux mois… / Dans cinq ans…' },
    { it: 'Se… , allora…', fr: 'Si… , alors…' }
  ]
}
];

/* --------- Modèles d'e-mails ------------------------------------------- */
window.DATA.emails = [
  {
    id: 'mail-informale', type: 'Informale', icon: '✉️', title: 'E-mail à un ami',
    subject: 'Oggetto: Weekend a Bologna!',
    body: [
      'Ciao Giulia,',
      '',
      'come stai? Spero tutto bene!',
      'Ti scrivo perché il mese prossimo vengo a Bologna per lavoro e mi piacerebbe vederti.',
      'Arrivo venerdì 14 e resto fino a domenica. Che ne dici di una cena sabato sera?',
      'Fammi sapere se sei libera.',
      '',
      'Un abbraccio,',
      'Marco'
    ],
    notes: [
      'Formule d’appel : <b>Ciao / Caro / Cara</b> + prénom, virgule, puis minuscule à la ligne suivante.',
      'Registre : tutoiement, phrases courtes, expressions familières (<i>che ne dici di…</i>, <i>fammi sapere</i>).',
      'Clôture : <i>Un abbraccio, A presto, Baci, Un caro saluto</i>.'
    ]
  },
  {
    id: 'mail-formale', type: 'Formale', icon: '📧', title: 'E-mail formel (demande d’information)',
    subject: 'Oggetto: Richiesta di informazioni — corso di italiano',
    body: [
      'Gentile Dottoressa Bianchi,',
      '',
      'Le scrivo in merito al corso di italiano per stranieri organizzato dal Vostro istituto.',
      'Vorrei cortesemente sapere quali sono le date di inizio dei corsi, il costo dell’iscrizione e se è previsto un test di livello.',
      'In allegato trova il mio curriculum.',
      '',
      'In attesa di una Sua gentile risposta, La ringrazio anticipatamente.',
      '',
      'Cordiali saluti,',
      'Marco Rossi'
    ],
    notes: [
      'Formule d’appel : <b>Gentile / Egregio</b> + titre + nom. Jamais « Ciao ».',
      'Vouvoiement <b>Lei</b> avec majuscules de politesse : <i>Le scrivo, una Sua risposta, La ringrazio</i>.',
      'Conditionnel de politesse : <i>vorrei, potrebbe, sarebbe possibile</i>.',
      'Clôture : <i>Cordiali saluti / Distinti saluti</i> + prénom NOM.'
    ]
  }
];

/* --------- Boîtes à outils communicatives ------------------------------ */
window.DATA.kits = [
  { id: 'kit-bar', icon: '☕', title: 'Commander, offrir, refuser, insister', ue: 'UE1', items: [
    { it: 'Vorrei… / Per me…', fr: 'Je voudrais… / Pour moi…' },
    { it: 'Prendo un…', fr: 'Je prends un…' },
    { it: 'Offro io! / Offri tu?', fr: 'C’est moi qui offre !' },
    { it: 'Volentieri! / Con piacere!', fr: 'Volontiers !' },
    { it: 'No, grazie, davvero.', fr: 'Non merci, vraiment.' },
    { it: 'Ma dai, insisto!', fr: 'Allez, j’insiste !' },
    { it: 'La prossima volta offro io.', fr: 'La prochaine fois c’est moi.' }
  ]},
  { id: 'kit-racconto', icon: '📖', title: 'Raconter un événement', ue: 'UE2', items: [
    { it: 'Sai che cosa è successo?', fr: 'Tu sais ce qui s’est passé ?' },
    { it: 'Allora, ieri sera…', fr: 'Alors, hier soir…' },
    { it: 'Prima… poi… dopo…', fr: 'D’abord… ensuite… après…' },
    { it: 'A un certo punto…', fr: 'À un moment donné…' },
    { it: 'All’improvviso…', fr: 'Soudain…' },
    { it: 'Alla fine…', fr: 'Finalement…' },
    { it: 'Davvero?! Ma dai! Che peccato!', fr: 'Vraiment ?! Allez ! Quel dommage !' }
  ]},
  { id: 'kit-opinione', icon: '💬', title: 'Donner son avis', ue: 'UE3', items: [
    { it: 'Secondo me… / Per me…', fr: 'Selon moi…' },
    { it: 'Penso che + congiuntivo', fr: 'Je pense que…' },
    { it: 'Sono d’accordo. / Non sono d’accordo.', fr: 'Je suis / ne suis pas d’accord.' },
    { it: 'Hai ragione. / Hai torto.', fr: 'Tu as raison / tort.' },
    { it: 'Anche a me. / Neanche a me.', fr: 'Moi aussi. / Moi non plus.' },
    { it: 'A me, invece, sì / no.', fr: 'Moi, en revanche, oui / non.' },
    { it: 'Dipende. / Non saprei.', fr: 'Ça dépend. / Je ne saurais dire.' }
  ]},
  { id: 'kit-consigli', icon: '💡', title: 'Donner un conseil', ue: 'UE3', items: [
    { it: 'Ti consiglio di + infinito', fr: 'Je te conseille de…' },
    { it: 'Dovresti + infinito', fr: 'Tu devrais…' },
    { it: 'Bisogna + infinito', fr: 'Il faut…' },
    { it: 'Perché non provi a…?', fr: 'Pourquoi n’essaies-tu pas de… ?' },
    { it: 'Se fossi in te…', fr: 'Si j’étais toi…' },
    { it: 'Riposati! Bevi molta acqua!', fr: 'Repose-toi ! Bois beaucoup d’eau !' }
  ]},
  { id: 'kit-confronto', icon: '⚖️', title: 'Comparer', ue: 'UE2', items: [
    { it: 'più… di / meno… di', fr: 'plus… que / moins… que' },
    { it: 'così… come / tanto… quanto', fr: 'aussi… que' },
    { it: 'Il vantaggio è che…', fr: 'L’avantage est que…' },
    { it: 'Lo svantaggio è che…', fr: 'L’inconvénient est que…' },
    { it: 'Da un lato… dall’altro…', fr: 'D’un côté… de l’autre…' },
    { it: 'Preferisco X a Y.', fr: 'Je préfère X à Y.' }
  ]},
  { id: 'kit-telefono', icon: '📞', title: 'Au téléphone', ue: 'UE1', items: [
    { it: 'Pronto?', fr: 'Allô ?' },
    { it: 'Sono Marco. / Chi parla?', fr: 'C’est Marco. / Qui est à l’appareil ?' },
    { it: 'Posso parlare con…?', fr: 'Puis-je parler à… ?' },
    { it: 'Un attimo, glielo passo.', fr: 'Un instant, je vous le passe.' },
    { it: 'Non c’è, vuole lasciare un messaggio?', fr: 'Il/Elle n’est pas là, voulez-vous laisser un message ?' },
    { it: 'Richiamo più tardi.', fr: 'Je rappelle plus tard.' }
  ]}
];
