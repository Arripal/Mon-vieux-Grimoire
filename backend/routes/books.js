const express = require('express');
const router = express.Router();
const { getBooks, addBook } = require('../controllers/book.controller');
const auth = require('../middlewares/auth');

router.get('/', getBooks);
router.get('/:id');
router.get('/:id/bestrating');

router.post('/', auth, addBook);
router.post('/:id/rating', auth);

router.put('/:id', auth);

router.delete('/:id', auth);

module.exports = router;
