import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/postActions";

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { comment, auth, post } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to="/profile">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </Link>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                type="button"
                onClick={this.onDeleteClick.bind(this, post._id, comment._id)}
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default connect(
  null,
  { deleteComment }
)(CommentItem);
