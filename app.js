require("dotenv").config();
require("express-async-errors");

// express
const express = require("express");
const app = express();

// Rest of the packages
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

// import routers
const lectureRouter = require("./routes/lectureRoutes");
const userRouter = require("./routes/userRoutes");

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use(helmet());

// use routers
app.use("/api/v1/lecture", lectureRouter);
app.use("/api/v1/user", userRouter);

// db
const connectDB = require("./db/connect");

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
