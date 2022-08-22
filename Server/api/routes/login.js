const Router = require('express');
const router = Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const md5 = require('md5');

const fetchUser = async (userCredentials) => {
    try {
        await client.connect();
        const db = client.db('clothest');
        const collection = db.collection('users');
        const res = collection.findOne({email: userCredentials});
        const res1 = await res;
        return res1;
    } catch(e) {
        console.log(e)
    }
};
router.get('/:userID', async function(req, res, next) {
    try {
        const userID = req.params.userID

        const USER_ID = await fetchUser(req.body.email.toLowerCase())
        res.status(200).json({
            user: await fetchUser(userID)
        });
    } catch (e) {
        console.log(e);
    }
});
router.post('/', async (req, res, next) => {
    try {
        const token = md5(req.body.password).toString() + Math.round(Math.random() * 1000000000000000);
        // console.log(token);
        const userEmail = req.body.email;
        // console.log(userEmail);
        // const userPassword = req.body.password;
        // console.log(userPassword);
        const USER_ID = await fetchUser(req.body.email.toLowerCase())
        // console.log(USER_ID);
        const userData = { email: userEmail, token: token, userID: USER_ID};
        // console.log(userData);
        if (USER_ID) {
            res.status(200).send({ 
                message: "User Verified.", 
                userCredentials: userData 
            }).redirect("/home");
        } else {
            res.status(200).send({
                message: "User Not Found.",
            })
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;