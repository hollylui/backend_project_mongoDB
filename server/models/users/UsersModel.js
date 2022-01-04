const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  dateCreate: { type: Date, default: Date.now },
  name: { type: String, required: true },
  username: { type: String, minlength: 6, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  sex: {
    type: String,
    enum: ["male", "female", "diverse"],
    required: true,
  },
  account: {
    type: String,
    enum: ["admin", "standard"],
    default: "standard",
  },
  hash: { type: String, required: true },
});

const UserModel = model("users", userSchema);
module.exports = UserModel;
