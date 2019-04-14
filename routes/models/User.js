const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create user schema
const UserSchema = new Schema({
  name: { type: String, required: true },
  codechefId: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  interest: { type: String, required: true },
  isActivated: { type: Boolean, default: false }
});

//expose the schema
module.exports = User = mongoose.model("users", UserSchema);
