const express = require('express');
const router = express.Router(); // subLibrary of express, allowing to defarantiet between routes.

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests for /items'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests for /items'
    });
});

module.exports = router;