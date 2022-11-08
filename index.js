require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Servidor express
const app = express();

// Config Cors
app.use(cors());

// Lectura de body
app.use(express.json());

// DataBase
dbConnection();

// Rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo');
});