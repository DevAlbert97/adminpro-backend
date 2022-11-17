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

    const hid = req.params.id;
    const uid = req.uid;

    try {

        const hospitalDB = await Hospital.findById(hid);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese ID'
            });
        }

        const hospitalChanges = {
            ...req.body,
            user: uid
        }

        const hospitalUpdated = await Hospital.findByIdAndUpdate(hid, hospitalChanges, {new:"true"});

        res.json({
            ok: true,
            msg: 'Hospital Actualizado',
            hospital: hospitalUpdated
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const deleteHospital = async (req, res=response) => {

    const hid = req.params.id;

    try {

        const hospitalDB = await Hospital.findById(hid);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un hospital con ese ID'
            });
        }

        await Hospital.findByIdAndDelete(hid);

        res.json({
            ok: true,
            msg: 'El hospital fue eliminado correctamente.',
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
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}