const express = require('express');
const router = express.Router(); // subLibrary of express, allowing to defarantiet between routes.
const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://10.0.0.101:27017';
const client = new MongoClient(url);
const assert = require('assert');

const fetchItems = async () => {
    await client.connect();
    const db = client.db('clothest');
    const collection = db.collection('clothes');
    return await collection.find().toArray();
};

router.get('/', async (req, res, next) => {
    res.status(200).json({
        items: await fetchItems(req.params.id),
    });
});


const stringToObjectId = str => new ObjectId.createFromHexString(str);
const fetchItem = async (itemId) => {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('clothes');
        return await collection.findOne({_id: stringToObjectId(itemId)});
    } catch {
        return null;   
    }
};

const postItem = async (ClothObj) => {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('clothes');
        return await collection.insertOne(ClothObj);
    } catch {
        return null;
    }
};

router.get('/:itemId', async (req, res, next) => {
    res.status(200).json({
        item: await fetchItem(req.params.itemId),
    });
});


router.post('/', async (req, res, next) => {
    const ClothObj = {
        type: req.params.type,
        size: req.body.size,
        style: req.body.style,
        isWashed: req.body.isWashed,
        img: req.body.img,
    };
    console.log(req.body);
    res.status(201).json({
        item: await postItem(ClothObj),
    });
});

// const cloth = {
//     type: req.body.type,
//     size: req.body.size,
//     style: req.body.style,
//     isWashed: req.body.isWashed,
//     img: req.body.img,
// };
router.patch('/:itemId', function (req, res) {
    var updateObject = req.body; // {last_name : "smith", age: 44}
    var id = req.params.id;
    db.users.update({_id  : ObjectId(id)}, {$set: updateObject});
});


router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling DELETE requests for /items/'
    });
});

module.exports = router;