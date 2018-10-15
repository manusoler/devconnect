const express = require("express");
const passport = require("passport");
const router = express.Router();

// Models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// Validators
const profileValidator = require("../../validation/profile");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          res.status(404).json(errors);
        } else {
          res.json(profile);
        }
      })
      .catch(err => {
        res.status(400).json(err);
      });
    req.user;
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = profileValidator(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    } else {
      const profileFields = {};
      profileFields.user = req.user.id;
      if (req.body.handle) profileFields.handle = req.body.handle;
      if (req.body.company) profileFields.company = req.body.company;
      if (req.body.website) profileFields.website = req.body.website;
      if (req.body.location) profileFields.location = req.body.location;
      if (req.body.status) profileFields.status = req.body.status;
      if (req.body.bio) profileFields.bio = req.body.bio;
      if (req.body.githubusername)
        profileFields.githubusername = req.body.githubusername;
      if (req.body.skills) profileFields.skills = req.body.skills.split(",");

      profileFields.social = {};
      if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
      if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
      if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
      if (req.body.facebook) profileFields.social.facebook = req.body.facebook;

      Profile.findOne({ user: req.user.id })
        .then(profile => {
          if (profile) {
            // Update the profile
            Profile.findOneAndUpdate(
              { user: req.user.id },
              { $set: profileFields },
              { new: true }
            ).then(profile => res.json(profile));
          } else {
            // Create the profile
            // Check if handle already exists
            Profile.findOne({ handle: profileFields.handle }).then(profile => {
              if (profile) {
                errors.handle = "That handle already exists";
                res.status(400).json(errors);
              } else {
                // Create new profile
                new Profile(profileFields)
                  .save()
                  .then(profile => res.json(profile));
              }
            });
          }
        })
        .catch(err => {
          res.status(400).json(err);
        });
      req.user;
    }
  }
);

module.exports = router;
