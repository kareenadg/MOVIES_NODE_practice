const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const connect = require("./src/utils/database");

const Movie = require("./src/models/movie.model");

const PORT = process.env.PORT;

const server = express();
const router = express.Router();

connect();

router.get("/movies", (req, res) => {
  return Movie.find()
    .then((movies) => {
      return res.status(200).json(movies);
    })
    .catch((error) => {
      return res.status(500).json(error);
    });
});

router.get("/movies/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await Movie.findById(id);
    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).json("No movie found");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/movies/title/:title", async (req, res) => {
  const title = req.params.title;
  try {
    const movie = await Movie.find({ title: title });
    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).json("No movie found");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/movies/genre/:genre", async (req, res) => {
  const {genre} = req.params;
  try {
    const movie = await Movie.find({ genre });
      return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/movies/yearGreaterThan/:year", async (req, res) => {
  const year = req.params.year;
  try {
    const movie = await Movie.find({ year: { $gt: year } });
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json(error);
  }
});

server.use("/", router);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
