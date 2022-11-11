const { response } = require("express");
const Hospital = require('../models/hospital');


const getHospitals = async (req, res=response) => {

    const hospitals = await Hospital.find().populate('user','name img');
    
    res.json({
        ok: true,
        hospitals
    });
}

const createHospital = async (req, res=response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        user: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospitalDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const updateHospital = async (req, res=response) => {
    res.json({
        ok: true,
        msg: ''
    });
}

const deleteHospital = async (req, res=response) => {
    res.json({
        ok: true,
        msg: ''
    });   
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}