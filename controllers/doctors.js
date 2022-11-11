const { response } = require("express");
const Doctor = require('../models/doctor');


const getDoctors = async (req, res=response) => {

    const doctors = await Doctor.find()
        .populate('user','name img')
        .populate('hospital','name img');
        
    res.json({
        ok: true,
        doctors
    });
}

const createDoctor = async (req, res=response) => {

    const uid = req.uid;
    const doctor = new Doctor({
        user: uid,
        ...req.body
    });    

    try {

        const doctorDB = await doctor.save();

        res.json({
            ok: true,
            doctorDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const updateDoctor = async (req, res=response) => {
    res.json({
        ok: true,
        msg: ''
    });
}

const deleteDoctor = async (req, res=response) => {
    res.json({
        ok: true,
        msg: ''
    });    
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}