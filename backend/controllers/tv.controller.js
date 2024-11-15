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
