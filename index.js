import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
let t = [];
let d = [];
let b = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/compose", (req, res)=>{
  res.render("compose.ejs");
});

app.post("/submit", (req, res)=>{
  let title = req.body["title"];
  let description = req.body["description"];
  let blog = req.body["blog"];
  console.log(`Data: ${req.body}`);
  t.push(title);
  d.push(description);
  b.push(blog);
  console.log("Updated arrays : ", {t, d, b});
  res.redirect("/posts");
});

app.get("/posts", (req, res)=>{
  console.log("Updated arrays : ", {t, d, b});
  res.render("posts.ejs", {t, b, d});
});

app.get("/edit", (req, res) => {
  const ti = req.query["title"];
  const de = req.query["description"];
  const bo = req.query["blog"];
  console.log({ti, de, bo})
  t.splice(t.indexOf(ti), 1);
  d.splice(d.indexOf(de), 1);
  b.splice(b.indexOf(bo), 1);
  res.render("edit.ejs", { ti, de, bo });
})

app.get("/delete", (req, res) => {
  const ti = req.query["title"];
  const de = req.query["description"];
  const bo = req.query["blog"];
  console.log({ti, de, bo})
  t.splice(t.indexOf(ti), 1);
  d.splice(d.indexOf(de), 1);
  b.splice(b.indexOf(bo), 1);
  res.redirect("/posts");
});

app.get("/", (req, res) => {
  console.log(t, b, d);
  res.render("index.ejs", {t, b, d});
});

app.listen(port, ()=>{
  console.log(`Successfully running on port ${port}`);
});