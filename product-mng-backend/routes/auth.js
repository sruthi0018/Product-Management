const express = require("express");
const { signup } = require("../controllers/auth/signup");
const { login } = require("../controllers/auth/login");
const router = express.Router();


router.post('/login', login);
router.post('/signup',signup)

module.exports = router;
