const { response } = require("express");
const { generateJWT } = require("../helpers/jwt");
const User = require("../models/user");
const bcrypt = require('bcryptjs');

const login = async (req, res=response) => {

    const { email, password} = req.body;

    try {

        const userDB = await User.findOne({email});
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Contraseña o email no es correcto'
            });
        }

        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña o email no es correcto'
            });
        }

        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    login
}