import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    const experienceList = experience.map((exp, index) => (
      <li key={index} class="list-group-item">
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
      <li key={index} class="list-group-item">
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
      <div class="row">
        <div class="col-md-6">
          <h3 class="text-center text-info">Experience</h3>
          <ul class="list-group">
            {experienceList.length ? experienceList : "No Experience Listed"}
          </ul>
        </div>
        <div class="col-md-6">
          <h3 class="text-center text-info">Education</h3>
          <ul class="list-group">
            {educationList.length ? educationList : "No Education Listed"}
          </ul>
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
