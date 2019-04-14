const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create user schema
const RequiredSkillSchema = new Schema({
  // user: { type: Schema.Types.ObjectId, ref: "users" },
  email: { type: String },
  name: { type: String },
  interest: { type: String },
  requiredSkills: { type: [String] }
});

//expose the schema
module.exports = RequiredSkill = mongoose.model(
  "requiredSkill",
  RequiredSkillSchema
);
