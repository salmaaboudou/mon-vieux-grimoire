const express = require("express");
const fs = require("fs");

const Book = require("../models/books.model");

exports.getAllBooks = (req, res, next) => {
      Book.find() // recherche documents dans collection associée
            .then((books) => {
                  res.status(200).json(books);
            })
            .catch((error) => {
                  res.status(400).json({ error: error });
            }); // Bad request
};

exports.getOneBook = (req, res, next) => {
      Book.findOne({ _id: req.params.id }) // retourne une seule instance d'un modèle (document)
            .then((book) => {
                  res.status(200).json(book);
            })
            .catch((error) => {
                  res.status(404).json({ error: error });
            }); // Not found
};

exports.getBestRatingBooks = (req, res, next) => {
      Book.find({})
            .sort({ averageRating: -1 }) // Tri descendant par la note moyenne (les plus élevées en premier)
            .limit(3)
            .exec()
            .then((bestRatingBooks) => {
                  res.status(200).json(bestRatingBooks);
            })
            .catch((error) => {
                  res.status(400).json({ error: error });
            });
};

exports.createBook = (req, res, next) => {
      const bookStringified = req.body.book; // book renvoyé par multer en chaine de caractère
      const bookObject = JSON.parse(bookStringified);

      delete bookObject.id;
      delete bookObject.userId;

      bookObject.userId = req.auth.userId;

      const book = new Book({
            ...bookObject,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      });

      book.save()
            .then(() => {
                  res.status(201).json({ message: "Livre enregistré !" });
            })
            .catch((error) => {
                  res.status(400).json({ error });
            });
};

exports.modifyBook = (req, res, next) => {
      const bookStringified = req.body.book;
      const bookObject = req.file
            ? {
                    ...JSON.parse(bookStringified),
                    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
              }
            : { ...req.body };

      delete bookObject.userId;

      Book.findOne({ _id: req.params.id })
            .then((book) => {
                  if (book.userId != req.auth.userId) {
                        res.status(401).json({ message: "Non autorisé !" });
                  } else {
                        Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                              .then(() => res.status(200).json({ message: "Livre modifié!" }))
                              .catch((error) => res.status(401).json({ error }));
                  }
            })
            .catch((error) => {
                  res.status(400).json({ error });
            });
};

exports.deleteBook = (req, res, next) => {
      Book.findOne({ _id: req.params.id })
            .then((book) => {
                  if (book.userId != req.auth.userId) {
                        res.status(401).json({ message: "Not authorized" });
                  } else {
                        const filename = book.imageUrl.split("/images/")[1];
                        fs.unlink(`images/${filename}`, () => {
                              Book.deleteOne({ _id: req.params.id })
                                    .then(() => {
                                          res.status(200).json({ message: "Livre supprimé !" });
                                    })
                                    .catch((error) => res.status(401).json({ error }));
                        });
                  }
            })
            .catch((error) => {
                  res.status(500).json({ error });
            });
};



exports.rateBook = (req, res, next) => {
      const ratingObject = req.body;

      if (ratingObject.rating < 0 || ratingObject.rating > 5) {
            return res.status(400).json({ message: "La note doit être comprise entre 0 et 5." });
      }


      Book.findById(req.params.id)
            .then((book) => {
                  if (!book) {
                        return res.status(404).json({ message: "Livre non trouvé." });
                  }

                  const hasRated = book.ratings.some((rating) => rating.userId === req.auth.userId);

                  if (hasRated) {
                        return res.status(401).json({ message: "Vous avez déjà noté le livre !" });
                  }

                  // Add the new rating to the ratings array
                  book.ratings.push({ userId: req.auth.userId, grade: ratingObject.rating });

                  // Calculate the new averageRating
                  const totalRatings = book.ratings.length;
                  const sumRatings = book.ratings.reduce((total, rating) => total + rating.grade, 0);
                  const newAverageRating = sumRatings / totalRatings;

                  // Update the averageRating in the book object
                  book.averageRating = newAverageRating;

                  // Save the updated book
                  book.save()
                  .then(() => {
                        res.status(201).json(book);
                  })
                  .catch((error) => {
                        res.status(400).json({ error });
                  });
            })
            .catch((error) => {
                  res.status(400).json({ error });
            });
};
