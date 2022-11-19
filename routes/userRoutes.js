const express = require("express");
const router = express.Router();
const {
  createUser,
  updateUser,
  login,
  getUser,
} = require("../controllers/userController");

router.route("/create").post(createUser);
router.route("/login").post(login);
// router.route("update-user").patch(updateUser);
router.route("/:id").get(getUser).patch(updateUser);

module.exports = router;
