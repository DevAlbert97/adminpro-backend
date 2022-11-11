const { response } = require('express');
const { generateJWT } = require("../helpers/jwt");
const bCrypt = require('bcryptjs');
const User = require('../models/user');


const getUsers = async (req,res) =>{

    const from = Number(req.query.from) || 0;

    const [users, total] = await Promise.all([
        User.find({}, 'name email role google img').skip(from).limit(5),
        User.count()
    ]);

    res.json({
        ok: true,
        users,
        total
    });
}

const createUser = async (req,res=response) =>{

    const {email, password} = req.body;

    try {
        const existEmail = await User.findOne({email});
        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }
        const user = new User(req.body);

        // Encriptado de password
        const salt = bCrypt.genSaltSync();
        user.password = bCrypt.hashSync(password, salt);

        // Guardar usuario
        await user.save();

        const token = await generateJWT(user.id);
        
        res.json({
        ok: true,
        user,
        token
    });
    } catch (error) {
        res.status(500).json}({
            ok: false,
            msg: 'Error inesperado'
        });
}


const updateUser = async (req, res=response) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById(uid);
        const {password, google, email,...fields} = req.body;

        if(!userDB){
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        
        if (userDB.email !== email) {
            const emailExist = await User.findOne({email});
            if (emailExist) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        fields.email = email;
        const updatedUser = await User.findByIdAndUpdate(uid, fields, {new: true});

        res.json({
            ok: true,
            usuario: updatedUser
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

}

const deleteUser = async (req, res=response) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById(uid);
        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        await User.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'El usuario fue eliminado correctamente.',
            uid
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
    getUsers,
    createUser,
    updateUser,
    deleteUser
} 

