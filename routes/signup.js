const express = require('express');
const router = express.Router();
const adminCont = require('../controller/admin');

router.post('/', adminCont.insertusers);
router.post('/', adminCont.checkusers);

module.exports = router;