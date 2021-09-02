const express = require('express');
const router = express.Router(); // subLibrary of express, allowing to defarantiet between routes.

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests for /favorites'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests for /favorites'
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling DELETE requests for /favorites'
    });
});

module.exports = router;