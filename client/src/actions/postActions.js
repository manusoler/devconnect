import axios from "axios";
import {
  GET_ERRORS,
  ADD_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST,
  GET_POST
} from "./types";

// add comment
export const addComment = (postId, commentData) => dispatch => {
  // delete errors
  dispatch({ type: GET_ERRORS, payload: {} });
  // add comment
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res => dispatch({ type: GET_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// add post
export const addPost = postData => dispatch => {
  // delete errors
  dispatch({ type: GET_ERRORS, payload: {} });
  // add post
  axios
    .post("/api/posts", postData)
    .then(res => dispatch({ type: ADD_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// delete post
export const deletePost = postId => dispatch => {
  axios
    .delete(`/api/posts/${postId}`)
    .then(res => dispatch({ type: DELETE_POST, payload: postId }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// add like
export const likePost = postId => dispatch => {
  axios
    .post(`/api/posts/like/${postId}`)
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// remove like
export const unlikePost = postId => dispatch => {
  axios
    .post(`/api/posts/unlike/${postId}`)
    .then(res => dispatch(getPosts()))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// get posts
export const getPosts = () => dispatch => {
  dispatch({ type: POST_LOADING });
  axios
    .get("/api/posts")
    .then(res => dispatch({ type: GET_POSTS, payload: res.data }))
    .catch(err => dispatch({ type: GET_POSTS, payload: null }));
};

// get post
export const getPost = id => dispatch => {
  dispatch({ type: POST_LOADING });
  axios
    .get(`/api/posts/${id}`)
    .then(res => dispatch({ type: GET_POST, payload: res.data }))
    .catch(err => dispatch({ type: GET_POST, payload: null }));
};
