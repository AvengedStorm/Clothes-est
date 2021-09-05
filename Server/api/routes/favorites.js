const express = require('express');
const router = express.Router(); // subLibrary of express, allowing to defarantiet between routes.
const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://10.0.0.101:27017';
const client = new MongoClient(url);


const stringToObjectId = str => new ObjectId.createFromHexString(str);
const fetchFavorites = async () => {
    await client.connect();
    const db = client.db('clothest');
    const collection = db.collection('favorites');
    return await collection.find().toArray();
};
const fetchFavorite = async (itemId) => {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('favorites');
        return await collection.findOne({_id: stringToObjectId(itemId)});
    } catch {
        return null;   
    }
};
const deleteFavorite = async (itemId) => {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('favorites');
        if (await fetchFavorite(itemId)) {
            return await collection.deleteOne({_id: stringToObjectId(itemId)})
        }
        return null;
    } catch(e) {
        console.log(e);
        return null;
    }
};
const postFavorite = async (ClothObj) => {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('favorites');
        return await collection.insertOne(ClothObj);
    } catch {
        return null;
    }
};

router.get('/', async (req, res, next) => {
    res.status(200).json({
        items: await fetchFavorites(req.params.itemId),
    });
});

router.get('/:itemId', async (req, res, next) => {
    res.status(200).json({
        item: await fetchFavorite(req.params.itemId),
    });
});

router.post('/', async (req, res, next) => {
    const ClothObj = {
        _id: req.body.itemId
    };
    res.status(201).json({
        item: await postFavorite(ClothObj),
    });
});

router.delete('/:itemId', async (req, res, next) => {
    const itemId = req.params.itemId;
     if (await deleteFavorite(itemId)) {
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