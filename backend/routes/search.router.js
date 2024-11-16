import express from "express";

const router = express.Router();

router.get("/person/:query", searchPerson);

export default router;
