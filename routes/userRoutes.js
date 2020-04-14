const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/create", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
  });

  newUser
    .save()
    .then((data) =>
      res.json({
        success: true,
        user: data,
      })
    )
    .catch((err) => console.log(err));
});

router.put("/update", (req, res) => {
  User.findByIdAndUpdate(req.body.id, { $set: req.body })
    .then((data) =>
      res.json({
        success: true,
        user: data,
      })
    )
    .catch((err) => console.log(err));
});

router.delete("/delete", (req, res) => {
  User.findByIdAndDelete(req.body.id).then((data) => {
    res
      .json({
        success: true,
        user: data,
      })
      .catch((err) => console.log(err));
  });
});

module.exports = router;
