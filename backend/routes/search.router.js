import express from "express";
import {
  searchPerson,
  searchMovie,
  searchTV,
  getSearchHistory,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTV);
router.get("/history", getSearchHistory); // this router is responsible for getting the search history of the user

export default router;
