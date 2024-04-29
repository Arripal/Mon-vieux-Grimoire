const multer = require('multer');

const MIME_TYPES = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/webp': 'webp',
};

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'images');
	},
	filename: (req, file, callback) => {
		const name = file.originalname.trim().split('.')[0];
		const extension = MIME_TYPES[file.mimetype];

		callback(null, `${name}${Date.now()}.${extension}`);
	},
});

module.exports = multer({
	storage,
	//Limitation de la taille maximale du fichier, ici 8 Mo
	limits: { fileSize: 8 * 1024 * 1024 },
}).single('image');
