const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const validateRegistration = require("../validation/register");
const validateLogin = require("../validation/login");
const keys = require("../config/keys");

router.get("/", (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegistration(req.body);

  //Validate entries
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  }).then((data) => {
    if (data) {
      res.status(400).json({ error: "email or username already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
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

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLogin(req.body);

  if (!isValid) {
    return res.status(400).json({ errors });
  }

  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      return res.status(400).json({ userNotFound: "Username doesn't exist" });
    }

    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 31556926 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordIncorrect: "Password incorrect" });
      }
    });
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
