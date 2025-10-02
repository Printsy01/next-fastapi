# Description

Ceci est une simple application qui gère une liste avec une possibilité de rechercher selon le titre et résumé de celle-ci, et propose un petit service de chatbot.
Arrivé sur la page à l’URL `/articles`, on aura :

- La liste des articles
- Un menu pour filtrer et rechercher dans la liste
- Une icône message à côté : ouvre une sidebar pour une discussion avec le chatbot

---

# Prérequis

Avant de pouvoir lancer cette application, assurez-vous d’avoir installé :

- [Node.js](https://nodejs.org)
- [Python](https://www.python.org)
- [Git](https://git-scm.com)

---

# Installation

Cloner le projet :

```bash
git clone https://github.com/Printsy01/next-fastapi.git
```

Entrer dans le dossier

```bash
cd next-fastapi
```

## Installation Next.js (frontend)

```bash
cd frontend
npm install
```

Génerer le client prisma

```bash
npx prisma generate
```

## Installation FastAPI (backend chatbot)

```bash
cd ../python-service
python -m venv venv
```

### Sur Windows :

```bash
venv\Scripts\activate
```

### Sur macOS/Linux :

```bash
source venv/bin/activate
```

Puis installer les dépendances :

```bash
pip install -r requirements.txt
```

---

# Variables d’environnement

Créer un fichier `.env.local` dans chaque projet (`/frontend/.env.local` et `/python-service/.env.local`) et y ajouter les variables nécessaires :

### Pour Next.js

```env
DATABASE_URL="file:./seed.db"
API_URL="http://localhost:3000"
FASTAPI_URL="http://localhost:8001"
```

### Pour FastAPI

```env
ALLOWED_ORIGINS="http://localhost:3000"
```

---

# Lancement

### Next.js (dans `/frontend`)

```bash
npm run dev
```

### FastAPI (dans `/python-service`)

```bash
uvicorn main:app --reload --port 8001
```

---

# Choix techniques

- **Frontend** : React, Tailwind CSS, Zod
- **Backend principal** : Next.js (API Routes)
- **Backend chatbot** : FastAPI, Pydantic
- **Base de données** : SQLite
- **ORM** : Prisma

---

# Organisation du code

## Next.js

```
app/
  ├── api/
  │    └── articles/
  │         └── route.ts        # Endpoints REST pour les articles
  ├── articles/
  │    └── page.tsx             # Page principale de liste des articles
  ├── components/               # Composants React réutilisables
  ├── environnement/
  │    └── api.ts               # Chargement des variables d'environnement
  ├── hooks/
  │    ├── useFetch.ts          # Hook pour les appels API
  │    ├── useDebounce.ts       # Hook pour retarder les appels API
  │    └── useChatBot.ts        # Hook pour l'appel API du chatbot
  ├── types/
  │    └── index.d.ts           # Types globaux
  ├── layout.tsx                # Layout principal
  └── page.tsx                  # Page d'accueil

prisma/
  ├── schema.prisma             # Schéma de la base
  ├── seed.db                   # Données
  └── seed.ts                   # Script pour peupler la base
```

## FastAPI

```
main.py          # Application principale (route /chat)
dto.py           # Modèles pour les requêtes
utils.py         # Fonctions utilitaires
faq.json         # Données de base du chatbot
logs/            # Fichiers de log question/réponse
requirements.txt # Dépendances
```

---

# Limites éventuelles

### FastAPI

Pour le chatbot, une propriété `keywords` est ajoutée dans le fichier `faq.json` :

```json
{
  "id": "faq#ebitda",
  "q": "Qu’est-ce que l’EBITDA ?",
  "a": "L’EBITDA est un indicateur de performance opérationnelle avant intérêts, impôts, dépréciations et amortissements.",
  "keywords": ["ebitda", "résultat opérationnel", "indicateur", "profitabilité"]
}
```

Le service compare chaque mot du message utilisateur avec les mots-clés et retourne la réponse avec le plus de correspondances.
Limite : si la question est reformulée sans utiliser les mots-clés, le chatbot peut échouer.

### Next.js

La liste n’a pas de pagination. Avec de grandes quantités de données, cela peut nuire à l’expérience utilisateur. Une pagination serait une amélioration importante.

---
