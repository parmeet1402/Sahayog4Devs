const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create user schema
const MatchSchema = new Schema({
  // user: { type: Schema.Types.ObjectId, ref: "users" },
  email: { type: String },
  name: { type: String },
  interest: { type: String },
  username: { type: String },
  isMatched: { type: Boolean, default: false },
  matchUsername: { type: String },
  matchEmail: { type: String },
  matchName: { type: String },
  skillsIntermediate: { type: [String] },
  skillsBeginner: { type: [String] }
});

//expose the schema
module.exports = MatchSkill = mongoose.model("matchSkill", MatchSchema);
