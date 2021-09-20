import { Router } from 'express';
const router = Router(); // subLibrary of express, allowing to defarantiet between routes.

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests for /sets/'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST requests for /sets/'
    });
});

router.patch('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling PATCH requests for /sets/'
    });
});

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling DELETE requests for /sets/'
    });
});

export default router;