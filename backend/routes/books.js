const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');
const resize = require('../middlewares/resize');
const {
	getBooks,
	getBestRating,
	getOneBook,
	addBook,
	addRating,
	updateBook,
	deleteBook,
} = require('../controllers/book.controller');

router.get('/', getBooks);
router.get('/:id', getOneBook);
router.get('/bestrating', getBestRating);

router.post('/', auth, multer, resize, addBook);
router.post('/:id/rating', auth, addRating);

router.put('/:id', auth, multer, resize, updateBook);

router.delete('/:id', auth, deleteBook);

module.exports = router;
