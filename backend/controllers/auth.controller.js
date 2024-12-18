import User from "../models/user.model.js";
import { handleErrors } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookies } from "../utils/generateTokenAndSetCookies.js";

//! 1-Function To SignUp User:
export const signUpUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (
      !username ||
      !password ||
      !email ||
      username === "" ||
      password === "" ||
      email === ""
    ) {
      return next(handleErrors(401, "All fields are required"));
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(handleErrors(401, "Invalid email format"));
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      return next(
        handleErrors(
          401,
          "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters"
        )
      );
    }

    //! Find The User by Email:
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return next(handleErrors(400, "Email already exists"));
    }
    //! Find The User by Username:
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return next(handleErrors(400, "Username already exists"));
    }
    //* hash the password:
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    // ? Image For The User:
    const PROFILE_PIC = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PIC[Math.floor(Math.random() * PROFILE_PIC.length)];
    //* Create The User:
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image,
    });
    if (newUser) {
      // ? generate Token:
      generateTokenAndSetCookies(newUser._id, res);
      await newUser.save();
      const { password: pass, ...rest } = newUser._doc;
      res.status(200).json(rest);
    } else {
      return next(handleErrors(400, "Failed to create user"));
    }
  } catch (error) {
    console.log("Error while signing up user", error.message);
    next(error);
  }
};

//! 2-Function To SignIn User:
export const signInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password || email === "" || password === "") {
      return next(handleErrors(401, "All fields are required"));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return next(
        handleErrors(404, "Invalid email or password,try to sign up")
      );
    }
    const isMatchPassword = bcryptjs.compareSync(password, user.password);
    if (!isMatchPassword) {
      return next(
        handleErrors(401, "Invalid email or password,try to sign up")
      );
    }
    //? generate Token:
    generateTokenAndSetCookies(user._id, res);
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    console.log("Error while signing in user", error.message);
    next(error);
  }
};

//! 3-Function To Logout User:
export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log("Error while logging out user", error.message);
    next(error);
  }
};

//! 4-Function To Get Auth Check User (get the current user OR get the logined user):
export const getAuthCheck = async (req, res, next) => {
  try {
    // console.log("req.user = ", req.user); // req.user is comming from the middleware.
    res.status(200).json({ user: req.user });
  } catch (error) {
    console.log("Error while getting auth check user", error.message);
    next(error);
  }
};
