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

    const did = req.params.id;
    const uid = req.uid;

    try {

        const doctorDB = await Doctor.findById(did);

        if (!doctorDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un doctor con ese ID'
            });
        }

        const doctorChanges = {
            ...req.body,
            user: uid
        }

        const doctorUpdated = await Doctor.findByIdAndUpdate(did, doctorChanges, {new:"true"});


        res.json({
            ok: true,
            msg: 'Doctor Actualizado',
            doctor: doctorUpdated
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const deleteDoctor = async (req, res=response) => {

    const did = req.params.id;

    try {

        const doctorDB = await Doctor.findById(did);

        if (!doctorDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un doctor con ese ID'
            });
        }

        await Doctor.findByIdAndDelete(did);

        res.json({
            ok: true,
            msg: 'El doctor fue eliminado correctamente.',
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    } 
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor
}