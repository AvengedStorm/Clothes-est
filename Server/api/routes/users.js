import { Router } from 'express';
const router = Router(); // subLibrary of express, allowing to defarantiet between routes.
import { MongoClient, ObjectId } from 'mongodb';
const url = 'mongodb://localhost:27017';
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
const updateUser = async (userId, user) => {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('users');
        let oid = await stringToObjectId(userId);
        let insert_result =  await collection.updateOne(
            {"_id": oid},
            {'$set': user}
        );
        console.log(insert_result, oid);
        return insert_result;
    } catch(e) {
        console.log(e);
        return null;
    }
};
const deleteUser = async (userId) => {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('users');
        if (await fetchUser(userId)) {
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
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    };
    await postUser(userObj)
    console.log(userObj);
    res.status(201).json({
        user: userObj,
    });
});

router.patch('/:userId', async (req, res, next) => {
    const userId = req.params.userId;
    const user = {
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        };
    Object.keys(user).forEach(key => {
        if(!user[key]) {
            delete user[key];
        }
    });
    await updateUser(userId, user);
    console.log(user);
    res.status(202).json({
        updated: user
    });
});

router.delete('/:userId', async (req, res, next) => {
    const userId = req.params.userId;
     if (await deleteUser(userId)) {
         res.status(202).json({
             message: 'User deleted successfully!'
         });
     } else {
        res.status(404).json({
            message: 'User not found.'
        });
     }
});

export default router;