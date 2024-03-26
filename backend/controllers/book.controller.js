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

exports.addBook = async (req, res) => {
	const bookData = JSON.parse(req.body.book);
	const { userId } = req.auth;
	delete bookData._id;
	delete bookData._userId;

	const book = new Book({
		...bookData,
		userId: userId,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${
			req.file.filename
		}`,
	});
	try {
		await book.save();
		res.status(201).json({ message: 'Livre enregistré !' });
	} catch (error) {
		return res.status(400).json({ error });
	}
};
