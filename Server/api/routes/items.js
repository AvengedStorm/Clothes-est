const Router = require('express');
const router = Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://10.0.0.101:27017';
const client = new MongoClient(url);

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    fileName: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalName)
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter,
});

const stringToObjectId = str => new ObjectId.createFromHexString(str);
const fetchItems = async function() {
    await client.connect();
    const db = client.db('clothest');
    const collection = db.collection('clothes');
    return await collection.find().toArray();
};
const fetchItem = async function(itemId) {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('clothes');
        return await collection.findOne({_id: stringToObjectId(itemId)});
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
    res.status(200).json({
        items: await fetchItems(req.params.itemId),
    });
});
router.get('/:itemId', async function(req, res, next) {
    res.status(200).json({
        item: await fetchItem(req.params.itemId),
    });
});
router.post('/', async function(req, res, next) {
    try {
        const newDate = () => new Date().getTime().toString();
        const addedOn = newDate();
        const itemType = req.body.type;
        const itemSize = req.body.size;
        const itemStyle = req.body.style;
        const itemWashed = req.body.isWashed;
        const itemImage = req.body.image;

        const ClothObj = {
            _id: new ObjectId(),
            type: itemType,
            size: itemSize,
            style: itemStyle,
            isWashed: itemWashed,
            image: itemImage,
            addedOn: addedOn,  
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
         console.log("Yes");
         res.status(202).json({
             message: 'Handled DELETE request succesfully'
         });
     } else {
        console.log("No");
        res.status(404).json({
            message: 'Item not found.'
        });
     }
});

module.exports = router;