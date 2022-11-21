const { StatusCodes } = require("http-status-codes");
const Lecture = require("../models/Lecture");

const createLecture = async (req, res) => {
  const { title, date, time, hall, dep, year, status, note, codes } = req.body;
  const lectures = await Lecture.find({
    year,
    dep,
    date,
    time,
  });
  const hallCheck = await Lecture.find({
    date,
    time,
    hall,
  });

  if (lectures.length === 0) {
    if (hallCheck.length <= 3) {
      const lecture = await Lecture.create({
        title,
        date,
        time,
        hall,
        dep,
        year,
        note,
        status,
        codes,
      });
      res.status(StatusCodes.CREATED).json({ lecture });
    } else {
      res
        .status(StatusCodes.NOT_ACCEPTABLE)
        .json({ meg: "There is already lecture in this hall" });
    }
  } else {
    res
      .status(StatusCodes.NOT_ACCEPTABLE)
      .json({ meg: "There is already lecture in this time" });
  }
};

const getAllLectures = async (req, res) => {
  const { title, date, time, hall, dep, year, status, sort, limit, codes } =
    req.query;
  // let c1 = codes.split({});
  // let c2 = JSON.parse(codes);
  // console.log("split", c1);
  // console.log("JSON", c2);
  // console.log(codes.split(","));
  // console.log(JSON.parse(codes));
  let queryObject = {};
  if (title) {
    queryObject.title = title;
  }
  if (date) {
    queryObject.date = date;
  }
  if (time) {
    queryObject.time = time;
  }
  if (hall) {
    queryObject.hall = hall;
  }
  if (dep) {
    queryObject.dep = dep;
  }
  if (year) {
    queryObject.year = year;
  }
  if (status) {
    queryObject.status = status;
  }

  let result;
  if (codes) {
    let c = codes.split(",");
    result = Lecture.find({
      ...queryObject,
      code: {
        $in: c,
      },
    });
  } else {
    result = Lecture.find(queryObject);
  }
  // result = Lecture.find(queryObject);
  // let result = Lecture.find(queryObject);

  // let result = Lecture.find({
  //   ...queryObject,
  //   code: {
  //     $in: codes.split(","),
  //   },
  // });
  // let result;
  // if (code) {
  //   console.log(code);
  //   result = Lecture.find({
  //     ...queryObject,
  //     ...{
  //       code: {
  //         $in: code,
  //       },
  //     },
  //   });
  // } else {
  //   result = Lecture.find(queryObject);
  // }
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("time");
  }
  if (limit) {
    const limit = Number(limit);
    result = result.limit(limit);
  }
  const lectures = await result;
  res.status(StatusCodes.OK).json({ lectures });
  // let c2 = Array.from(codes.split(","));

  // res.status(StatusCodes.OK).json(c2);
};
const getOneLecture = async (req, res) => {
  const { id } = req.params.id;
  const lecture = await Lecture.findById(id);
  res.status(StatusCodes.OK).json({ lecture });
};

const deleteAll = async (req, res) => {
  const { arr } = req.body;

  if (arr?.length === 0 || arr === undefined) {
    await Lecture.deleteMany();
    res.status(StatusCodes.OK).json({ meg: "Delete all records successful" });
  } else {
    await Lecture.deleteMany({
      _id: {
        $in: arr,
      },
    });
    res
      .status(StatusCodes.OK)
      .json({ meg: "Delete all selected records successful" });
  }
};
const deleteOneLecture = async (req, res) => {
  const { id } = req.params.id;
  await Lecture.findOneAndDelete(id);
  res.status(StatusCodes.OK).json({ meg: "Lecture has been deleted" });
};

const updateLecture = async (req, res) => {
  const { id } = req.params;
  const lecture = await Lecture.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ lecture });
};
const getDays = async (req, res) => {
  const { year, dep, limit } = req.query;
  // let queryObject = {};
  // if (dep) {
  //   queryObject.dep = dep;
  // }
  // if (year) {
  //   queryObject.year = year;
  // }
  // let results = Lecture.aggregate([
  //   { $match: { year: year, dep: dep } },
  //   { $project: { date: 1 } },
  //   { $sort: { date: -1 } },
  // ]);
  let results = Lecture.find({ year: year, dep: dep }).distinct("date").sort();
  // results = results.sort("-date");
  // const days = results;
  // results = results.distinct("-date");
  const days = await results;
  console.log(days);
  res.status(StatusCodes.OK).json({ days });
};
const getNumberOfLectures = async (req, res) => {
  const { dep, year } = req.query;
  const lectures = await Lecture.aggregate([
    { $match: { dep: dep, year: year } },
    {
      $group: {
        _id: "$date",
        count: { $sum: 1 }, // this means that the count will increment by 1
      },
    },
  ]);
  res.status(StatusCodes.OK).json({ lectures });
};
module.exports = {
  createLecture,
  getAllLectures,
  deleteAll,
  getOneLecture,
  deleteOneLecture,
  updateLecture,
  getDays,
  getNumberOfLectures,
};
