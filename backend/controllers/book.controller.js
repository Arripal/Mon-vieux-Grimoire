const db = require('../db/database');
const { Book } = db;
const fs = require('fs');

//RAJOUTER DES COMMENTAIRES

exports.getBooks = async (req, res) => {
	try {
		const books = await Book.find();
		return res.status(200).json(books);
	} catch (error) {
		res.status(400).json({ error });
	}
};

exports.getOneBook = async (req, res) => {
	const { id } = req.params;
	try {
		const book = await Book.findOne({ _id: id });
		res.status(200).json(book);
	} catch (error) {
		res.status(400).json({ error });
	}
};

exports.getBestRatings = async (req, res) => {
	try {
		const books = await Book.find().sort({ averageRating: -1 }).limit(3);

		res.status(200).json(books);
	} catch (error) {
		console.log('une erreur est survenue.');
		res.status(401).json({ error });
	}
};

exports.addBook = async (req, res) => {
	const bookData = JSON.parse(req.body.book);
	const { userId } = req.auth;

	delete bookData._id;
	delete bookData.userId;

	const book = new Book({
		...bookData,
		userId: userId,
		imageUrl: `${req.protocol}://${req.get('host')}/images/updated_${
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

exports.addRating = async (req, res) => {
	const { rating } = req.body;
	const { id } = req.params;
	const { userId } = req.auth;
	delete req.body._id;
	try {
		const book = await Book.findOne({ _id: id });
		const ratings = book.ratings;

		const existingRating = ratings.filter((rating) => rating.userId === userId);

		if (!book || existingRating.length > 0)
			return res
				.status(403)
				.json({ message: "Impossible d'ajouter votre note." });

		const validRatings = [0, 1, 2, 3, 4, 5];
		const isValidRating = validRatings.includes(rating);

		const newRating = isValidRating && {
			grade: rating,
			userId: userId,
			_id: id,
		};

		ratings.push(newRating);

		const sumRating = ratings.reduce((sum, rating) => (sum += rating.grade), 0);

		const avgRating = sumRating / ratings.length;

		book.averageRating = avgRating;
		await book.save();

		res.status(201).json(book);
	} catch (error) {
		res.status(500).json({ error });
	}
};

exports.updateBook = async (req, res, next) => {
	const { id } = req.params;
	const { userId } = req.auth;

	try {
		const existingBook = await Book.findOne({ _id: id });

		if (!existingBook || existingBook.userId !== userId)
			return res
				.status(403)
				.json({ message: 'Impossible de modifier ce livre.' });

		const bookData = req.file
			? {
					...JSON.parse(req.body.book),
					imageUrl: `${req.protocol}://${req.get('host')}/images/updated_${
						req.file.filename
					}`,
			  }
			: { ...req.body };

		//Supression d'un potentiel faux
		delete bookData.userId;

		const filename = existingBook.imageUrl.split('/images/')[1];

		req.file &&
			fs.unlink(`images/${filename}`, (error) => {
				if (error) console.log('Aucun fichier a supprimer.');
			});

		await Book.updateOne({ _id: id }, { ...bookData, _id: id });

		res.status(200).json({ message: 'Livre modifié' });
	} catch (error) {
		res.status(403).json({ error });
	}
};

exports.deleteBook = async (req, res) => {
	const { id } = req.params;
	const { userId } = req.auth;

	try {
		const book = await Book.findOne({ _id: id });

		if (!book || book.userId !== userId)
			return res
				.status(403)
				.json({ message: 'Impossible de supprimer ce livre.' });

		await Book.deleteOne({ _id: id });

		const filename = book.imageUrl.split('/images/')[1];

		fs.unlink(`images/${filename}`, (error) => {
			if (error) console.log('Aucun fichier a supprimer.');
		});

		res.status(200).json({ message: 'Livre supprimé.' });
	} catch (error) {
		res.status(404).json({ error });
	}
};
