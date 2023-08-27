# Mon vieux grimoire - Site de notation de livres

### Projet 7 - Formation développeur web Openclassrooms

Les librairies “Au Vieux Grimoire“ comptent de nombreux clients passionnés. L’objectif du site “Mon Vieux Grimoire” est de donner la possibilité aux lecteurs de créer des livres, de les noter et de consulter les livres existants ainsi que leurs note

## Technologies utilisées

![_nodeJS_](https://img.shields.io/badge/nodeJS-v14.17.3-green)
![_mongoose_](https://img.shields.io/badge/mongoose-^6.10.0-critical)
![_mongoose_unique_validator_](https://img.shields.io/badge/mongoose_unique_validator-^3.1.0-critical)
![_express_](https://img.shields.io/badge/express-^4.18.2-lightgrey)
![_dotenv_](https://img.shields.io/badge/dotenv-^4.18.2-yellow)
![_jsonwebtoken_](https://img.shields.io/badge/dotenv-^9.0.0-ff69b4)
![_bcrypt_](https://img.shields.io/badge/bcrypt-^5.1.0-orange)
![_multer_](https://img.shields.io/badge/multer-^1.4.5_lts.1-blue)


## Création du backend

- Création d'un serveur express simple.
- Création d'une API RESTful.
- Configuration des models Book et User.
- Création du routes CRUD 
- Mise en plase d'un système d'authentification par Token(jwt).
- Hachage du mot de passe avec bcrypt.
- Mise en place d'une gestion des fichiers utilisateur via Sharp et Multer.
- Ajout et calcul de la notation des livres.

## Comment lancer le projet ?

### Cloner le front

Ouvrez un terminal puis `git clone https://github.com/JonathanCornic/mon-vieux-grimoire.git`

### Créez un fichier .env à la racine du projet avec en parametres 

(données fournies pour le jury)
- __DB_URI__: mongodb+srv://salmaaboudou:Skieswalker93..@grimoire.9f4xb9g.mongodb.net/?retryWrites=true&w=majority
- __TOKEN_SECRET__: PQV5wQPxT73gcnk0jhIHGeT636FGj7iD6ROTwULNcwB468rbIil14mRT
- __PORT__: 4000

### Lancer le frontend 

Ouvrez un terminal puis `cd frontend`, faites la commande `npm install` pour installer les dépendances puis `npm start` pour lancer le client. Le frontend écoute sur `le port 3000``

### Lancer le backend

Ouvrez un terminal puis `cd backend`, faites la commande `npm install` pour installer les dépendances puis `nodemon` pour lancer le server.