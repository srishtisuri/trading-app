const validator = require("validator").default;

module.exports = (data) => {
  let errors = {};
  //Convert empty fields into empty strings so that validator functions can be applied
  data.username = validator.isEmpty(data.username) ? "" : data.username;
  data.password = validator.isEmpty(data.password) ? "" : data.password;

  //Username check
  if (validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  //Password check
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
