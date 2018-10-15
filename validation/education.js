const val = require("validator");

module.exports = data => {
  let errors = {};

  data.school = data.school ? data.school : "";
  data.degree = data.degree ? data.degree : "";
  data.fieldofstudy = data.fieldofstudy ? data.fieldofstudy : "";
  data.from = data.from ? data.from : "";

  if (val.isEmpty(data.school)) {
    errors.school = "School is required";
  }

  if (val.isEmpty(data.degree)) {
    errors.degree = "Degree is required";
  }

  if (val.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of study is required";
  }

  if (val.isEmpty(data.from)) {
    errors.from = "From is required";
  }

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
};
