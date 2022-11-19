const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LectureSchema = Schema({
  title: {
    type: String,
    require: [true, "Title is required"],
  },
  code: {
    type: String,
    require: [true, "Title is required"],
  },
  date: {
    type: String,
    require: [true, "Date is required"],
  },
  time: {
    type: String,
    require: [true, "Time is required"],
  },
  hall: {
    type: String,
    require: [true, "Hall is required"],
  },
  dep: {
    type: String,
    require: [true, "Department is required"],
  },
  year: {
    type: String,
    require: [true, "Year is required"],
  },
  note: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: {
      values: ["listed", "canceled", "unknown"],
      message: "{VALUE} is not supported",
    },
    default: "listed",
  },
});

module.exports = mongoose.model("Lecture", LectureSchema);
