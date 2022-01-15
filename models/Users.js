const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      max: 20,
      min: 3,
    },
    mobile: {
      type: String,
      trim: true,
      required: true,
      max: 10,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Users", UserSchema);
