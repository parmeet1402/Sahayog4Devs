const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create user schema
const CodechefSchema = new Schema({
  // user: { type: Schema.Types.ObjectId, ref: "users" },
  email: { type: String },
  name: { type: String },
  id: { type: String },
  language: { type: String },
  state: { type: String },
  city: { type: String },
  country: { type: String },
  rating: { type: String },
  rank: { type: String },
  band: { type: String }
});

//expose the schema
module.exports = Codechef = mongoose.model("codechef", CodechefSchema);
