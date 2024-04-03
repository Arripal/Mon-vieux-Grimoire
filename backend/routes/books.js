const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');
const resize = require('../middlewares/resize');
const {
	getBooks,
	getBestRatings,
	getOneBook,
	addBook,
	addRating,
	updateBook,
	deleteBook,
} = require('../controllers/book.controller');

router.get('/', getBooks);
router.get('/bestrating', getBestRatings);
router.get('/:id', getOneBook);

router.post('/', auth, multer, resize, addBook);
router.post('/:id/rating', auth, addRating);

router.put('/:id', auth, multer, resize, updateBook);

router.delete('/:id', auth, deleteBook);

module.exports = router;
