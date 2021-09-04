const express = require('express');
const router = express.Router(); // subLibrary of express, allowing to defarantiet between routes.
const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://10.0.0.101:27017';
const client = new MongoClient(url);


const stringToObjectId = str => new ObjectId.createFromHexString(str);
const fetchItems = async () => {
    await client.connect();
    const db = client.db('clothest');
    const collection = db.collection('clothes');
    return await collection.find().toArray();
};
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
const updateItem = async (itemObject) => {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('clothes');
        return await collection.updateOne({_id: itemObject['_id']},{'$set':itemObject});
    } catch(e) {
        console.log(e);
        return null;
    }
};
const deleteItem = async (itemId) => {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('clothes');
        if (await fetchItem(itemId)) {
            return await collection.deleteOne({_id: stringToObjectId(itemId)})
        }
        return null;
    } catch(e) {
        console.log(e);
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

router.get('/', async (req, res, next) => {
    res.status(200).json({
        items: await fetchItems(req.params.itemId),
    });
});
router.get('/:itemId', async (req, res, next) => {
    res.status(200).json({
        item: await fetchItem(req.params.itemId),
    });
});
router.post('/', async (req, res, next) => {
    const ClothObj = {
        type: req.body.type,
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
router.patch('/:itemId', async (req, res, next) => {
    const itemId = req.params.itemId;
    const cloth = {
            _id: stringToObjectId(itemId),
            type: req.body.type,
            size: req.body.size,
            style: req.body.style,
            isWashed: req.body.isWashed,
            img: req.body.img,
        };
    await updateItem(cloth);
    res.status(202).json({
        updated: cloth
    });
});
router.delete('/:itemId', async (req, res, next) => {
    const itemId = req.params.itemId;
     if (await deleteItem(itemId)) {
         res.status(202).json({
             message: 'Handled DELETE request succesfully'
         });
     } else {
        res.status(404).json({
            message: 'Item not found.'
        });
     }
});

module.exports = router;