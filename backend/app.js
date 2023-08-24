const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const booksRoutes = require("./routes/books.routes");
const usersRoutes = require("./routes/users.routes");

// Connexion à la db
mongoose
      .connect("mongodb+srv://salmaaboudou:Skieswalker93..@grimoire.9f4xb9g.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
      })
      .then(() => console.log("Connexion à MongoDB réussie !"))
      .catch(() => console.log("Connexion à MongoDB échouée !"));

// Headers de contrôle d'accès
app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
      next();
});

// Middleware pour l'analyse du corps de la demande (parse le JSON)
app.use(express.json());

app.use('/api/books', booksRoutes);
app.use('/api/auth', usersRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;
