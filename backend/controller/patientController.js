// const User = require("../Models/PatientModel.js");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.signUp = async (req, res) => {
//     try {
//         const { name, email, password, role, age, bloodGroup, licenseNumber } = req.body;

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) return res.status(400).json({ message: "User already exists" });

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create user
//         const newUser = new User({
//             name,
//             email,
//             password: hashedPassword,
//             role,
//             age,
//             bloodGroup,
//             licenseNumber
//         });

//         await newUser.save();
//         res.status(201).json({ message: "User registered successfully" });

//     } catch (error) {
//         res.status(500).json({ error: "Server Error" });
//     }
// };

// exports.signIn = async (req, res) => {
//     try {
//         const { email, password } = req.body;
        
//         // Find user
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "Invalid email or password" });

//         // Validate password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

//         // Generate JWT token
//         const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

//         res.json({ message: "Login successful", token, role: user.role });

//     } catch (error) {
//         res.status(500).json({ error: "Server Error" });
//     }
// };



// import User from "../Models/PatientModel.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config(); // Load environment variables

// // User Registration (Sign Up)
// export const signUp = async (req, res) => {
//     try {
//         const { name, email, password, role, age, bloodGroup, licenseNumber } = req.body;

//         // Validate required fields
//         if (!name || !email || !password || !role) {
//             return res.status(400).json({ message: "All required fields must be filled" });
//         }

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) return res.status(400).json({ message: "User already exists" });

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create user object
//         const newUser = new User({
//             name,
//             email,
//             password: hashedPassword,
//             role,
//             age: role === "patient" ? age : undefined,
//             bloodGroup: role === "patient" ? bloodGroup : undefined,
//             licenseNumber: role === "doctor" ? licenseNumber : undefined
//         });

//         await newUser.save();

//         res.status(201).json({ message: "User registered successfully", userId: newUser._id });

//     } catch (error) {
//         console.error("Sign-up Error:", error);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// };

// // User Login (Sign In)
// export const signIn = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Validate input
//         if (!email || !password) {
//             return res.status(400).json({ message: "Email and password are required" });
//         }

//         // Find user
//         const user = await User.findOne({ email });
//         if (!user) return res.status(400).json({ message: "Invalid email or password" });

//         // Validate password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

//         // Ensure JWT Secret is set
//         if (!process.env.JWT_SECRET) {
//             console.error("JWT_SECRET is not defined in environment variables");
//             return res.status(500).json({ message: "Server configuration error" });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

//         res.json({
//             message: "Login successful",
//             token,
//             role: user.role,
//             userId: user._id
//         });

//     } catch (error) {
//         console.error("Sign-in Error:", error);
//         res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// };




import Patient from "../Models/PatientModel.js"; // Ensure correct model import
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// User Registration (Sign Up)
export const signUp = async (req, res) => {
    try {
        const { name, email, password, role, age, bloodGroup, licenseNumber } = req.body;

        // Validate required fields
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        // Check if user already exists
        const existingUser = await Patient.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user object
        const newUser = new Patient({
            name,
            email,
            password: hashedPassword,
            role,
            age: role === "patient" ? age : undefined,
            bloodGroup: role === "patient" ? bloodGroup : undefined,
            licenseNumber: role === "doctor" ? licenseNumber : undefined
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully", userId: newUser._id });

    } catch (error) {
        console.error("Sign-up Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// User Login (Sign In)
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find user
        const user = await Patient.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        // Ensure JWT Secret is set
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment variables");
            return res.status(500).json({ message: "Server configuration error" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({
            message: "Login successful",
            token,
            role: user.role,
            userId: user._id
        });

    } catch (error) {
        console.error("Sign-in Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
