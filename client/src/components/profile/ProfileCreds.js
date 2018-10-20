import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    const experienceList = experience.map((exp, index) => (
      <li key={index} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="MMM YYYY">{exp.from}</Moment> {" - "}
          {exp.current ? (
            "Current"
          ) : (
            <Moment format="MMM YYYY">{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position:</strong> {exp.title}
        </p>
        <p>
          <strong>Description:</strong> {exp.description}
        </p>
      </li>
    ));

    const educationList = education.map((edu, index) => (
      <li key={index} className="list-group-item">
        <h4>{edu.college}</h4>
        <p>
          <Moment format="MMM YYYY">{edu.from}</Moment> {" - "}
          {edu.current ? "Now" : <Moment format="MMM YYYY">{edu.to}</Moment>}
        </p>
        <p>
          <strong>Degree: </strong> {edu.degree}
        </p>
        <p>
          <strong>Field Of Study: </strong> {edu.fieldofstudy}
        </p>
        <p>
          <strong>Description:</strong> {edu.description}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          <ul className="list-group">
            {experienceList.length ? experienceList : "No Experience Listed"}
          </ul>
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          <ul className="list-group">
            {educationList.length ? educationList : "No Education Listed"}
          </ul>
        </div>
      </div>
    );
  }
}

ProfileCreds.propTypes = {
  experience: PropTypes.array.isRequired,
  education: PropTypes.array.isRequired
};

export default ProfileCreds;
