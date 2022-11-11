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
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/search', require('./routes/searches'));
app.use('/api/uploads', require('./routes/uploads'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo');
});