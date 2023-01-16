const express = require("express");
const { PostModel } = require("../model/post.model");
const { UserModel } = require("../model/user.model");
const postRouter = express.Router();
var jwt = require("jsonwebtoken");

postRouter.get("/", async (req, res) => {
  try {
    let data = await PostModel.find();
    res.send(data);
  } catch (err) {
    res.send({ msg: "Error in getting data" });
  }
});

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhc2htaXJhbmphbjAwN2piQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNCIsImlhdCI6MTY3Mzg2MjY1OH0.U7ekmOhDrqQVUyW66dluKoNhymi_sduVGgwyBt6PaSY
// "email":"rashmiranjan007jb@gmail.com",
//  "password":"1234"

postRouter.post("/", async (req, res) => {
  let data = req.body;
  let token = req.headers.authorization;
  // res.send(token)
  try {
    jwt.verify(token, "masai", async function (err, decoded) {
      if (err) {
        res.send({ msg: "Invalid token", err });
      } else {
        let post = new PostModel(data);
        await post.save();
        res.send({ msg: "Data posted successfully" });
      }
    });
  } catch (err) {
    res.send({ msg: "Invalid token / Login First", err });
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  let data = req.body;
  let id = req.params.id;
  let token = req.headers.authorization;
  try {
    jwt.verify(token, "masai", async function (err, decoded) {
      if (err) {
        res.send({ msg: "Invalid Token" });
      } else {
        let post = await PostModel.findById({ _id: id }, data);
        res.send({ msg: "data updated" });
      }
    });
  } catch (err) {
    res.send({msg:"error while updating data",err});
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
    let id = req.params.id;
    let token = req.headers.authorization;
    try {
      jwt.verify(token, "masai", async function (err, decoded) {
        if (err) {
          res.send({ msg: "Invalid Token" });
        } else {
          await PostModel.findByIdAndDelete({ _id: id });
          res.send({ msg: "data deleted" });
        }
      });
    } catch (err) {
      res.send({msg:"error while deleting data",err});
    }
  });

module.exports = { postRouter };
