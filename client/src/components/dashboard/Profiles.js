import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfiles } from "../../actions/profileActions";
import ProfileItem from "../dashboard/ProfileItem";
import Spinner from "../common/Spinner";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;

    let profilesContent = [];

    if (!profiles || loading) {
      profilesContent = <Spinner />;
    } else if (profiles && profiles.length) {
      profilesContent = profiles.map((prof, index) => (
        <ProfileItem key={index} profile={prof} />
      ));
    } else {
      profilesContent = <p>No profiles yet</p>;
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {profilesContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
