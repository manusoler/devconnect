const val = require("validator");

module.exports = data => {
  let errors = {};

  data.handle = data.handle ? data.handle : "";
  data.status = data.status ? data.status : "";
  data.skills = data.skills ? data.skills : "";

  if (!val.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 40 characters";
  }

  if (val.isEmpty(data.handle)) {
    errors.handle = "Handle is required";
  }

  if (val.isEmpty(data.status)) {
    errors.status = "Status is required";
  }

  if (val.isEmpty(data.skills)) {
    errors.skills = "Skills is required";
  }

  if (data.website && !val.isURL(data.website)) {
    errors.website = "Not a valid URL";
  }

  if (data.youtube && !val.isURL(data.youtube)) {
    errors.youtube = "Not a valid URL";
  }

  if (data.linkedin && !val.isURL(data.linkedin)) {
    errors.linkedin = "Not a valid URL";
  }

  if (data.twitter && !val.isURL(data.twitter)) {
    errors.twitter = "Not a valid URL";
  }

  if (data.facebook && !val.isURL(data.facebook)) {
    errors.facebook = "Not a valid URL";
  }

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
};
