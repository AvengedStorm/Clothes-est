const express = require('express');
const router = express.Router(); // subLibrary of express, allowing to defarantiet between routes.
const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://10.0.0.101:27017';
const client = new MongoClient(url);

const stringToObjectId = str => new ObjectId.createFromHexString(str);
const fetchUsers = async () => {
    await client.connect();
    const db = client.db('clothest');
    const collection = db.collection('users');
    return await collection.find().toArray();
};
const fetchUser = async (userId) => {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('users');
        return await collection.findOne({_id: stringToObjectId(userId)});
    } catch {
        return null;   
    }
};
const deleteUser = async (userId) => {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('users');
        if (await fetchItem(userId)) {
            return await collection.deleteOne({_id: stringToObjectId(userId)})
        }
        return null;
    } catch(e) {
        console.log(e);
        return null;
    }
};
const postUser = async (ClothObj) => {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('users');
        return await collection.insertOne(ClothObj);
    } catch {
        return null;
    }
};


router.get('/', async (req, res, next) => {
    res.status(200).json({
        users: await fetchUsers(req.params.userId),
    });
});

router.get('/:userId', async (req, res, next) => {
    res.status(200).json({
        user: await fetchUser(req.params.userId),
    });
});

router.post('/', async (req, res, next) => {
    const userObj = {
        email: req.body.email,
        password: req.body.password,
    };
    console.log(userObj);
    res.status(201).json({
        user: await postUser(userObj),
    });
});

router.delete('/:userId', async (req, res, next) => {
    const userId = req.params.userId;
     if (await deleteUser(userId)) {
         res.status(202).json({
             message: 'Handled DELETE request succesfully'
         });
     } else {
        res.status(404).json({
            message: 'User not found.'
        });
     }
});

module.exports = router;