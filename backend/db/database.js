const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;

db = {};

db.connect = () => {
	mongoose
		.connect(DB_URL)
		.then(() => console.log('connexion à mongodb réussie !'))
		.catch(() => console.log('connexion à mongodb  échouée'));
};

module.exports = db;
