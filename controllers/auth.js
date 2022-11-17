const { response } = require("express");
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async (req, res=response) => {

    try {
        const {email, name, picture} = await googleVerify(req.body.token);

        const userDB = await User.findOne({email});
        let user;

        if (!userDB) {
            user = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            user = userDB;
            user.google = true;
        }

        await user.save();

        const token = await generateJWT(user.id);


        res.json({
            ok: true,
            email,
            name,
            picture,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de Google no es correcto'
        });        
    }

}

const renewToken = async (req, res=response) => {

    const uid = req.id;

    const token = await generateJWT(uid);

    res.json({
        ok: true,
        token
    });

}

module.exports = {
    login,
    googleSignIn,
    renewToken
}