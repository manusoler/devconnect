const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../models/Profile");
const Post = require("../../models/Posts");

const postValidation = require("../../validation/post");

/**
 * @route  GET api/posts
 * @desc   Get all posts
 * @access Public
 */
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json({ posts: "No posts found" }));
});

/**
 * @route  GET api/posts/:post_id
 * @desc   Get a post by id
 * @access Public
 */
router.get("/:post_id", (req, res) => {
  Post.find({ _id: req.params.post_id })
    .then(post => res.json(post))
    .catch(err => res.status(400).json({ post: "No post found with that ID" }));
});

/**
 * @route  POST api/posts/
 * @desc   Create a post
 * @access Private
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = postValidation(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    } else {
      const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      });
      newPost.save().then(post => res.json(post));
    }
  }
);

/**
 * @route  DELETE api/posts/:post_id
 * @desc   Delete a post
 * @access Private
 */
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.post_id)
      .then(post => {
        // Check if user is the owner
        if (post.user.toString() !== req.user.id) {
          res.status(401).json({ notauthorized: "User not authorized" });
        } else {
          post
            .remove()
            .then(() => res.json({ success: true }))
            .catch(err => res.status(400).json(err));
        }
      })
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;
