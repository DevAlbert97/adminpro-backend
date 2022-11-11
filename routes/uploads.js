const { Router } = require("express");
const expressfileUpload = require('express-fileupload')

const { JWTValidator } = require("../middlewares/JWT-validator");
const { fileUpload, getFile } = require("../controllers/uploads");

const router = Router();

router.use(expressfileUpload());

router.put('/:type/:id',JWTValidator,fileUpload);
router.get('/:type/:photo',JWTValidator,getFile);

module.exports = router;