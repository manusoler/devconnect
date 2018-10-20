import React, { Component } from "react";
import PropTypes from "prop-types";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    const firstName = profile.user.name.trim().split(" ")[0];

    let skillSet = [];
    if (profile.skills) {
      skillSet = profile.skills.map((skill, index) => (
        <div key={index} class="p-3">
          <i class="fa fa-check" /> {skill}
        </div>
      ));

      return (
        <div class="row">
          <div class="col-md-12">
            <div class="card card-body bg-light mb-3">
              <h3 class="text-center text-info">
                {firstName}
                's Bio
              </h3>
              <p class="lead">
                {profile.bio || `${firstName} does not have a bio`}
              </p>
              <hr />
              <h3 class="text-center text-info">Skill Set</h3>
              <div class="row">
                <div class="d-flex flex-wrap justify-content-center align-items-center">
                  {skillSet}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
