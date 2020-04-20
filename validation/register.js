const validator = require("validator").default;

module.exports = (data) => {
  let errors = {};

  //Convert empty fields into empty strings so that validator functions can be applied
  data.name = validator.isEmpty(data.name) ? "" : data.name;
  data.email = validator.isEmpty(data.email) ? "" : data.email;
  data.username = validator.isEmpty(data.username) ? "" : data.username;
  data.password = validator.isEmpty(data.password) ? "" : data.password;
  data.password2 = validator.isEmpty(data.password2) ? "" : data.password2;

  //Check name field
  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  //Check email field if empty/not an email
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  //Password checks
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Confirm password field is required";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: Object.keys(errors).length == 0 ? true : false,
  };
};
