const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const validateRegistration = require("../validation/register");
const validateLogin = require("../validation/login");

router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegistration(req.body);

  //Validate entries
  if (!isValid) {
    return res.json({ errors });
  }

  User.findOne({ email: req.body.email }).then((data) => {
    if (data) {
      res.json({ success: false, user: data });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((data) => res.json({ success: true, user: data }))
            .catch((err) => console.log(err));
        });
      });
    }
  });
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
  User.findByIdAndDelete(req.body.id)
    .then((data) => {
      res.json({
        success: true,
        user: data,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
