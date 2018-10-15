const val = require("validator");

module.exports = data => {
  let errors = {};

  data.text = data.text ? data.text : "";

  if (!val.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Text must be between 10 and 300 characters";
  }

  if (val.isEmpty(data.text)) {
    errors.text = "Text is required";
  }

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
};
