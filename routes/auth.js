var expres = require("express");
var router = expres.Router();
var authController = require("../controllers/auth")
router.post("/register",authController.register);
router.post("/login",authController.login);

module.exports =router;