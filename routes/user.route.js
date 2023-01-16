const express = require("express");
const { UserModel } = require("../model/user.model");
var jwt = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  let user = req.body;
  try {
    let data = new UserModel(user);
    await data.save();

    res.send({ msg: "User Registered Successfully" });
  } catch (err) {
    res.send({ msg: "Registration failed", err });
  }
});

userRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await UserModel.find({ email, password });
    if (user.length > 0) {
      let token = jwt.sign({ email, password }, "masai");
      res.send({ msg: "registration successfull", token });
    } else {
      res.send({ msg: "Wrong credentials" });
    }
  } catch (err) {
    res.send({ msg: "Wrong credentials", err });
  }
});

module.exports = { userRouter };
