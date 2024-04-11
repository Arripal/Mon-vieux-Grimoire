const express = require('express');
const { login, signup } = require('../controllers/user.controller');
const limiter = require('../middlewares/rateLimit');
const router = express.Router();

router.post('/login', limiter, login);
router.post('/signup', signup);

module.exports = router;
