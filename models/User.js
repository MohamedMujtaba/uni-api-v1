const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: {
    type: String,
    require: [true, "Name is required"],
  },
  role: {
    type: String,
    require: true,
    enum: {
      values: ["user", "admin", "superAdmin"],
      message: "{VALUE} is not supported",
    },
    default: "user",
  },
  password: {
    type: String,
    require: true,
  },
  dep: {
    type: String,
    require: true,
    enum: {
      values: ["Pet", "EE", "Mec", "Civ", "Agr", "Min", "Chem", "Sur"],
      message: "{VALUE} is not supported",
    },
  },
  year: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
