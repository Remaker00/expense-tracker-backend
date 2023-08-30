const express = require('express');
const router = express.Router();
const adminCont = require('../controller/admin');


router.post('/', adminCont.insertExp);
router.get('/',adminCont.getAllExp);
router.delete('/:id', adminCont.deleteExp);

module.exports = router;