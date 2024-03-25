const bcrypt = require('bcrypt');

exports.hash = async (password) => {
	return await bcrypt.hash(password, 10).catch((error) => {
		return error;
	});
};

exports.compare = async (db_password, req_password) => {
	return await bcrypt.compare(req_password, db_password).catch((error) => {
		return error;
	});
};
