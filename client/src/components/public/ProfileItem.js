import React, { Component } from "react";

class ProfileItem extends Component {
  render() {
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img
              className="rounded-circle"
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
              alt=""
            />
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h3>John Doe</h3>
            <p>Developer at Microsoft</p>
            <p>Seattle, WA</p>
            <a href="profile.html" className="btn btn-info">
              View Profile
            </a>
          </div>
          <div className="col-md-4 d-none d-lg-block">
            <h4>Skill Set</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <i className="fa fa-check pr-1" />
                HTML
              </li>
              <li className="list-group-item">
                <i className="fa fa-check pr-1" />
                CSS
              </li>
              <li className="list-group-item">
                <i className="fa fa-check pr-1" />
                JavaScript
              </li>
              <li className="list-group-item">
                <i className="fa fa-check pr-1" />
                Python
              </li>
              <li className="list-group-item">
                <i className="fa fa-check pr-1" />
                C#
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileItem;
