# Description

Ceci est une simple application qui gère une liste avec une possibilité de rechercher selon le titre et résumé de celle-ci, et propose une petite service de chatbot
Arrivé sur la page à l'url /articles, on aura:

- La liste des articles
- Un menu pour filtrer et rechercher dans la liste
- Une icone message à coté: ouvre une sidebar pour une discussion avec le chatbot

# Prérequis

Avant de pouvoir lancer cette application assurez-vous d'avoir installé:

- Node.js
- Python
- Git

# Installation:

- git clone https://github.com/Printsy01/next-fastapi.git

Pour Next.js:

- cd frontend
- npm install

Pour FastAPI:

- cd python-service
- python -m venv venv

# Sur Windows:

    - venv\Scripts\activate

# Sur macOS/Linux:

    - source venv/bin/activate

- pip install -r requirements.txt

# Mise en place variable d'environnement

- .env.local à la racine de chaque projet /frontend/.env.local et /python-service/.env.local
  Les variables nécessaires

- Pour Next.js:
  DATABASE_URL="file:./seed.db"
  API_URL="http://localhost:3000"
  FASTAPI_URL="http://localhost:8000"

- Pour FastAPI:
  ALLOWED_ORIGINS="http://localhost:3000"

# Lancement

Pour Next.js:
Dans le dossier /frontend

- npm run dev

Pour FastAPI:
Dans le dossier /python-service

- uvicorn main:app --reload --port 8000

# Choix technique

frontend: react tailwind css zod
backend principal: next.js API Routes
backend chatbot: fastapi pydantic
base de données: sqlite
orm: prisma

# Organisation du code

- Next.js:
  app/
  ---api/ # API Routes Next.js
  -------articles/ # Endpoints REST pour les articles
  ------------route.ts # Gestion des requêtes HTTP
  ---articles/
  ------------page.tsx # Page principale de liste des articles
  ---components/ # Composants React réutilisables
  ---environnement/
  -----------------api.ts # Chargement des variables d'environnement
  ---hooks/ # Custom React Hooks
  ---------useFetch.ts # Hook pour les appels API
  ---------useDebounce.ts # Hook pour retarder les appels API (recherche)
  ---------useChatBot.ts # Hook pour l'appel API du chatbot
  ---types/
  ---------index.d.ts # Types globaux
  ---layout.tsx # Layout principal de l'application
  ---page.tsx # Page d'accueil

  prisma/
  ---schema.prisma # Schéma de la base de données
  ---seed.db # Données pour la base
  ---seed.ts # Script pour peupler la base de données

  - FastAPI:
    main.py # Application principale et API qui écoute "/chat"
    dto.py # Modèles pour le body provenant du client
    utils.py # Fonctions utilitaires (normalize, etc.)
    faq.json # Données de base de l'IA
    logs/ # Contient un fichier de log à chaque question-réponse du chatbot
    requirements.txt # Dépendances à installer

# Limites éventuelles:

- FastAPI
  Pour la partie chatbot, j'ai ajouté une propriété keywords alors voici a quoi ressmble faq:
  {
  "id": "faq#ebitda",
  "q": "Qu’est-ce que l’EBITDA ?",
  "a": "L’EBITDA est un indicateur de performance opérationnelle avant intérêts, impôts, dépréciations et amortissements.",
  "keywords": ["ebitda","résultat opérationnel","indicateur","profitabilité"]
  }

Quand le service reçoit un message, ce message sera splitted c-a-d séparé par mot
Chaque mot sera comparé avec chaque mot-clé pour voir une correspondance, et à la fin, la réponse avec beaucoup de correspondance sera retourné. Ceci peut être une limite si la question est reformulée d'une toute autre façon sans inclure les mots clés

- Next.js
  Afficher une liste sans pagination pourrait être une vraie limite quand il y aura de vrai données qui peut être des tonnes et des tonnes. La mise en place d'une pagination serait une très grande amélioration surtout pour l'expérience utilisateur
