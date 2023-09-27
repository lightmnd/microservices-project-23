const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// MongoDB connection
const connectToDB = async () => {
  mongoose.set("strictQuery", false);
  try {
    mongoose.connect(
      "mongodb+srv://lightmnd:xp1GEzmtvTOPY9n6@microservices.sv6dhxq.mongodb.net/"
    );
    console.log("connect to database");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("DB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("DB connected");
});

// mongoose.connect(
//   "mongodb+srv://lightmnd:xp1GEzmtvTOPY9n6@microservices.sv6dhxq.mongodb.net/",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   }
// );

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
});

const User = mongoose.model("User", userSchema);

// JWT secret key
const JWT_SECRET = "mySuperSecretKey2023!!";

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      JWT_SECRET
    );

    // Set a cookie from token
    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Match password with the hashed password in the DB
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET
    );

    // Set a cookie from token
    res.cookie("token", token, { httpOnly: true });

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(4008, () => {
  connectToDB();
  console.log(`Server is running on port 4008`);
});
