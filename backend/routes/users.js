const router = require('express').Router();
let User = require('../models/user.model');
const bycrpt = require('bcryptjs');
const passport = require('passport');
const JWT = require('jsonwebtoken');
const JWT_SECRET = require('../config').JWT_SECRET;




/**************GET USERS*************/
router.route('/').get(passport.authenticate('jwt', { session: false }), (req, res) => {

    User.find().then(users => res.json(users)).catch(err => res.status(400).json('Error:' + err))

})


/*******Register*********/
router.route('/register').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const Firstname = req.body.Firstname;
    const Lastname = req.body.Lastname;
    const borndate = req.body.borndate;
    User.findOne({ email: email }).then(user => {
        if (user) {
            console.log("user exists!")
            res.json('user exists');
        }
        else {
            const newUser = new User({
                username,
                email,
                password,
                Firstname,
                Lastname,
                borndate
            })
            bycrpt.genSalt(10, (err, salt) =>
                bycrpt.hash(newUser.password, salt, (err, hash) => {
                    newUser.password = hash;
                    const token = JWT.sign(newUser.toJSON(), JWT_SECRET);
                    res.cookie('access_token', token, { expires: new Date(Date.now() + 900000), httpOnly: true });
                    newUser.save().then(() => res.json('user registred and you can log in your token is : ' + token)).catch(err => res.status(400).json('Error:' + err));
                }));

        }

    })

})
//Login handle 
router.route('/login').post(function (req, res, next) {

    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log(err);
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user: user
            });
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }

            const token = JWT.sign(user.toJSON(), JWT_SECRET);
            res.cookie('access_token', token, { expires: new Date(Date.now() + 900000), httpOnly: true });
            return res.json({ user, token });
        });
    })
        (req, res);

});

//Logout 
router.route('/logout').get((req, res) => {
    res.clearCookie('access_token');
    req.logout();
    res.json("logged out ")
    console.log('Logged out');

})


module.exports = router;