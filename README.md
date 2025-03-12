# Website Backend

![Node.js](https://img.shields.io/badge/Node.js-22.14-green) 
![TypeScript](https://img.shields.io/badge/TypeScript-✓-blue)
![Express](https://img.shields.io/badge/Express.js-✓-black)
![MongoDB](https://img.shields.io/badge/MongoDB-✓-green)

Backend du projet **Website-Backend** développé en **Node.js** avec **TypeScript**, utilisant **Express.js** et **MongoDB**.

## 📌 Fonctionnalités

- 📌 **Authentification JWT**
- 🛒 **Gestion des commandes**
- 📝 **Documentation API Swagger**
- 🔐 **Middleware d’authentification**
- 📦 **Modèles Mongoose pour MongoDB**
- ⚡ **Architecture modulaire (Routes, Controllers, Services, Models)**

---

## 🚀 Installation

### 1️⃣ Cloner le repo
```sh
git clone https://github.com/usine-du-futur-enceinte/Website-Backend.git
cd Website-Backend
```

### 2️⃣ Installer les dépendances
```sh
npm install
```

### 3️⃣ Configurer les variables d’environnement
Créer un fichier `.env` à la racine du projet et ajouter les variables d’environnement suivantes :
```env
PORT=3000
MONGO_URI=mongodb+srv://[DB_USERNAME]:[DB_PASSWORD]@usinedufutur.ltjag.mongodb.net/
JWT_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
```

### 4️⃣ Démarrer le serveur
En mode développement :
```sh
npm run dev
```

En mode production :
```sh
npm start
```

## 🔬 Tests

### 1️⃣ Configurer les variables d’environnement de test
Créer un fichier `.env.test` à la racine du projet et ajouter les variables d’environnement suivantes :
```env
NODE_ENV=test
PORT=3030
MONGO_URI=mongodb+srv://[DB_USERNAME]:[DB_PASSWORD]@usinedufutur.ltjag.mongodb.net/
```

### 2️⃣ Lancer les tests
```sh
npm test
```

### 3️⃣ Générer un rapport de couverture
```sh
npm run test:coverage
```

## 🛠️ Structure du projet
```
Website-Backend/
│── 📂 src
 ├── 📂 config/         # Configuration (Swagger, DB)
 ├── 📂 controllers/    # Logique métier des routes
 ├── 📂 middlewares/    # Middleware d'authentification JWT
 ├── 📂 models/         # Schémas Mongoose (Users, Orders)
 ├── 📂 routes/         # Définition des routes API
 ├── 📂 services/       # Logique métier centralisée
 ├── app.ts            # Point d'entrée Express
 └── server.ts         # Lancement du serveur
│── 📂 tests/            # Tests unitaires et d'intégration
│── 📂coverage/               # Rapport de couverture des tests
│── package.json            # Dépendances et scripts npm
│── tsconfig.json           # Configuration TypeScript
│── .env.example            # Exemple de configuration
│── README.md               # Documentation du projet
```

## 📖 Documentation API
### 🔹 Accéder à Swagger :
Démarrer le serveur et ouvrir http://localhost:3030/api-docs.

Swagger est configuré pour générer automatiquement la documentation à partir des routes.

## 🔧 Technologies Utilisées
- Node.js + Express.js
- TypeScript
- MongoDB + Mongoose
- JWT pour l'authentification
- Swagger pour la documentation API
- Cors pour gérer les requêtes cross-origin
- Dotenv pour la gestion des variables d'environnement

## 🤝 Contribuer
1. Forker le projet 🍴
2. Créer une branche (git checkout -b feature-nouvelle-feature) 🌱
3. Commit (git commit -m "Ajout d'une nouvelle feature") 🔥
4. Pousser (git push origin feature-nouvelle-feature) 🚀
5. Ouvrir une Pull Request 📩

## 📝 License
Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.