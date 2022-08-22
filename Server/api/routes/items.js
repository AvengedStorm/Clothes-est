const Router = require('express');
const router = Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const stringToObjectId = str => ObjectId.createFromHexString(str);
const fetchItemsByUser = async function(USER_ID) {
    await client.connect();
    const db = client.db('clothest');
    const collection = db.collection('clothes');
    return await collection.find({belongsTo: USER_ID}).toArray();
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
    }
};
// const deleteManyItems = async function(itemIds) {
//     try {
//         await client.connect();
//         const db = client.db('clothest');
//         const collection = db.collection('clothes');
        
//         return await collection.deleteOne({_id: stringToObjectId(itemIds)});
//     } catch(e) {
//         console.log(e);
//     }
// };
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

router.get('/', async function(req, res, next) {
    try {
        res.status(200).json({
            items: await fetchItems(),
        });
    } catch (e) {
        console.log(e);
    }
});
router.get('/:userID', async function(req, res, next) {
    try {
        const userID = req.params.userID
        // console.log(userID);
        res.status(200).json({
            items: await fetchItemsByUser(userID)
        });
    } catch (e) {
        console.log(e);
    }
});
router.post('/', async function(req, res, next) {
    try {
        const today = new Date();
        const newDate = { year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() }
        const addedOn = `${newDate.day}/${newDate.month}/${newDate.year}`
        const itemType = req.body.type;
        const itemSize = req.body.size;
        const itemStyle = req.body.style;
        const itemWashed = req.body.isWashed;
        const itemImage = req.body.image;
        const belongsTo = req.body.belongsTo;

        const ClothObj = {
            _id: new ObjectId(),
            belongsTo: belongsTo,
            type: itemType,
            size: itemSize,
            style: itemStyle,
            isWashed: !!itemWashed,
            addedOn: addedOn,
            image: itemImage,
        };
        Object.keys(ClothObj).forEach(key => {
            if(!ClothObj[key]) {
                delete ClothObj[key];
            }
        });
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