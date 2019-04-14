const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateVerifyInput(data) {
  let errors = {};

  data.rand = !isEmpty(data.rand) ? data.rand : "";

  if (Validator.isEmpty(data.rand)) {
    errors.rand = "One Time Password is required";
  }
  //return errors and is valid property
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
