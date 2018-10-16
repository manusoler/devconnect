const val = require("validator");

module.exports = data => {
  let errors = {};

  data.name = data.name ? data.name : "";
  data.email = data.email ? data.email : "";
  data.password = data.password ? data.password : "";
  data.password2 = data.password2 ? data.password2 : "";

  if (!val.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30";
  }

  if (val.isEmpty(data.name)) {
    errors.name = "Name  is required";
  }

  if (!val.isEmail(data.email)) {
    errors.email = "Email  is not a valid email";
  }

  if (val.isEmpty(data.email)) {
    errors.email = "Email  is required";
  }

  if (!val.isLength(data.password, { min: 4, max: 30 })) {
    errors.password = "Password must be between 4 and 30";
  }

  if (val.isEmpty(data.password)) {
    errors.password = "Password  is required";
  }

  if (!val.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  if (val.isEmpty(data.password2)) {
    errors.password2 = "Confirm password  is required";
  }

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
};
