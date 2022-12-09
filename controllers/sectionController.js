const Session = require("../models/Session");

const addSession = async (req, res) => {
  const { sessionName } = req.query;
  const { name, token } = req.body;
  const sessions = await Session.findOne({ name: sessionName });
  // console.log(sessions.arr?.includes(token));
  if (!sessions) {
    // if (!sessions.arr.includes(token)) {
    const session = await Session.create({
      name: sessionName,
      arr: [token],
    });
    res.status(200).json(session);
  }
  if (sessions) {
    if (!sessions.arr?.includes(token)) {
      const session = await Session.findOne({ name: sessionName });
      console.log(session);
      const newSession = await Session.findOneAndUpdate(
        { name: sessionName },
        { $push: { arr: token } },
        { new: true }
      );
      res.status(200).json(newSession);
    } else {
      res.status(400).json("Already exist");
    }
  }
};

const getALL = async (req, res) => {
  const { sessionName } = req.query;
  const s = await Session.find({ name: sessionName });
  // const s = await Session.find()
  res.status(200).json(s);
};

module.exports = {
  addSession,
  getALL,
};
