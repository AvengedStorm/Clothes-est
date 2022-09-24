const { json } = require('body-parser');
const Router = require('express');
const router = Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const stringToObjectId = str => {
    try {
        return ObjectId.createFromHexString(str)
    } catch(ex) {
        console.log(ex);
    }
}
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
const updateItemToClean = async function(itemId, itemObject) {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('clothes');
        return await collection.updateOne({_id: stringToObjectId(itemId)}, {$set: {'isWashed': true}});
    } catch(ex) {
        return ex;
    }
};
const updateItemToDirty = async function(itemId, itemObject) {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('clothes');
        return await collection.updateOne({_id: stringToObjectId(itemId)}, {$set: {'isWashed': false}});
    } catch(ex) {
        return ex;
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
const deleteItems = async function(itemIds) {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('clothes');
        // console.log(itemIds);
        const myQuery = {_id: { $in: itemIds.map(stringToObjectId)}}
        return await collection.deleteMany(myQuery);
    } catch(e) {
        console.log(e);
    }
};
const postItem = async function(ClothObj) {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('clothes');
        return await collection.insertOne(ClothObj);
    } catch (e) {
        console.log(e);
        return e.response.data;
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
        const newDate = { 
            year: today.getFullYear(), 
            month: today.getMonth() + 1, 
            day: today.getDate() 
        }
        const addedOn = `${newDate.day}/${newDate.month}/${newDate.year}`
        const itemType = req.body.type;
        const itemSize = req.body.size;
        const itemStyle = req.body.style;
        let itemWashed;
        if(req.body.isWashed === 'yes') {
            itemWashed = true;
            // console.log(itemWashed);
        } else {
            itemWashed = false;
            // console.log(itemWashed);
        };
        const itemImage = req.body.image;
        const belongsTo = req.body.belongsTo;

        const ClothObj = {
            _id: new ObjectId(),
            belongsTo: belongsTo,
            type: itemType,
            size: itemSize,
            style: itemStyle,
            isWashed: itemWashed,
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
            message: "Item Added!",
        });
    } catch (e) {
        console.log(e);
    }
});
router.post('/:itemId', async function(req, res, next) {
    const itemId = req.params.itemId;
    const cloth = req.body;

    if(cloth.isWashed) {
        await updateItemToDirty(itemId)
        res.status(200),json({
            message: "Item Updated"
        })
    } else {
        await updateItemToClean(itemId)
        res.status(200),json({
            message: "Item Updated"
        })
    }
});
router.delete('/:itemId', async function(req, res, next) {
    const itemIdentifier = req.body._id;
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
router.delete('/', async function(req, res, next) {
    const ids = [];
    const itemIdentifiers = req.body;
    itemIdentifiers.map(item => ids.push(item._id) )
    // console.log(ids);
    ids.forEach((id) => deleteItem(id));
});

module.exports = router;