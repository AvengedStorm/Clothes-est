const Router = require('express');
const router = Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://10.0.0.101:27017';
const client = new MongoClient(url);
const md5 = require('md5');
/*
  // https://source.unsplash.com/random
*/
const stringToObjectId = str => new ObjectId.createFromHexString(str);

const fetchUsers = async () => {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('users');
        return await collection.find().toArray().then(() => client.close());
    } catch (err) {
        console.log(err)
    }
};
const handleUserLogin = (email, pwd) => {
    let tempuser = fetchUser(email);
    if(tempuser && tempuser.password === md5(pwd)) {
        console.log("Hurray we logged in");
    } else {
        console.log("no hekkerz plz");
    }
}
const fetchUser = async (userO) => {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('users');
        const userInput = await collection.findOne({email: userO.email});
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
        console.log(ClothObj.toString() + "located");
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

router.get('/:userId', async (req, res, next) => {
    try {
        res.status(200).json({
            user: await fetchUser(req.params.userId),
        });
    } catch (err) {
        console.log(err)
    }
});

router.post('/', async (req, res, next) => {
    console.log(`Starting with ${req.body.email.toLowerCase()} and ${req.body.password} for good measure.`);
    const emailField = req.body.email.toLowerCase();
    const userObj = {
        email: emailField,
        password: req.body.password,
    };
    console.log(`So now we have ${userObj.email} and ${userObj.password} and we hash the shit out of the password`);
    const userData = { 
        email: req.body.email.toLowerCase(), 
        password: md5(req.body.password)
    }
    console.log(`after that, we have an email and a hash-ed password: ${userData.password}`);
    const fetchedUser = await fetchUser(userObj);
    console.log(`Now we are attempting at fetching a user from a db, and if we don't succeed, we can print it to the DB.`);
    console.log(`Our fetched user is: ${fetchedUser}.`);
    console.log(`Our printed user is ${JSON.stringify(userData)}`);
    
    try {
        if (!fetchedUser) {
            console.log("Printing to the DB");
            postUser(userData);
        } else {
            console.log("Account Found!");
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