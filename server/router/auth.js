const { response } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const authenticate = require("../middleware/authenticate")
require('../dbb/conn')
const User = require("../model/userschema")
const cookieParser = require("cookie-parser");
router.use(cookieParser())
router.get('/', async (req, res) => {
    res.send("Helo world from server router");
});
router.post('/register', async (req, res) => {
    const { name, phone, email, address, password } = req.body;
    if (!req.body.name || !req.body.phone || !req.body.address || !req.body.email || !req.body.password) {
        return res.status(422).json({ error: "Please fill everything" });
    }

    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }
        const user = new User({ name, phone, email, address, password });
        await user.save()
        res.status(201).json({ message: "User saved " });
    }
    catch (err) {
        console.log(err)
    }
})
router.post('/getdata', authenticate, (req, res) => {
    res.send(req.rootuser);
})
router.post('/signin', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ error: "Please fill the data" })
        }
        const userLogin = await User.findOne({ email: email });

        if (userLogin) {
            const ismatch = await bcrypt.compare(password, userLogin.password);
            token = await userLogin.generateAuthToken();
            console.log(token)


            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            if (!ismatch) {
                res.status(400).json({ error: "User signin unsuccessful" });
            }
            else {
                res.json({ message: "User signin successful" })
            }

        }
        else {
            res.status(400).json({ error: "Invalid Credentials" });
        }
        console.log(userLogin)
    }
    catch (err) {
        console.log(err);
    }
})


router.get('/about', authenticate, (req, res) => {
    console.log("Hello")
    res.send(req.rootUser)
})

router.get('/getdata', authenticate, (req, res) => {
    res.send(req.rootUser);
})

router.get('/logout', authenticate, (req, res) => {
    console.log("Hello logout")
    res.clearCookie("jwtoken", { path: '/' })
    res.status(200).send('User logout')

})

router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, type, description } = req.body;
        if (!name || !phone || !email || !type || !description) {
            console.log("error")
            return res.json({ error: "please fill contact form" })
        }
        const userContact = await User.findOne({ _id: req.userID });
        if (userContact) {
            const usermessage = await userContact.addmessage(name, email, phone, type, description)
            await userContact.save();
            res.status(201).json({ message: "Task completed" })
        }
    }
    catch (err) {
        console.log(err)
    }
})

router.get('/data1', async (req, res) => {
    try {

        const userLogin = await User.find();

        if (userLogin) {
            res.send(userLogin)

        }
        else {
            res.status(400).json({ error: "Error in fetching data" });
        }
    
    }
    catch (err) {
        console.log(err);
    }
})




module.exports = router;