const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
const Book = require('../models/Book.model');
const User = require('../models/User.model');

const db = {};
db.Book = Book;
db.User = User;

db.connect = () => {
	mongoose
		.connect(`${DB_URL}`)
		.then(() => console.log('connexion à mongodb réussie !'));
};

module.exports = db;
