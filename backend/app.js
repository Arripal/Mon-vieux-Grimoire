const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const db = require('./db/database');
const PORT = process.env.PORT || 4000;

const booksRoutes = require('./routes/books');
const usersRoutes = require('./routes/users');

// Ajout d'Helmet afin de sécurisé l'application en ajoutant des headers HTTP
app.use(helmet({ crossOriginResourcePolicy: false }));
//Limitation de la taille des requetes JSON pour ne pas surcharger le serveur
app.use(express.json({ limit: '10mb' }));
app.use('/images', express.static('images'));
app.use(cors());
app.use('/api/books', booksRoutes);
app.use('/api/auth', usersRoutes);

db.connect();

app.listen(PORT, console.log(`Listening on port ${PORT}...`));
