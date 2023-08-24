const express = require("express");
const router = express.Router();
const bookCtrl = require("../controllers/books.controller");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");


router.get('/', bookCtrl.getAllBooks);
router.get('/bestrating', bookCtrl.getBestRatingBooks);
router.get('/:id', bookCtrl.getOneBook);
router.post('/', auth, multer, bookCtrl.createBook);
router.put('/:id', auth, multer, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.rateBook);

module.exports = router;