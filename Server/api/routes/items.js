const Router = require('express');
const router = Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://10.0.0.101:27017';
const client = new MongoClient(url);

const stringToObjectId = str => new ObjectId.createFromHexString(str);
const fetchItemsByUser = async function(USER_ID) {
    await client.connect();
    const db = client.db('clothest');
    const collection = db.collection('clothes');
    return await collection.find({email: USER_ID}).toArray();
};
const fetchItems = async function() {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('clothes');
        return await collection.find().toArray();
    } catch {
        return null;   
    }
};
const updateItem = async function(itemId, itemObject) {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('clothes');
        return await collection.updateOne({_id: stringToObjectId(itemId)},{'$set': itemObject});
    } catch(e) {
        console.log(e);
        return null;
    }
};
const deleteItem = async function(itemId) {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('clothes');
        return await collection.deleteOne({_id: stringToObjectId(itemId)});
    } catch(e) {
        console.log(e);
        return null;
    }
};
const postItem = async function(ClothObj) {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('clothes');
        return await collection.insertOne(ClothObj);
    } catch (error) {
        return error.response.data;
    }
};

router.get('/', async function(req, res, next) {
    try {
        res.status(200).json({
            items: await fetchItems(),
        });
    } catch (e) {
        console.log(e);
    }
});
router.get('/:userId', async function(req, res, next) {
    try {
        res.status(200).json({
            items: await fetchItemsByUser(req.params.userId),
        });
    } catch (e) {
        console.log(e);
    }
});
// router.post('/:userId', async function(req, res, next) {
//     res.status(200).json({
//         items: await fetchItemsByUser(req.params.userId)
//     });
// });
// router.post('/:userEmail', async function(req, res, next) {
//     try {
//         const userEmail = req.params.userEmail;
//         const items = fetchItems(userEmail);
//         res.status(200).json({
//             item: items
//         });
//     } catch (err) {
//         console.log(err);
//     }
// })
router.post('/', async function(req, res, next) {
    try {
        const newDate = () => new Date().getTime().toString();
        const addedOn = newDate();
        const itemType = req.body.type;
        const itemSize = req.body.size;
        const itemStyle = req.body.style;
        const itemWashed = req.body.isWashed;
        const itemImage = req.body.image;
        const belongsTo = req.body.belongsTo;

        const ClothObj = {
            _id: new ObjectId(),
            type: itemType,
            size: itemSize,
            style: itemStyle,
            isWashed: itemWashed,
            image: itemImage,
            addedOn: addedOn,
            belongsTo: belongsTo,
        };
        Object.keys(ClothObj).forEach(key => {
            if(!ClothObj[key]) {
                delete ClothObj[key];
            }
        });
        console.log(ClothObj);
        res.status(201).json({
            item: await postItem(ClothObj),
            message: console.log("Item Added!"),
        });
    } catch (err) {
        console.log(err);
    }
});
router.patch('/:itemId', async function(req, res, next) {
    const itemId = req.params.itemId;
    const cloth = {
            type: req.body.type,
            size: req.body.size,
            style: req.body.style,
            isWashed: req.body.isWashed,
            image: req.body.image,
        };
    Object.keys(cloth).forEach(key => {
        if(!cloth[key]) {
            delete cloth[key];
        }
    });
    res.status(202).json({
        item: await updateItem(itemId, cloth).then(() => console.log("Item Updated!")),
    });
});
router.delete('/:itemId', async function(req, res, next) {
    const itemIdentifier = req.body[0]._id;
     if (await deleteItem(itemIdentifier)) {
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