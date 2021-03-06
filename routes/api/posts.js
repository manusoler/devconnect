const express = require("express");
const router = express.Router();
const passport = require("passport");
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
  Post.findOne({ _id: req.params.post_id })
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

/**
 * @route  POST api/posts/like/:id
 * @desc   Like a post
 * @access Private
 */
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findOne({ _id: req.params.id })
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id).length
        ) {
          res
            .status(400)
            .json({ alreadyliked: "User already liked this post" });
        } else {
          // Add to the array
          post.likes.unshift({ user: req.user.id });
          // Save
          post.save().then(post => res.json(post));
        }
      })
      .catch(err => res.status(404).json({ post: "Post not found " }));
  }
);

/**
 * @route  POST api/posts/unlike/:id
 * @desc   Unlike a post
 * @access Private
 */
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findOne({ _id: req.params.id })
      .then(post => {
        if (
          !post.likes.filter(like => like.user.toString() === req.user.id)
            .length
        ) {
          res.status(400).json({ notliked: "User didnt't like this post" });
        } else {
          // Get remove index
          const removeIndex = post.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);
          // Splice out of the array
          post.likes.splice(removeIndex, 1);
          // Save
          post.save().then(post => res.json(post));
        }
      })
      .catch(err => res.status(404).json({ post: "Post not found " }));
  }
);

/**
 * @route  POST api/posts/comment/:id
 * @desc   Comment a post
 * @access Private
 */
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = postValidation(req.body);
    if (!isValid) {
      res.status(400).json(errors);
    } else {
      Post.findById(req.params.id)
        .then(post => {
          const newComment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
          };
          // Add to comments array
          post.comments.unshift(newComment);
          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ post: "Post not found " }));
    }
  }
);

/**
 * @route  DELETE api/posts/comment/:id/:comment_id
 * @desc   Delete a comment
 * @access Private
 */
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check if comment exists
        if (
          !post.comments.filter(
            com => com._id.toString() === req.params.comment_id
          ).length
        ) {
          res.status(404).json({ comment: "Comment not found " });
        } else {
          // Get remove index from comments array
          const removeIndex = post.comments
            .map(item => item._id.toString())
            .indexOf(req.params.comment_id);
          // Splice out of the array
          post.comments.splice(removeIndex, 1);
          // Save posts
          post
            .save()
            .then(post => res.json(post))
            .catch(err => res.status(400).json(err));
        }
      })
      .catch(err => res.status(404).json({ post: "Post not found " }));
  }
);

module.exports = router;
