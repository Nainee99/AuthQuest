import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true, // cookie cannot be accessed by client-side APIs
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    secure: process.env.NODE_ENV === "production", // cookie will only be sent over HTTPS
    sameSite: "strict", // cookie will only be sent if the request is made from the
  });

  return token;
};