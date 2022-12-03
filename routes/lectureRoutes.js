const express = require("express");
const router = express.Router();

const {
  createLecture,
  getAllLectures,
  deleteAll,
  deleteOneLecture,
  getOneLecture,
  updateLecture,
  getDays,
  getNumberOfLectures,
  getGroupedLectures,
} = require("../controllers/lectureController");

router.route("/get-number-of-lectures").get(getNumberOfLectures);
router.route("/get-grouped-lectures").get(getGroupedLectures);
router.route("/").post(createLecture).get(getAllLectures).delete(deleteAll);
router
  .route("/:id")
  .get(getOneLecture)
  .delete(deleteOneLecture)
  .patch(updateLecture);
module.exports = router;
