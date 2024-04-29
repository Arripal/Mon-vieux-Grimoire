const jwt = require('jsonwebtoken');
const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;

module.exports = (req, res, next) => {
	const { authorization } = req.headers;
	if (!authorization)
		return res
			.status(403)
			.json({ message: "Vous n'avez pas les privilèges requis." });
	try {
		const token = authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, SECRET_JWT_KEY);
		if (!decodedToken)
			return res
				.status(403)
				.json({ message: "Vous n'avez pas les privilèges requis." });

		const userId = decodedToken.userId;
		req.auth = { userId: userId };
		next();
	} catch (error) {
		return res.status(401).json({ error });
	}
};
