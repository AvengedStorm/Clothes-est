const Router = require('express');
const router = Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const md5 = require('md5');
/*
  https://source.unsplash.com/random
*/
const stringToObjectId = str => new ObjectId.createFromHexString(str);

const fetchUsers = async () => {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('users');
        return await collection.find().toArray();
    } catch (err) {
        console.log(err)
    }
};
const fetchUser = async (userO) => {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('users');
        const userInput = await collection.findOne({email: userO});
        return userInput
    } catch(e) {
        console.log(e)
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
        ).then(() => client.close());
        return insert_result;
    } catch(e) {
        console.log(e);
    }
};
const deleteUser = async (userId) => {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('users');
        if (await fetchUser(userId)) {
            return await collection.deleteOne({_id: stringToObjectId(userId)}).then(() => client.close());
        }
        return null;
    } catch(e) {
        console.log(e);
    }
};
const postUser = async (ClothObj) => {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('users');
        const userInput = await collection.insertOne(ClothObj).then(() => client.close());
        return userInput
    } catch(err) {
        console.log(err)
    }
};

router.get('/', async (req, res, next) => {
    try {
        res.status(200).json({
            users: await fetchUsers(req.params.userId),
        });
    } catch (err) {
        console.log(err)
    }
});
router.get('/:userEmail', async (req, res, next) => {
    try {
        res.status(200).json({
            user: await fetchUser(req.params.userEmail),
        });
    } catch (err) {
        console.log(err)
    }
});
router.post('/', async (req, res, next) => {
    try {
        const emailField = req.body.email.toLowerCase();
        const userObj = {
            email: emailField,
        };
        const userData = {
            firstName: req.body.firstName.toLowerCase(),
            lastName: req.body.lastName.toLowerCase(),
            email: req.body.email.toLowerCase(), 
            password: md5(req.body.password),
        }
        const fetchedUser = await fetchUser(userObj);
        if (!fetchedUser) {
            postUser(userData);
        } else {
            console.log("Existing account Found!");
        }
    } catch (err) {
        console.log(err);
    }
});
router.patch('/:userId', async (req, res, next) => {
    try {
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
    } catch (err) {
        console.log(err)
    }
});
router.delete('/:userId', async (req, res, next) => {
    try {
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
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;