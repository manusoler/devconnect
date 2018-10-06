const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys');

// Load validation
const registerValidation = require('../../validation/register');
const loginValidation = require('../../validation/login');

// User model
const User = require('../../models/User');

router.post('/login', (req, res) => {
    const {
        errors,
        isValid
    } = loginValidation(req.body);
    if (!isValid) {
        res.status(400).json(errors);
    } else {
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
                bcrypt.compare(password, user.password)
                    .then((isMatch) => {
                        if (isMatch) {
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
    }
});

router.post('/register', (req, res) => {
    const {
        errors,
        isValid
    } = registerValidation(req.body);
    if (!isValid) {
        res.status(400).json(errors);
    } else {
        User.findOne({
            email: req.body.email
        }).then(user => {
            if (user) {
                errors.email = 'Email already exists';
                res.status(400).json(errors);
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
    }
});

router.get('/current', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar
    });
});

module.exports = router;