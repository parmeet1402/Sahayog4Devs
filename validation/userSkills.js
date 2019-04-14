const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateUserSkillsInput(data) {
  let errors = {};

  //if data.name is empty then convert into empty string
  // so that it could be used later
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  //skills validation
  /* if (Validator.isEmpty(data.skills)) {
    errors.skills = "User's skills field is required.";
  } */

  //return errors and is valid property
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
