const express = require("express");
const cors = require("cors");
const { db } = require("./db/db");

const movieRouter = require("./routes/MovieRoutes");

const app = express();

require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/movies", movieRouter);

app.get("/", (req, res) => {
  res.send("Success");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!!");
});

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
};

server();
