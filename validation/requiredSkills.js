const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRequiredSkillsInput(data) {
  let errors = {};

  //if data.name is empty then convert into empty string
  // so that it could be used later
  /* data.requiredSkills = !isEmpty(data.requiredSkills)
    ? data.requiredSkills
    : "";

  //skills validation
  if (Validator.isEmpty(data.requiredSkills)) {
    errors.requiredSkills = "Required skills field is required.";
  }
 */
  //return errors and is valid property
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
