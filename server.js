// Imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const app = express();

// Body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB COnfig
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    {
      useNewUrlParser: true
    }
  )
  .then(() => console.log("Connected to mondodb"))
  .catch(error => console.log(error));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Routes mapping
const posts = require("./routes/api/posts");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

// Server statis assets in production
if (process.env.NODE_ENV === "production") {
  // Set a static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client/build/index.html"))
  );
}

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started at port ${port}`));
