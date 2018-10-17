import React, { Component } from "react";
import ProfileItem from "./ProfileItem";

class Profiles extends Component {
  render() {
    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>

              <ProfileItem />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profiles;
