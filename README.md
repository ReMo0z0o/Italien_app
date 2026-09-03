# Impariamo l’italiano 🇮🇹

Application web d’apprentissage de l’italien, construite **sur mesure à partir du programme
« Mes cours d’italien »** (UE1 → UE3). Tout le contenu du cours y est transformé en séries
courtes de 5 à 10 minutes.

Aucune installation, aucun compte, aucune connexion : il suffit d’ouvrir `index.html`.

---

## Ouvrir l’application

**Le plus simple** — double-cliquez sur `index.html`. L’application fonctionne entièrement
en local, y compris hors ligne.

**Avec un petit serveur** (utile pour tester sur un téléphone du même réseau) :

```bash
npm start           # http://localhost:8080
# ou
python3 -m http.server 8080
```

**En un seul fichier** — pour l’envoyer par mail, le poser sur une clé USB ou
l’emporter hors ligne :

```bash
npm run build       # → dist/impariamo.html
```

`dist/impariamo.html` contient l’application entière (contenu, styles, code) en un
seul document autonome de ~380 Ko, sans aucune ressource externe. Il passe la même
batterie de tests que la version en fichiers séparés.

---

## Ce que contient l’application

| Section | Ce qu’on y fait |
|---|---|
| **⏱ Session 10 min** | Un parcours guidé qui enchaîne flashcards → grammaire → conjugaison → jeu → traduction, avec bilan final. Durée réglable : 5, 10 ou 15 min, ciblable sur une UE. |
| **🗂 Flashcards** | Petites piles de 5 à 20 cartes tirées d’un thème. Retournement, auto-évaluation, prononciation, et **reprise automatique des cartes ratées**. Sens 🇮🇹→🇫🇷, 🇫🇷→🇮🇹 ou alterné. |
| **✏️ Exercices** | 386 exercices corrigés : QCM, textes à trous, vrai/faux, traductions. Correction expliquée, et renvoi vers la leçon quand on se trompe. |
| **🎮 Jeux** | *Abbinamento* (appariement chronométré), *Contro il tempo* (60 s), *L’impiccato* (pendu), *L’intruso*, *Rimetti in ordine* (remise en ordre de phrases), *Duello di coniugazione* (90 s). |
| **📖 Leçons** | Les 48 points de grammaire du programme, expliqués en français : règles, tableaux, exemples audio et pièges à éviter. |
| **🔤 Conjugaison** | 89 verbes à 6 temps (présent, passé composé, imparfait, futur, subjonctif, conditionnel) + impératif, participe, gérondif — et un mode entraînement. |
| **🔎 Lexique** | 709 entrées recherchables et filtrables par UE et par thème, avec prononciation. |
| **🗣 Dialogues** | 9 scènes complètes (bar, hôtel, médecin, magasin, poste, cinéma, travail, gare, futur), avec masquage du français ou de l’italien et **mode jeu de rôle**. Plus deux modèles d’e-mail (formel / informel). |
| **🗺 Programme** | L’arborescence exacte de votre document de cours, chaque point renvoyant vers leçon, cartes et exercices. |
| **🖨 Fiches à imprimer** | 9 générateurs de fiches A4 (voir ci-dessous). |

### Prononciation

Chaque bouton 🔊 lit le texte en italien via la synthèse vocale du navigateur
(voix `it-IT`). Le son se coupe avec le bouton 🔇 de la barre latérale.
Si aucune voix italienne n’est installée sur le système, l’application reste
parfaitement utilisable — seul l’audio est silencieux.

---

## Fiches à imprimer (et PDF)

Menu **🖨 Fiches à imprimer**. Chaque fiche se compose à la carte (on choisit les thèmes,
les verbes ou les leçons) et s’affiche en aperçu A4 avant impression.

| Fiche | Contenu |
|---|---|
| 📗 **Vocabulaire** | Un thème par page, en deux colonnes, avec les notes et les pièges. |
| 📝 **Test à trous** | La colonne des traductions est vide, à remplir au stylo — **avec le corrigé** en page suivante. |
| ✂️ **Cartes à découper** | 9 flashcards papier par page, bords en pointillés. |
| 🔤 **Tableaux de conjugaison** | Les verbes choisis, 5 temps + impératif par verbe. |
| 📘 **Aide-mémoire grammatical** | Les leçons choisies, mises en page pour le papier. |
| ✏️ **Feuille d’exercices** | Une série imprimée avec lignes d’écriture + corrigé en dernière page. |
| ⭐ **L’antisèche essentielle** | 2 pages : articles, prépositions articulées, pronoms, quantité, *bello*, terminaisons, futurs irréguliers, participes, auxiliaires. |
| 🗣 **Dialogues** | Texte complet avec traduction, pour lire et jouer à deux. |
| 🗺 **Programme à cocher** | Toute l’arborescence du cours avec cases « Vu / Su ». |

**Pour obtenir un PDF :** cliquez sur *Imprimer* (ou Ctrl/⌘ + P), puis choisissez
**« Enregistrer au format PDF »** comme destination. Activez « Graphiques d’arrière-plan »
pour conserver les trames grises des tableaux.

---

## Progression

Comme demandé, **aucune progression n’est requise pour utiliser l’application** : chaque
série est autonome, se termine en quelques minutes et se rejoue à volonté avec un tirage
différent.

Un petit historique local (les dernières séries et le taux de réussite) s’affiche sur
l’accueil s’il est disponible. Il vit uniquement dans le `localStorage` du navigateur,
n’est envoyé nulle part, et s’efface d’un clic. Si le navigateur le refuse
(navigation privée, stockage bloqué), l’application fonctionne exactement pareil.

---

## Structure du projet

```
index.html                  point d’entrée (aucun bundler, aucune dépendance)
assets/css/
  base.css                  design system : tokens, layout, thème clair/sombre
  components.css            cartes, flashcards, quiz, jeux, tableaux
  print.css                 mise en page A4 + règles @media print
assets/js/data/             ← tout le contenu pédagogique
  vocab.js                  30 thèmes / 709 entrées
  verbs.js                  moteur de conjugaison + 89 verbes
  grammar.js                48 leçons
  exercises.js              47 séries / 386 exercices
  phrases.js                9 dialogues, 2 modèles d’e-mail, 6 boîtes à outils
  program.js                arborescence du cours (74 points)
assets/js/core/             util (comparaison de réponses), speech, store, ui, router
assets/js/views/            une vue par section de l’application
tests/                      contrôle du contenu + tests navigateur
```

### Le moteur de conjugaison

`assets/js/data/verbs.js` ne stocke **que les irrégularités** : le reste est généré,
règles orthographiques comprises (`pagare → pagherò`, `cercare → cerchiamo`,
`mangiare → mangerò`), y compris le subjonctif des verbes en `-are` (`parli / parlino`)
et l’impératif des verbes réfléchis (`alzati / alziamoci / alzatevi / si alzi`).
Ajouter un verbe = ajouter une ligne.

### Ajouter du contenu

Tous les fichiers de `assets/js/data/` sont de simples tableaux JavaScript commentés.
Ajouter un mot, un exercice ou une leçon ne demande aucune compilation : on édite le
fichier, on recharge la page. `npm run test:data` vérifie ensuite que tout est cohérent
(liens du programme, bornes des QCM, formes verbales de référence…).

---

## Tests

```bash
npm install          # playwright, uniquement pour les tests
npm test             # contenu + 38 routes + 18 parcours utilisateur
```

* `npm run test:data` — 7 000+ contrôles sur le contenu : identifiants uniques, liens du
  programme, cohérence des exercices, formes verbales de référence, tolérance de la
  correction (accents, apostrophes, fautes de frappe).
* `npm run test:routes` — charge les 38 routes dans Chromium et échoue à la moindre
  erreur console.
* `npm run test:flows` — joue réellement chaque mode : une pile de flashcards jusqu’au
  bilan, une série d’exercices, les six jeux, une session complète de 5 minutes, le
  masquage des dialogues, les filtres du lexique, la génération des fiches, le thème
  sombre, et l’absence de débordement horizontal en 390 px de large.

---

## Compatibilité

Navigateurs récents (Chrome, Firefox, Safari, Edge), ordinateur comme mobile.
Thème clair / sombre / automatique. Aucune dépendance externe, aucune requête réseau.
