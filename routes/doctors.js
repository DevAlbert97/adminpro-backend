const { Router } = require("express");
const { check } = require('express-validator');
const { getDoctors, createDoctor, updateDoctor, deleteDoctor } = require("../controllers/doctors");
const fieldValidator = require("../middlewares/field-validator");

const { JWTValidator } = require('../middlewares/JWT-validator');

const router = Router();

router.get('/', [], getDoctors);
router.post('/',[
    JWTValidator, 
    check('name', 'El nombre del doctor es necesario').not().isEmpty(),
    check('hospital', 'El hospital id es necesario').isMongoId(),
    fieldValidator
], createDoctor);
router.put('/:id',[
    JWTValidator, 
    check('name', 'El nombre del doctor es necesario').not().isEmpty(),
    check('hospital', 'El hospital es necesario').isMongoId(),
    fieldValidator
], updateDoctor);
router.delete('/:id',[], deleteDoctor);

module.exports = router;