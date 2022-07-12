const { Router } = require("express");
const router = Router();
const { getData, insertData } = require('../controllers/users.controllers');

router.get("/", getData);
router.post('/insert', insertData);

module.exports = router;