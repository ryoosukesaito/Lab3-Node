const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const recipeRoutes = require("./routes/recipe");
const adminRoute = require("./routes/admin");

const fs = require("fs");

const app = express();

//Static files
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

//Set View Path
app.set("view engine", "ejs");
app.set("views", "src/views");

app.use("/admin", adminRoute);
app.use(recipeRoutes);

const username = [];

app.post("/login", (req, res, next) => {
  const name = req.body.name;
  username.push(name);
  // console.log(username);

  res.render("home", {
    name: username,
    url: "/login",
  });
});

app.get("/login", (req, res, next) => {
  res.render("home", {
    name: username,
    url: "/login",
  });
});

app.get("/leave-notes", (req, res, next) => {
  res.render("leave-notes", {
    name: username,
    url: "/leave-notes",
  });
});

app.post("/notes", (req, res, next) => {
  const notes = req.body.notes + `\n`;

  fs.appendFile('text.txt', notes, (err) => {
    if (err){
      console.error(err);
      return
    }
  })

  // console.log(notes);
  res.render("home", {
    name: username,
    url: "/leave-notes",
  });
});

const notesData =[];
app.get("/read-notes", (req, res, next) => {
  
  fs.readFile('text.txt', 'utf-8',(err, data) => {
    if (err){
      console.log(err);
      return
    }
    notesData.push(data);

    res.render("read-notes", {
      name: username,
      Notes: notesData,
      url: "/read-notes",
    });
    // console.log("Data: " + notesData);
  });
});

// app.post("read-notes", (req, res, next) => {

// })

app.use((req, res, next) => {
  res.status(404).send("<h1>Page not Found</h1>");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
