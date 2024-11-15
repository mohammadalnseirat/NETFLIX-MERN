import { fetchFromTMDB } from "../services/tmdb.service.js";

//! 1-Function To Get Trending TV Series:
export const getTrendingTV = async (req, res, next) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomTV =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.status(200).json({ content: randomTV });
  } catch (error) {
    console.log("Error getting trending TV series", error.message);
    next(error);
  }
};

//! 2-Function To Get Trailers Tv Series:
export const getTvTrailers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.status(200).json({ trailers: data.results });
  } catch (error) {
    console.log("Error getting trending TV series", error.message);
    next(error);
  }
};
