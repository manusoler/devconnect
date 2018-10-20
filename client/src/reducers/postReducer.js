import {
  GET_POST,
  DELETE_POST,
  POST_LOADING,
  ADD_POST,
  GET_POSTS
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POST:
      return state;
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case DELETE_POST:
      return state;
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
