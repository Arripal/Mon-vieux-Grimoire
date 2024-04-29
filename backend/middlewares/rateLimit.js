const { rateLimit } = require('express-rate-limit');

// Limite le nombre de requêtes possible sur notre serveur dans une période de temps indiqué. Permet d'éviter les attaques brute force.

const limiter = rateLimit({
	windowMs: 10 * 60000,
	limit: 30,
	message: 'Le maximum de requêtes a été atteint, réessayez plus tard.',
	standardHeaders: 'draft-7',
});

module.exports = limiter;
