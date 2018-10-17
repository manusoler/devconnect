const val = require("validator");

module.exports = data => {
  let errors = {};

  data.email = data.email ? data.email : "";
  data.password = data.password ? data.password : "";

  if (!val.isEmail(data.email)) {
    errors.email = "Email is not a valid email";
  }

  if (val.isEmpty(data.email)) {
    errors.email = "Email  is required";
  }

  if (
    !val.isLength(data.password, {
      min: 4,
      max: 30
    })
  ) {
    errors.password = "Password must be between 4 and 30";
  }

  if (val.isEmpty(data.password)) {
    errors.password = "Password  is required";
  }

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
};
