import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deletePost, likePost, unlikePost } from "../../actions/postActions";
import classnames from "classnames";

class PostItem extends Component {
  onDeleteClick(postId) {
    this.props.deletePost(postId);
  }
  onClickUnlike(postId) {
    this.props.unlikePost(postId);
  }
  onClickLike(postId) {
    this.props.likePost(postId);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    return likes.some(like => like.user === auth.user.id);
  }

  render() {
    const { post, auth, showOptions } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to={`/profile/`}>
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </Link>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showOptions ? (
              <>
                <button
                  type="button"
                  onClick={this.onClickLike.bind(this, post._id)}
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button
                  type="button"
                  onClick={this.onClickUnlike.bind(this, post._id)}
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down" />
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    type="button"
                    onClick={this.onDeleteClick.bind(this, post._id)}
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showOptions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  showOptions: PropTypes.bool,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { deletePost, unlikePost, likePost }
)(PostItem);
