const Router = require('express');
const router = Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const url = 'mongodb://10.0.0.101:27017';
const client = new MongoClient(url);
const md5 = require('md5');


router.post('/', async (req, res, next) => {
    console.log(`${md5(req.body.password).toString()}${Math.random() * 1000000000000000}`);
    const userData = { email, password, token };
    userData.email = req.body.email;
    userData.password = req.body.password;
    userData.token = `${md5(req.body.password).toString()}${Math.random() * 1000000000000000}`;
    console.log(userData.token);
    res.status(200).send({ message: "User Verified", data: userData }).redirect('/home');
});

module.exports = router;