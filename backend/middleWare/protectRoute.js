import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { handleErrors } from "../utils/error.js";

const protectedRoute = async (req, res, next) => {
  try {
    //? get the token from the cookies:
    const token = req.cookies.access_token;
    if (!token) {
      return next(
        handleErrors(401, "Un-Authorized, No Access Token Provided.")
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return next(handleErrors(401, "Invalid Access Token."));
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return next(
        handleErrors(404, "Un-Authorized, Invalid Email or password.")
      );
    }

    // ? put the user to the request:
    req.user = user;
    next();
  } catch (error) {
    console.log("Error while verifying user: " + error.message);
    next(error);
  }
};
export default protectedRoute
