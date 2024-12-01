const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  movieId: { type: Number, required: true },
  movieTitle: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  seats: { type: [Number], required: true },
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
