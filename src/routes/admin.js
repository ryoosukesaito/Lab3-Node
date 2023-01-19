const express = require("express");
const http = require("http");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/input", (req, res, next) => {
  res.send(`
      <body>
        <div style = "display: flex; justify-content : center; align-items: center; margin: 3rem; flex-direction: column;">
        <h3 style = "display: flex; margin: 3rem ">Enter Your Name</h3>
          <form action="/login" method="POST">
              <input type="text" name="name" placeholder="Username" required>
              <button type="submit">Enter</button>
          </form>
        </div>
      <body>
    `);
});

// let name = []
// router.post("/login", (req, res, next) => {

//   res.redirect(`/admin/${req.body.name}`);
// });

router.get("/:username", (req, res, next) => {
  console.log("User Name :", req.params.username);
  res.redirect("/home");

  
});

module.exports = router;
