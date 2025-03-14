// // const jwt = require("jsonwebtoken");
// // require("dotenv").config();

// // const httpStatusCode = require("../constants/httpStatusCode");

// // async function getToken(user) {
// //   const token = await jwt.sign({ user }, process.env.JWT_SECRET, {
// //     expiresIn: "1d",
// //   });
// //   return token;
// // }

// // async function verifyToken(req, res, next) {
// //   const token = req.headers.authorization.split(" ")[1];
// //   if (!token) {
// //     return res
// //       .status(httpStatusCode.UNAUTHORIZED)
// //       .json({ success: false, message: "Unauthorized: Token not provided" });
// //   }

// //   try {
// //     // Split the authorization header by space and directly use the token
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = decoded.user;
// //     console.log(req.user);
// //     // console.log("token:", token);
// //     // console.log("secreate key:",process.env.JWT_SECRET)
// //     next();
// //   } catch (error) {
// //     console.error("Error verifying token:", error);
// //     return res
// //       .status(httpStatusCode.UNAUTHORIZED)
// //       .json({ success: false, message: "Unauthorized: Invalid token" });
// //   }
// // }

// // module.exports = {
// //   getToken,
// //   verifyToken,
// // };



// // const jwt = require("jsonwebtoken");

// // module.exports = (req, res, next) => {
// //     const token = req.header("Authorization");
// //     if (!token) return res.status(401).json({ message: "Access Denied" });

// //     try {
// //         const verified = jwt.verify(token, process.env.JWT_SECRET);
// //         req.user = verified;
// //         next();
// //     } catch (error) {
// //         res.status(401).json({ message: "Invalid Token" });
// //     }
// // };



// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//     const token = req.header("Authorization");
//     if (!token) return res.status(401).json({ message: "Access Denied" });

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: "Invalid Token" });
//     }
// };

// export default authMiddleware;



import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // ✅ Extract token from "Bearer <token>"

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

export default authMiddleware;

