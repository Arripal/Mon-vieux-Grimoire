const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const db = require('./db/database');
const path = require('path');
const PORT = process.env.PORT || 4000;

const booksRoutes = require('./routes/books');
const usersRoutes = require('./routes/users');

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors());
app.use('/api/books', booksRoutes);
app.use('/api/auth', usersRoutes);

db.connect();

app.listen(PORT, console.log(`Listening on port ${PORT}...`));
