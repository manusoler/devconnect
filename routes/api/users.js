const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// User model
const User = require('../../models/User');

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Finde user by email
    User.findOne({
        email
    }).then(user => {
        if (!user) {
            res.status(404).json({
                email: 'User not found'
            });
        } else {
            // Check password
            bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    // User match

                    // Sign token
                    const payload = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    };
                    const token = jwt.sign(payload, keys.jwtKey, {
                        expiresIn: 3600
                    });

                    res.json({
                        success: true,
                        token: `Bearer ${token}`
                    });
                } else {
                    res.status(400).json({
                        password: 'Password incorrect'
                    });
                }
            });
        }
    });
});

router.post('/register', (req, res) => {
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            res.status(400).json({
                email: 'Email already exists'
            });
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200', // Size
                r: 'pg', // Rating
                d: 'mm' // Default
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });
            bcrypt.genSalt(10).then(salt => {
                return bcrypt.hash(newUser.password, salt);
            }).then(hash => {
                newUser.password = hash;
                return newUser.save();
            }).then(user => {
                res.json(user);
            }).catch(err => console.log(err));
        }
    });
});

module.exports = router;