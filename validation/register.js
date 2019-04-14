const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  //if data.name is empty then convert into empty string
  // so that it could be used later
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.codechefId = !isEmpty(data.codechefId) ? data.codechefId : "";
  data.interest = !isEmpty(data.interest) ? data.interest : "";

  //name validation
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  //email validations
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  //password validations
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  //codechefId Validations
  if (Validator.isEmpty(data.codechefId)) {
    errors.codechefId = "Codechef Id field is required";
  }
  //interest validations
  if (Validator.isEmpty(data.interest)) {
    errors.interest = "Interest field is required";
  }

  //return errors and is valid property
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
