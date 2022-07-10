const { Router } = require("express");
const router = Router();
const { getData } = require('../controllers/users.controllers');

router.get("/", getData);


module.exports = router;