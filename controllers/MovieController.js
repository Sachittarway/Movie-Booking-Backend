const Movie = require("../models/MovieModel");
const Ticket = require("../models/TicketModel");
// Controller to handle POST request to add a new movie
const addMovie = async (req, res) => {
  try {
    const { id, title, imageUrl, rating, details, genre, price, showtimes } =
      req.body;

    console.log(req.body);
    // Check if a movie with the same ID already exists
    const existingMovie = await Movie.findOne({ id });
    if (existingMovie) {
      return res
        .status(400)
        .json({ message: "Movie with this ID already exists." });
    }

    // Create a new movie document
    const movie = new Movie({
      id,
      title,
      imageUrl,
      rating,
      details,
      genre,
      price, // Include price
      showtimes, // Include showtimes
    });

    // Save the new movie to the database
    await movie.save();
    res.status(201).json({ message: "Movie added successfully!", movie });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add movie.", error: error.message });
  }
};

// Controller to handle GET request to retrieve all movies
const getAllMovies = async (req, res) => {
  try {
    // Retrieve all movies from the database
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve movies.", error: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from URL parameters

    // Find the movie by ID
    const movie = await Movie.findOne({ id: parseInt(id) }); // Ensure ID is a number

    if (!movie) {
      return res.status(404).json({ message: "Movie not found." });
    }

    res.status(200).json(movie); // Send the found movie as a response
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve the movie.", error: error.message });
  }
};

const bookSeats = async (req, res) => {
  try {
    const { movieId, date, time, selectedSeats, userEmail, userName } =
      req.body;

    // Find the movie and specific showtime
    const movie = await Movie.findOne({ id: movieId });
    const showtime = movie.showtimes.find(
      (s) => s.date === date && s.time === time
    );

    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found." });
    }

    // Check for seat conflicts
    const conflictingSeats = selectedSeats.filter((seat) =>
      showtime.occupiedSeats.includes(seat)
    );
    if (conflictingSeats.length > 0) {
      return res.status(400).json({
        message: "Some seats are already occupied.",
        conflictingSeats,
      });
    }

    // Update occupied seats
    showtime.occupiedSeats.push(...selectedSeats);
    await movie.save();

    // Create a ticket
    const ticket = {
      movieId,
      movieTitle: movie.title,
      date,
      time,
      seats: selectedSeats,
      userEmail,
      userName,
    };

    // (Optional) Save ticket to a new Ticket collection (see below)
    await Ticket.create(ticket);

    res.status(200).json({ message: "Booking successful!", ticket });
  } catch (error) {
    res.status(500).json({ message: "Booking failed.", error: error.message });
  }
};

// get ticket details bsaed on user email
const getTicketDetails = async (req, res) => {
  try {
    // email from body not params
    const { userEmail } = req.body;
    // const tickets = await Ticket.find({ userEmail });
    // get only last ticket booked by user
    const tickets = await Ticket.find({ userEmail }).sort({ _id: -1 }).limit(1);
    res.status(200).json(tickets);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve tickets.", error: error.message });
  }
};

module.exports = {
  addMovie,
  getAllMovies,
  getMovieById,
  bookSeats,
  getTicketDetails,
};
