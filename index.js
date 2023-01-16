const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const app = express();
const cors = require("cors");
const { userRouter } = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to Db");
  } catch (err) {
    console.log("Err connecting to db", err);
  }
  console.log(`Server is running on port ${process.env.port}`);
});
