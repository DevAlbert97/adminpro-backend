const { Router } = require("express");
const { check } = require("express-validator");

const {totalSearch, collectionSearch} = require("../controllers/searches");

const { JWTValidator } = require("../middlewares/JWT-validator");
const fieldValidator = require("../middlewares/field-validator");

const router = Router();

router.get('/:search',JWTValidator,totalSearch);
router.get('/collection/:table/:search',JWTValidator,collectionSearch);

module.exports = router;