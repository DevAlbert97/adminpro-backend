const { Router } = require("express");
const { check } = require("express-validator");
const { JWTValidator } = require('../middlewares/JWT-validator');
const { login, googleSignIn, renewToken } = require("../controllers/auth");

const fieldValidator = require("../middlewares/field-validator");

const router = Router();

router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    fieldValidator,
    ],login);

router.post('/google',[
    check('token', 'El token de google es obligatoria').not().isEmpty(),
    fieldValidator,
    ],googleSignIn);

router.get('/renew',JWTValidator, renewToken);


module.exports = router;