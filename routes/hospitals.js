const { Router } = require("express");
const { check } = require('express-validator');

const { JWTValidator } = require('../middlewares/JWT-validator');
const fieldValidator  = require('../middlewares/field-validator');
const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals');

const router = Router();

router.get('/', [JWTValidator], getHospitals);
router.post('/',[
    JWTValidator, 
    check('name', 'El nombre del hospital es necesario').not().isEmpty(),
    fieldValidator
], createHospital);
router.put('/:id',[], updateHospital);
router.delete('/:id',[], deleteHospital);

module.exports = router;