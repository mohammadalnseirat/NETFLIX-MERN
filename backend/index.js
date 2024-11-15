import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.router.js";
import protectedRoute from "./middleWare/protectRoute.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cookieParser());

// ?Import Routes:
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectedRoute, movieRoutes);
app.use("/api/v1/tv", protectedRoute, tvRoutes);
app.use("/api/v1/search", protectedRoute, searchRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server listening on ${PORT}`);
});

//! Middleware for handling errors:
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    sucess: false,
    message,
    statusCode,
  });
});
