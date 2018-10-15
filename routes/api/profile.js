const express = require("express");
const passport = require("passport");
const router = express.Router();

// Models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// Validators
const profileValidator = require("../../validation/profile");
const experienceValidator = require("../../validation/experience");
const educationValidator = require("../../validation/education");

/**
 * @route  GET api/profile/
 * @desc   Get current user profile
 * @access Private
 */
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
  }
);

/**
 * @route  GET api/profile/all
 * @desc   Get all profiles
 * @access Public
 */
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There is no profiles";
        res.status(404).json(errors);
      } else {
        res.json(profiles);
      }
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

/**
 * @route  GET api/profile/handle/:handle
 * @desc   Get profile by handle
 * @access Public
 */
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
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
});

/**
 * @route  GET api/profile/user/:user_id
 * @desc   Get profile by user id
 * @access Public
 */
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
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
      if (err.name === "CastError") {
        res.status(400).json({ user: "The user doesn't exist" });
      } else {
        res.status(400).json(err);
      }
    });
});

/**
 * @route  POST api/profile/
 * @desc   Create or update current user profile
 * @access Private
 */
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
    }
  }
);

/**
 * @route  POST api/profile/experience
 * @desc   Create or update current user experience
 * @access Private
 */
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = experienceValidator(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    } else {
      Profile.findOne({ user: req.user.id })
        .then(profile => {
          if (!profile) {
            res
              .status(404)
              .json({ profile: "There is no profile for this user" });
          } else {
            const newExp = {
              title: req.body.title,
              company: req.body.company,
              location: req.body.location,
              from: req.body.from,
              to: req.body.to,
              current: req.body.current,
              description: req.body.description
            };

            // Add to exp array
            profile.experience.unshift(newExp);

            profile.save().then(profile => res.json(profile));
          }
        })
        .catch(err => {
          res.status(400).json(err);
        });
    }
  }
);

/**
 * @route  DELETE api/profile/experience/:exp_id
 * @desc   Delete user experience
 * @access Private
 */
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          res
            .status(404)
            .json({ profile: "There is no profile for this user" });
        } else {
          // Get remove index
          const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id);
          // Splice out of array
          profile.experience.splice(removeIndex, 1);
          profile.save().then(profile => res.json(profile));
        }
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
);

/**
 * @route  POST api/profile/education
 * @desc   Create or update current user education
 * @access Private
 */
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = educationValidator(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    } else {
      Profile.findOne({ user: req.user.id })
        .then(profile => {
          if (!profile) {
            res
              .status(404)
              .json({ profile: "There is no profile for this user" });
          } else {
            const newEduc = {
              school: req.body.school,
              degree: req.body.degree,
              fieldofstudy: req.body.fieldofstudy,
              from: req.body.from,
              to: req.body.to,
              current: req.body.current,
              description: req.body.description
            };

            // Add to education to array
            profile.education.unshift(newEduc);

            profile.save().then(profile => res.json(profile));
          }
        })
        .catch(err => {
          res.status(400).json(err);
        });
    }
  }
);

/**
 * @route  DELETE api/profile/education/:edu_id
 * @desc   Delete user education
 * @access Private
 */
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          res
            .status(404)
            .json({ profile: "There is no profile for this user" });
        } else {
          // Get remove index
          const removeIndex = profile.education
            .map(item => item.id)
            .indexOf(req.params.edu_id);
          // Splice out of array
          profile.education.splice(removeIndex, 1);
          profile.save().then(profile => res.json(profile));
        }
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
);

/**
 * @route  DELETE api/profile/
 * @desc   Delete user and profile
 * @access Private
 */
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
          res.json({ success: "User deleted" })
        );
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
);

module.exports = router;
