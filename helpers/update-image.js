const User = require("../models/user");
const Hospital = require("../models/hospital");
const Doctor = require("../models/doctor");
const fs = require('fs');

const updateImage = async (type, id, fileName) => {

    let oldPath = '';

    switch (type) {

        case 'users':
            const user = await User.findById(id);
            if (!user) {
                console.log('No existe el user');
                return false;
            }
            oldPath = `./uploads/users/${user.img}`;
            deleteImg(oldPath);
            user.img = fileName;
            await user.save();
            return true;  

        case 'hospitals':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No existe el hospital');
                return false;
            }
            oldPath = `./uploads/hospitals/${hospital.img}`;
            deleteImg(oldPath);
            hospital.img = fileName;
            await hospital.save();
            return true; 

        case 'doctors':
            const doctor = await Doctor.findById(id);
            if (!doctor) {
                console.log('No existe el doctor');
                return false;
            }
            oldPath = `./uploads/doctors/${doctor.img}`;
            deleteImg(oldPath);
            doctor.img = fileName;
            await doctor.save();
            return true;   
             
        default:
            break;
    }
}

const deleteImg = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path, err => {
            return err;
        });
    }
}

module.exports = {
    updateImage
}