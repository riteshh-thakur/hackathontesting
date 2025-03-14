import { sign, verify } from "jsonwebtoken";
require("dotenv").config();

import { UNAUTHORIZED } from "../constants/httpStatusCode";

async function getToken(user) {
  const token = await sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
}

async function verifyToken(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res
      .status(UNAUTHORIZED)
      .json({ success: false, message: "Unauthorized: Token not provided" });
  }

  try {
    // Split the authorization header by space and directly use the token
    const decoded = verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log(req.user);
    // console.log("token:", token);
    // console.log("secreate key:",process.env.JWT_SECRET)
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res
      .status(UNAUTHORIZED)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
}

export default {
  getToken,
  verifyToken,
};
