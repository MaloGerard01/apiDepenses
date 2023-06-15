
# API d'AppDepenses

## Justification des choix

Cette application a été développée avec Node.js en utilisant le framework Express et la librairie Mongoose avec une base de données MongoDB.

J'ai choisi d'utiliser Node avec Express car ces deux technologies permettent de créer des APIs simples, robustes et optimisées en peu de temps.

J'ai choisi d'utiliser Mongoose et MongoDB car les bases de données non relationnelles permettent une plus grande flexibilité dans la structuration des données et m'ont permis de plus facilement modifier les modèles au cours du développement de l'application.

## Dépendances

Ce projet nécessite d'avoir une base de données MongoDB, qui peut être installé ici : [Download MongoDB Community Server | MongoDB](https://www.mongodb.com/try/download/community)

Ce projet utilise les dépendances suivantes :
```

bcrypt
core-js
body-parser
cors
ejs
express
jsonwebtoken
mongoose
typescript

```


## Installation du projet

```

npm install

```

  

## Lancer le projet en local

```

node .\dist\app.js

```
## Routes

#### GET /Depenses
Récupère toutes les dépenses 
#### GET /getDepense/:id
Récupère une dépense à partir de son id
#### GET /getDepensesFromUser/:id
Récupère toutes les dépenses d'un utilisateur à partir de son id
#### GET /getDepensesFromUser/:id
Récupère toutes les dépenses ou l'utilisateur donné est concerné
#### DELETE /deleteDepense/:id
Supprime une dépense à partir de son id
#### POST /insertDepense
Insère une dépense en utilisant les données contenues dans le body de la requête
#### PUT /updateDepense/:id
Mets à jour une dépense en utilisant les données contenues dans le body de la requête


#### GET /CategoriesDepense
Récupère toutes les catégories
#### GET /getCategorieDepense/:id
Récupère une catégorie à partir de son id
#### DELETE /deleteCategorieDepense/:id
Supprime une catégorie à partir de son id
#### POST /insertCategorieDepense
Insère une catégorie en utilisant les données contenues dans le body de la requête
#### PUT /updateCategorieDepense/:id
Mets à jour une catégorie en utilisant les données contenues dans le body de la requête

#### POST /login
Permet a un utilisateur de se connecter
#### GET /getUsers
Récupère la liste des utilisateurs
#### GET /getUserInfo/:id
Récupère les informations d'un utilisateur a partir de son id
#### DELETE /deleteUser/:id
Supprime un utilisateur à partir de son id
#### POST /insertUser
Insère un utilisateur

