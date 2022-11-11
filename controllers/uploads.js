const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require("../helpers/update-image");

const path = require('path');
const fs = require('fs');

const fileUpload = (req, res=response) => {

    const {type, id, ...params} = req.params;
    const validTypes = ['hospitals', 'doctors', 'users'];

    if (!validTypes.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: 'El tipo seleccionado no existe'
        });
    }

    // Validacion para saber si existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    const file = req.files.image;
    const nameCut = file.name.split('.');
    const fileExtension = nameCut[nameCut.length-1];

    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];

    // Validacion de extension
    if (!validExtensions.includes(fileExtension)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }

    const fileName = `${uuidv4()}.${fileExtension}`;

    // Path para guardar imagen
    const path = `./uploads/${type}/${fileName}`;

    // Mover imagen
    file.mv(path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover imagen'
            });
        }

        // Actualizar BD
        updateImage(type, id, fileName);

        res.json({
            ok: true,
            msg:'Archivo subido correctamente',
            fileName
        });
        
    });
}

const getFile = (req, res=response) => {
    const {type, photo, ...params} = req.params;
    const pathImg = path.join( __dirname, `../uploads/${type}/${photo}`);

    // Imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
}

module.exports = {
    fileUpload,
    getFile
}