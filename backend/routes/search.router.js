import express from "express";
import {
  searchPerson,
  searchMovie,
  searchTV,
  getSearchHistory,
  removeItemFromSearchHistory,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTV);
router.get("/history", getSearchHistory); // this router is responsible for getting the search history of the user
router.delete("/history/:id", removeItemFromSearchHistory); // this router is responsible for removing an item from the search history

export default router;
