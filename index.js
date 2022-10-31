require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Servidor express
const app = express();

// Config Cors
app.use(cors());

// DataBase
dbConnection();

// Rutas
app.get('/', (req,res) =>{
    res.json({
        ok: true,
        msg: "Hola mundo"
    })
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo');
});