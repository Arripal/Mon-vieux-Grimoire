const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
module.exports = async (req, res, next) => {
	!req.file && next();

	const filePath = req.file.path;
	const fileName = req.file.filename;
	const newFilePath = path.join('./images', `updated_${fileName}`);

	try {
		sharp.cache(false);
		sharp(filePath)
			.resize({ width: 206, height: 260 })
			.toFile(newFilePath)
			.then(() => {
				fs.unlink(filePath, (error) => {
					if (error) {
						console.log(error);
						throw error;
					}
					req.file.path = newFilePath;
					next();
				});
			});
	} catch (error) {
		console.log('Une erreur est survenue : ' + error);
		next();
	}
};
