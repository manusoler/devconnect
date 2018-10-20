import React, { Component } from "react";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">
                {profile.status}{" "}
                {profile.company ? `at ${profile.company}` : null}
              </p>
              {profile.location ? <p>{profile.location}</p> : null}
              <p>
                {profile.website ? (
                  <a
                    className="text-white p-2"
                    href={profile.website}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                ) : null}

                {profile.social && profile.social.twitter ? (
                  <a
                    className="text-white p-2"
                    href={profile.social.twitter}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                ) : null}

                {profile.social && profile.social.facebook ? (
                  <a
                    className="text-white p-2"
                    href={profile.social.facebook}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                ) : null}
                {profile.social && profile.social.youtube ? (
                  <a
                    className="text-white p-2"
                    href={profile.social.youtube}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i className="fab fa-youtube fa-2x" />
                  </a>
                ) : null}
                {profile.social && profile.social.linkedin ? (
                  <a
                    className="text-white p-2"
                    href={profile.social.linkedin}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                ) : null}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
