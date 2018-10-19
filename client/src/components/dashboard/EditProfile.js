import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import { Link, withRouter } from "react-router-dom";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      errors: []
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = { ...nextProps.profile.profile };
      if (profile.skills && profile.skills.length) {
        profile.skills = profile.skills.join(",");
      }
      this.setState({ ...profile });
    }
  }

  onSubmit = evt => {
    evt.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube
    };
    this.props.createProfile(profileData, this.props.history);
  };

  onChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  toggleSocialNetworks = evt => {
    this.setState({ displaySocialInputs: !this.state.displaySocialInputs });
  };

  render() {
    const options = [
      { value: "", label: "* Select Professional Status", key: "0" },
      { value: "Developer", label: "Developer", key: "1" },
      { value: "Junior Developer", label: "Junior Developer", key: "2" },
      { value: "Senior Developer", label: "Senior Developer", key: "3" },
      { value: "Manager", label: "Manager", key: "4" },
      { value: "Student or Learning", label: "Student or Learning", key: "5" },
      { value: "Instructor", label: "Instructor", key: "6" },
      { value: "Intern", label: "Intern", key: "7" },
      { value: "Other", label: "Other", key: "8" }
    ];

    const { displaySocialInputs } = this.state;

    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <>
          <InputGroup
            icon="twitter"
            placeholder="Twitter Profile URL"
            name="twitter"
            value={this.state.twitter}
            error={this.state.errors.twitter}
            onChange={this.onChange}
          />
          <InputGroup
            icon="facebook"
            placeholder="Facebook Page URL"
            name="facebook"
            value={this.state.facebook}
            error={this.state.errors.facebook}
            onChange={this.onChange}
          />
          <InputGroup
            icon="linkedin"
            placeholder="Linkedin Profile URL"
            name="linkedin"
            value={this.state.linkedin}
            error={this.state.errors.linkedin}
            onChange={this.onChange}
          />
          <InputGroup
            icon="youtube"
            placeholder="YouTube Channel URL"
            name="youtube"
            value={this.state.youtube}
            error={this.state.errors.youtube}
            onChange={this.onChange}
          />
        </>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile handle"
                  name="handle"
                  info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                  error={this.state.errors.handle}
                  value={this.state.handle}
                  onChange={this.onChange}
                />

                <SelectListGroup
                  name="status"
                  value={this.state.status}
                  info="Give us an idea of where you are at in your career"
                  error={this.state.errors.status}
                  onChange={this.onChange}
                  options={options}
                />

                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  info="Could be your own company or one you work for"
                  error={this.state.errors.company}
                  value={this.state.company}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  info="Could be your own or a company website"
                  error={this.state.errors.website}
                  value={this.state.website}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  info="City & state suggested (eg. Boston, MA)"
                  error={this.state.errors.location}
                  value={this.state.location}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Skills"
                  name="skills"
                  info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
                  error={this.state.errors.skills}
                  value={this.state.skills}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  info="If you want your latest repos and a Github link, include your username"
                  error={this.state.errors.githubusername}
                  value={this.state.githubusername}
                  onChange={this.onChange}
                />
                <TextAreaFieldGroup
                  placeholder="A short bio of yourself"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={this.state.errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={this.toggleSocialNetworks}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>

                {socialInputs}

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
