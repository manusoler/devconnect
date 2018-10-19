import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { addExperience } from "../../actions/profileActions";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: [],
      disabled: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = evt => {
    evt.preventDefault();
    const newExp = { ...this.state };
    this.props.addExperience(newExp, this.props.history);
  };

  onChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  onCheck = evt => {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled
    });

    if (this.state.current) {
      document.getElementsByName("to")[0].value = "";
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="section add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Experience</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Job Title"
                  name="title"
                  error={errors.title}
                  value={this.state.title}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="* Company"
                  name="company"
                  error={errors.company}
                  value={this.state.company}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="* Location"
                  name="location"
                  error={errors.location}
                  value={this.state.location}
                  onChange={this.onChange}
                />
                <h6>* From Date</h6>
                <TextFieldGroup
                  type="date"
                  name="from"
                  error={errors.from}
                  value={this.state.from}
                  onChange={this.onChange}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  type="date"
                  name="to"
                  error={errors.to}
                  value={this.state.to}
                  onChange={this.onChange}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value=""
                    id="current"
                    onChange={this.onCheck}
                  />
                  <label className="form-check-label" htmlFor="current">
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Job Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Some of your responsabilities, etc"
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
