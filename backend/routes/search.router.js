import express from "express";
import {
  searchPerson,
  searchMovie,
  searchTV,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTV);

export default router;
