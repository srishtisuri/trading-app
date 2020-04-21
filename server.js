const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/keys").mongoURI;
const PORT = process.env.PORT || 5000;
const passport = require("passport");

//Setup database connection
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB successfully connected..."))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

//Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
// require("./config/passport")(passport);

//Routes
const users = require("./routes/userRoutes");
app.use("/api/users", users);

//Initialise the application
app.listen(PORT, () => {
  console.log(`Server is now running on Port ${PORT}...`);
});
