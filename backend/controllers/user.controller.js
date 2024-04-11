const User = require('../models/User.model');
const { compare, hash } = require('../utils/password');
const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
	const { email, password } = req.body;

	const isEmail = email.length > 0 && typeof email === 'string';
	const isPassword = password.length > 0 && typeof password === 'string';

	if (!isEmail || !isPassword) {
		return res
			.status(403)
			.json({ message: 'Email  / mot de passe invalides.' });
	}

	try {
		const user = await User.findOne({ email: email });

		const isValidPassword = await compare(user.password, password);

		//Gestion du résultat de la comparaison

		if (!isValidPassword) {
			return res
				.status(403)
				.json({ message: 'Paire email / mot de passe incorrecte.' });
		}

		res.status(201).json({
			userId: user._id,
			token: jwt.sign({ userId: user._id }, SECRET_JWT_KEY, {
				expiresIn: '10h',
			}),
		});
	} catch (error) {
		return res.status(500).json({ error });
	}
};

exports.signup = async (req, res) => {
	const { email, password } = req.body;

	const isEmail = email.length > 0 && typeof email === 'string';
	const isPassword = password.length > 0 && typeof password === 'string';

	if (!isEmail || !isPassword) {
		return res
			.status(403)
			.json({ message: 'Paire email / mot de passe incorrecte.' });
	}
	try {
		const hashedPassword = await hash(password);
		const user = new User({ email: email, password: hashedPassword });
		await user.save();

		res.status(201).json({ message: 'Utilisateur enregistré !' });
	} catch (error) {
		return res.status(403).json({ error });
	}
};
