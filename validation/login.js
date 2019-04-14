const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  //if data.name is empty then convert into empty string
  // so that it could be used later
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  //email validations
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  //password validations
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  //return errors and is valid property
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
