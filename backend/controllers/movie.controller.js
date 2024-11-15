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
