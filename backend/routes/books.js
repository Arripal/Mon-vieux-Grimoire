const express = require('express');

const router = express.Router();

router.get('/');
router.get('/:id');
router.get('/:id/bestrating');

router.post('/');
router.post('/:id/rating');

router.put('/:id');

router.delete('/:id');

module.exports = router;
