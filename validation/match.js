const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMatchInput(data) {
  let errors = {};

  //if data.name is empty then convert into empty string
  // so that it could be used later
  data.requiredSkill = !isEmpty(data.requiredSkill) ? data.requiredSkill : "";
  data.choice = !isEmpty(data.choice) ? data.choice : "";
  //required skill validation
  if (Validator.isEmpty(data.requiredSkill)) {
    errors.requiredSkill = "Required Skill field is required";
  }
  // choice validation
  if (Validator.isEmpty(data.choice)) {
    errors.choice = "Please select one according to your preference";
  }

  //return errors and is valid property
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
