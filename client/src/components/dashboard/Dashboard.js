import React, { Component } from "react";
import Education from "./Education";
import Experience from "./Experience";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              <p className="lead text-muted">Welcome {user.name}</p>

              <div className="btn-group mb-4" role="group">
                <a href="edit-profile.html" className="btn btn-light">
                  <i className="fas fa-user-circle text-info mr-1" /> Edit
                  Profile
                </a>
                <a href="add-experience.html" className="btn btn-light">
                  <i className="fab fa-black-tie text-info mr-1" />
                  Add Experience
                </a>
                <a href="add-education.html" className="btn btn-light">
                  <i className="fas fa-graduation-cap text-info mr-1" />
                  Add Education
                </a>
              </div>

              <Education />
              <Experience />

              <div style={{ marginBottom: "60px" }}>
                <button className="btn btn-danger">Delete My Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(withRouter(Dashboard));
