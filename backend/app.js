const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const db = require('./db/database');

const PORT = process.env.PORT || 4200;

const booksRoutes = require('./routes/books');
const usersRoutes = require('./routes/users');

app.use(express.json());
/*
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin,X-Requested-With,Content,Accept,Content-Type,Authorization'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET,POST,PUT,DELETE,PATCH,OPTIONS'
	);
	next();
});
*/
app.use(cors());
app.use('/api/books', booksRoutes);
app.use('/api/auth', usersRoutes);

db.connect();

app.listen(PORT, console.log(`Listening on port ${PORT}...`));
