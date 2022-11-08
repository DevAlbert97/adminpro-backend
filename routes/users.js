const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { JWTValidator } = require('../middlewares/JWT-validator');
const fieldValidator = require('../middlewares/field-validator');

const router = Router();

router.get('/', JWTValidator,getUsers);
router.post('/',[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    fieldValidator,
    ],
     createUser
);
router.put('/:id',[
    JWTValidator,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    fieldValidator
    ],
    updateUser
);
router.delete('/:id',JWTValidator,deleteUser);

module.exports = router;