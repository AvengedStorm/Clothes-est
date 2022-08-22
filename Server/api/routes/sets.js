const Router = require('express');
const router = Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const postItem = async function(ClothObj) {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('clothes');
        return await collection.insertOne(ClothObj);
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};

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

module.exports = router;