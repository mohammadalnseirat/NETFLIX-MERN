import { fetchFromTMDB } from "../services/tmdb.service.js";
import { handleErrors } from "../utils/error.js";

//!FunctioN To Get Trending Movies:
export const getTrendingMovie = async (req, res, next) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    console.log(data);
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.status(200).json({ content: randomMovie });
  } catch (error) {
    console.log("Error getting trending movies", error.message);
    next(error);
  }
};

//! 2-Function To Get Trailers Movie:
export const getTrailersMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.status(200).json({
      trailers: data.results,
    });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    console.log("Error getting trailers movies", error.message);
    next(error);
  }
};
