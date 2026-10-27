const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    username: "apnacollege",
    content: "I love conding",
  },
  {
    username: "arshKhan",
    content: "Hard work is important to achieve success",
  },
  {
    username: "rahulKumar",
    content: "I got Selected for my first job",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});


app.post("/posts",(req,res)=>{
   console.log(req.body);
   res.send("post request working")
})

app.listen(port, () => {
  console.log("Server is live at", port);
});
