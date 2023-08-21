const express = require("express");
const app = express();
const mongoose = require("mongoose");
const booksRoutes = require("./routes/books.routes");
const userRoutes = require("./routes/user.routes");

// Connexion à la db
mongoose
      .connect("mongodb+srv://salmaaboudou:Skieswalker93..@grimoire.9f4xb9g.mongodb.net/?retryWrites=true&w=majorit", {
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

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

app.use((req, res) => {
      res.json({ message: "Votre requête a bien été reçue !" });
});

module.exports = app;
