const Router = require('express');
const router = Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const md5 = require('md5');

const fetchUser = async (hashedUser) => {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('users');
        const res = collection.findOne({hashedData: hashedUser});
        const res1 = await res;
        return res1;
    } catch(e) {
        console.log(e)
    }
};
router.get('/:userID', async function(req, res, next) {
    try {
        const userID = req.params.userID

        // const userObject = await fetchUser(userID)
        // res.status(200).json({
        //     user: await fetchUser(userID)
        // });
        if(await fetchUser(userID)) {
            res.status(200).json({
                user: userID
            });
        } else {
            res.status(200).send({
                message: "Not Found"
            })
        }
    } catch (e) {
        console.log(e);
    }
});
router.post('/', async (req, res, next) => {
    try {
        const userEmail = req.body.email;
        const userPassword = req.body.password;
        const hashedUserPassword = md5(userPassword);
        const hashedUserData = req.body.hashedUserData;
        const userIdentifier = await fetchUser(hashedUserData);
        const belongsTo = userIdentifier?.hashedData;
        if (userIdentifier) {
            res.status(200).send({ 
                message: "User Verified.", 
                userData: belongsTo 
            });
        } else {
            res.status(200).send({
                message: "User Not Found.",
            })
        }
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;