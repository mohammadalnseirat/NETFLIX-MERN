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
