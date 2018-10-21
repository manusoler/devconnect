import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../actions/postActions";
import PostItem from "./PostItem";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;
    const { auth } = this.props;
    let postContent = <Spinner />;
    let commentsContent = null;
    if (post && !loading) {
      postContent = (
        <>
          <PostItem post={post} showOptions={false} />
          <CommentForm postId={post._id} />
        </>
      );
      if (post.comments) {
        commentsContent = post.comments.map((comment, index) => (
          <CommentItem key={index} comment={comment} post={post} auth={auth} />
        ));
      }
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back to feed
              </Link>
              {postContent}
              <div className="comments">{commentsContent}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
