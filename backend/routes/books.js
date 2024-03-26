const express = require('express');
const router = express.Router();
const { getBooks, addBook } = require('../controllers/book.controller');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');
const resize = require('../middlewares/resize');
router.get('/', getBooks);
router.get('/:id');
router.get('/:id/bestrating');

router.post('/', auth, multer, resize, addBook);
router.post('/:id/rating', auth);

router.put('/:id', auth);

router.delete('/:id', auth);

module.exports = router;
