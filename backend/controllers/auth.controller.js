import User from "../models/user.model.js";
import { handleErrors } from "../utils/error.js";

//! 1-Function To SignUp User:
export const signUpUser = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error while signing up user", error.message);
    next(error);
  }
};

//! 2-Function To SignIn User:
export const signInUser = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error while signing in user", error.message);
    next(error);
  }
};

//! 3-Function To Logout User:
export const logoutUser = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Error while logging out user", error.message);
    next(error);
  }
};
