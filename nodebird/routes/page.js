const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    console.log('hi');
    res.json({
        message: true
    });
});

module.exports = router;
