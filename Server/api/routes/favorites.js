const Router = require('express');
const router = Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const stringToObjectId = str => new ObjectId.createFromHexString(str);
const fetchFavoritesByUser = async (userId) => {
    await client.connect();
    const db = client.db('clothest');
    const collection = db.collection('favorites');
    return await collection.find({belongsTo: userId}).toArray();
};
// const fetchFavorite = async (itemId) => {
//     try {
//         await client.connect();
//         const db = client.db('clothest');
//         const collection = db.collection('favorites');
//         return await collection.findOne({_id: stringToObjectId(itemId)});
//     } catch {
//         return null;   
//     }
// };
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

router.get('/:userId', async (req, res, next) => {
    const userId = stringToObjectId(req.params.userId);
    res.status(200).json({
        items: await fetchFavoritesByUser(userId),
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