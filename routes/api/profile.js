const express = require("express");
const passport = require("passport");
const router = express.Router();

// Models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
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
    const errors = {};

    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.handle = req.body.handle ? req.body.handle : null;
    profileFields.company = req.body.company ? req.body.company : null;
    profileFields.website = req.body.website ? req.body.website : null;
    profileFields.location = req.body.location ? req.body.location : null;
    profileFields.status = req.body.status ? req.body.status : null;
    profileFields.bio = req.body.bio ? req.body.bio : null;
    profileFields.githubusername = req.body.githubusername
      ? req.body.githubusername
      : null;
    profileFields.skills = req.body.skills ? req.body.skills.split(",") : null;

    profileFields.social = {};
    profileFields.social.youtube = req.body.youtube ? req.body.youtube : null;
    profileFields.social.linkedin = req.body.linkedin
      ? req.body.linkedin
      : null;
    profileFields.social.twitter = req.body.twitter ? req.body.twitter : null;
    profileFields.social.facebook = req.body.facebook
      ? req.body.facebook
      : null;

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
        }
      })
      .catch(err => {
        res.status(400).json(err);
      });
    req.user;
  }
);

module.exports = router;
