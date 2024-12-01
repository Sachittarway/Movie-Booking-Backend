const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  details: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  showtimes: [
    {
      date: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      occupiedSeats: {
        type: [Number],
        default: [],
      },
    },
  ],
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
