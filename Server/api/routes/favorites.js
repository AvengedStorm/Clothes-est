const Router = require('express');
const router = Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const ObjectId = require('mongodb').ObjectId;
const undef = require('mongodb').Undefined;

const stringToObjectId = str => {
    try {
        return ObjectId.createFromHexString(str)
    } catch(ex) {
        console.log(ex);
    }
}
const fetchFavoritesByUser = async (userId) => {
    await client.connect();
    const db = client.db('clothest');
    const collection = db.collection('clothes');
    return await collection.find({ belongsTo: userId }).toArray();
};
const deleteFavorite = async (itemId) => {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('clothes');
        console.log(itemId);
        return await collection.updateOne({
            _id: stringToObjectId(itemId)},
            { $unset: { favorite: "" } }
        );
    } catch(ex) {
        return ex;
    }
};
const updateItem = async function(itemId, itemObject) {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('clothes');
        return await collection.updateOne({_id: stringToObjectId(itemId)}, {$set: {'favorite': true}});
    } catch(ex) {
        return ex;
    }
};

router.get('/:userId', async (req, res, next) => {
    const userId = stringToObjectId(req.params.userId);
    res.status(200).json({
        items: await fetchFavoritesByUser(userId),
    });
});

router.post('/', async (req, res, next) => {
    try {
        const itemId = req.body?._id;
        const alreadyFavorited = req.body?.favorite
        // console.log(alreadyFavorited);
        if (alreadyFavorited) {
            res.status(200).json({
                item: await deleteFavorite(itemId)
            });
        } else {
            res.status(200).json({
                item: await updateItem(itemId)
            });
        }
    } catch (e) {
        console.log(e)
    }
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