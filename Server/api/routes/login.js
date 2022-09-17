const Router = require('express');
const router = Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const md5 = require('md5');

const fetchUser = async (hashedUser, token) => {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('users');
        const res = collection.findOne({hashedData: hashedUser});
        collection.updateOne({ hashedData: hashedUser },
        {
          $set: { token },
          $currentDate: { lastUpdated: true }
        })
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
        const hashedUserData = req.body.hashedUserData;
        const token = `${hashedUserData}${Math.round(Math.random() * 1000000000000000)}`;
        const userIdentifier = await fetchUser(hashedUserData, token);
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