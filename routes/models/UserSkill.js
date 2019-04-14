const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create user schema
const UserSkillSchema = new Schema({
  // user: { type: Schema.Types.ObjectId, ref: "users" },
  email: { type: String },
  name: { type: String },
  interest: { type: String },
  skills: { type: [String] }
});

//expose the schema
module.exports = UserSkill = mongoose.model("userSkill", UserSkillSchema);
