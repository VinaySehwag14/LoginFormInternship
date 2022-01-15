const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema(
  {
    adminname: {
      type: String,
      trim: true,
      max: 20,
      min: 3,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Admin", AdminSchema);
