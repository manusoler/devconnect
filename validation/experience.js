const val = require("validator");

module.exports = data => {
  let errors = {};

  data.title = data.title ? data.title : "";
  data.company = data.company ? data.company : "";
  data.from = data.from ? data.from : "";

  if (val.isEmpty(data.title)) {
    errors.title = "Title is required";
  }

  if (val.isEmpty(data.company)) {
    errors.company = "Company is required";
  }

  if (val.isEmpty(data.from)) {
    errors.from = "From is required";
  }

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
};
