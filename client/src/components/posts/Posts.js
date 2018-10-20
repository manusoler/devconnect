import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import PostItem from "./PostItem";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postsContent = <Spinner />;
    if (posts && !loading) {
      postsContent = posts.map((post, index) => (
        <PostItem key={index} post={post} />
      ));
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <PostForm />
              <div class="posts">{postsContent}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
