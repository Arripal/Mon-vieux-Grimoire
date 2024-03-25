const db = require('../db/database');
const Book = db.Book;

exports.getBooks = async (req, res) => {
	try {
		const books = await Book.find();
		return res.status(200).json(books);
	} catch (error) {
		res.status(400).json({ error });
	}
};

exports.addBook = async (req, res) => {};
