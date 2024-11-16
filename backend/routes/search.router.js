import express from "express";
import { searchPerson, searchMovie } from "../controllers/search.controller.js";

const router = express.Router();

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);

export default router;
