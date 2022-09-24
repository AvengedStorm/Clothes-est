const Router = require('express');
const router = Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const ObjectId = require('mongodb').ObjectId;

const postSet = async function(itemArray) {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('sets');
        return await collection.insertOne(itemArray);
    } catch (e) {
        console.log(e);
        return e.response.data;
    }
};
const fetchSets = async function() {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('sets');
        return await collection.find();
    } catch {
        return null;   
    }
};

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests for /sets/'
    });
});

router.post('/', (req, res, next) => {
    // const ids = req.body.map(item => item._id);
    const currentSet = req.body;
    const set = {
        _id: new ObjectId(),
        belongsTo: currentSet.belongsTo,
        items: currentSet.items
    }
    if(postSet(set)) {
        res.status(200).json({
            message: 'Handling POST requests for /sets/'
        });
    } else {
        res.status(500).json({
            message: `An internal error occurred`
        })
    }
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