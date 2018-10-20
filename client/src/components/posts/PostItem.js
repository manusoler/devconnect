import React from "react";
import PropTypes from "prop-types";

const PostItem = props => {
  const { post } = props;
  return (
    <div class="card card-body mb-3">
      <div class="row">
        <div class="col-md-2">
          <a href="profile.html">
            <img
              class="rounded-circle d-none d-md-block"
              src={post.avatar}
              alt=""
            />
          </a>
          <br />
          <p class="text-center">{post.name}</p>
        </div>
        <div class="col-md-10">
          <p class="lead">{post.text}</p>
          <button type="button" class="btn btn-light mr-1">
            <i class="text-info fas fa-thumbs-up" />
            <span class="badge badge-light">4</span>
          </button>
          <button type="button" class="btn btn-light mr-1">
            <i class="text-secondary fas fa-thumbs-down" />
          </button>
          <a href="post.html" class="btn btn-info mr-1">
            Comments
          </a>
          <button type="button" class="btn btn-danger mr-1">
            <i class="fas fa-times" />
          </button>
        </div>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostItem;
