import express from "express";
import mongoose from "mongoose";
import userRegister from "./controllers/user.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
  })
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/create", userRegister);

const port = 5000;
app.listen(port, () => console.log(`Server is listening to port ${port}`));
