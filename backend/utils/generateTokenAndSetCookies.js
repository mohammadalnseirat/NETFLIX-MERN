import jwt from "jsonwebtoken";

export const generateTokenAndSetCookies = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d", // expires in 15 days
  });

  res.cookie("access_token", token, {
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks, make it not be accessed by JS
    maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development", // only set cookie on production environment
  });
};
