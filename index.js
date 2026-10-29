
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride=require("method-override")



app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "apnacollege",
    content: "I love conding",
  },
  {
    id: uuidv4(),
    username: "arshKhan",
    content: "Hard work is important to achieve success",
  },
  {
    id: uuidv4(),
    username: "rahulKumar",
    content: "I got Selected for my first job",
  },
];

// Home page
app.get("/", (req, res) => {
  res.render("homepage");
});

// All post page
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});
// rendering new user filling page
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

// Adding new user to Database
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});
// Find specific user id
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  console.log(posts);

  res.send("patch request working.....");
});
// Edit route
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("editPost", { post });
});






app.listen(port, () => {
  console.log("Server is live at", port);
});
