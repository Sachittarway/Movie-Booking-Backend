const express = require("express");
const {
  addMovie,
  getAllMovies,
  getMovieById,
  bookSeats,
  getTicketDetails,
} = require("../controllers/MovieController");
const movieRouter = express.Router();

movieRouter.post("/create", addMovie);
movieRouter.get("/allmovies", getAllMovies);
movieRouter.get("/movie/:id", getMovieById);
movieRouter.post("/book", bookSeats);
movieRouter.post("/tickets", getTicketDetails);

module.exports = movieRouter;
