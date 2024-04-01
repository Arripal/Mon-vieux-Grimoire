const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const db = require('./db/database');
const PORT = process.env.PORT || 4000;

const booksRoutes = require('./routes/books');
const usersRoutes = require('./routes/users');

//OWASP  brute force attaque => librairie  mongodb atlas => admin / autres users

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('images'));
app.use(cors());
app.use('/api/books', booksRoutes);
app.use('/api/auth', usersRoutes);

db.connect();

app.listen(PORT, console.log(`Listening on port ${PORT}...`));
