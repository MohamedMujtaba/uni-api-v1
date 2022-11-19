const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const createUser = async (req, res) => {
  const { username, role, dep, year, password } = req.body;
  const user = await User.create({
    username,
    role,
    dep,
    year,
    password,
  });
  res.status(StatusCodes.CREATED).json({ ...user, password: null });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.status(StatusCodes.OK).json({ ...user, password: null });
};

// FIXME:

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res
      .status(StatusCodes.EXPECTATION_FAILED)
      .json({ msg: "Provide valid username and password please " });
  }
  if (username && password) {
    const user = await User.findOne({ username: username });
    if (user) {
      if (user.password === password) {
        res.status(StatusCodes.ACCEPTED).json({ user });
      } else {
        res
          .status(StatusCodes.FORBIDDEN)
          .json({ msg: "Wrong username or password" });
      }
    } else {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ msg: "Wrong username or password!" });
    }
  }
};
const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(StatusCodes.OK).json({ user });
};
module.exports = {
  createUser,
  updateUser,
  login,
  getUser,
};
