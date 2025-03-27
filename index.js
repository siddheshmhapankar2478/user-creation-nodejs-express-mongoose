const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    if (err) console.error(err.message);
    else {
      console.log(files);
      res.render("index", { files });
    }
  });
});

app.get("/file/:filename", (req, res) => {
  const filename = req.params.filename;
  console.log({ filename });

  fs.readFile(`./files/${filename}`, "utf-8", (err, message) => {
    if (err) console.error(err.message);
    else {
      console.log(message);
      res.render("show", { filename, message });
    }
  });
});

app.post("/create", (req, res) => {
  const body = req.body;
  const title = body.title.trim().split(" ").join("_");

  fs.writeFile(`./files/${title}.txt`, body.description, (err) => {
    if (err) console.error(err.message);
    else {
      console.log("Created File");
      res.redirect("/");
    }
  });
});

app.listen(3000);
