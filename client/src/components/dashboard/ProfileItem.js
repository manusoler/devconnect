import React from "react";
import { Link } from "react-router-dom";

const ProfileItem = props => {
  const profile = props.profile;
  let currentExp = profile.experience.filter(exp => exp.current === true);
  currentExp = currentExp.length ? currentExp[0] : null;
  let skillSet = [];
  if (profile.skills) {
    skillSet = profile.skills.map((skill, index) => (
      <li key={index} className="list-group-item">
        <i className="fa fa-check pr-1" />
        {skill}
      </li>
    ));
  }
  return (
    <div className="card card-body bg-light mb-3">
      <div className="row">
        <div className="col-2">
          <img className="rounded-circle" src={profile.user.avatar} alt="" />
        </div>
        <div className="col-lg-6 col-md-4 col-8">
          <h3>{profile.user.name}</h3>
          <p>
            {currentExp ? `${currentExp.title} at ${currentExp.company}` : ""}
          </p>
          <p>{currentExp ? currentExp.location : ""}</p>
          <Link to={`/profile/${profile.handle}`} className="btn btn-info">
            View Profile
          </Link>
        </div>
        <div className="col-md-4 d-none d-lg-block">
          <h4>Skill Set</h4>
          <ul className="list-group">{skillSet}</ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileItem;
