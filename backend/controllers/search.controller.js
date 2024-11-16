import { fetchFromTMDB } from "../services/tmdb.service.js";
import User from "../models/user.model.js";

//! 1-Function To Search For User:
export const searchPerson = async (req, res, next) => {
  const { query } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }
    //? Find The Current User And Update The Search History:
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          name: response.results[0].name,
          image: response.results[0].profile_path,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    //? Send The Response:
    res.status(200).json({ content: response.results });
  } catch (error) {
    console.log("Error searching for user", error.message);
    next(error);
  }
};

//! 2-Function To Search For Movies:
export const searchMovie = async (req, res, next) => {
  const { query } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    //? Find The Current User And Update The Search History:
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          title: response.results[0].title,
          image: response.results[0].poster_path,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    //? Send The Response:
    res.status(200).json({ content: response.results });
  } catch (error) {
    console.log("Error searching for movies", error.message);
    next(error);
  }
};

//! 3-Function To Search For TV Shows:
export const searchTV = async (req, res, next) => {
  const { query } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (response.results.length === 0) {
      return res.status(404).send(null);
    }
    //? Find The Current User And Update The Search History:
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: response.results[0].id,
          title: response.results[0].name,
          image: response.results[0].poster_path,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });

    //? Send The Response:
    res.status(200).json({ content: response.results });
  } catch (error) {
    console.log("Error searching for TV Shows", error.message);
    next(error);
  }
};

//! 4- Function To Get Search History:
export const getSearchHistory = async (req, res, next) => {
  try {
    res.status(200).json({
      content: req.user.searchHistory,
    });
  } catch (error) {
    console.log("Error getting search history", error.message);
    next(error);
  }
};

//! 5-Function To Delete Item Search History:
export const removeItemFromSearchHistory = async (req, res, next) => {
  try {
    let { id } = req.params; // return the id of the item as a string
    id = parseInt(id);
    //? Find The User And Update The Search History Array:
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id },
      },
    });
    // ? Send The Response:
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.log("Error deleting item from search history", error.message);
    next(error);
  }
};
