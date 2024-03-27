
import express from "express";
import db from "../db/conn.mjs";
import bcrypt from "bcrypt";

const router = express.Router();

// GET all users
router.get("/signup", async (req, res) => {
    try {
      let collection = db.collection("Users");
      let results = await collection.find({})
        .limit(50)
        .toArray();
  
      res.send(results).status(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  router.post("/signup", async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Check if the user already exists based on the email
      const userExists = await db.collection("Users").findOne({ email });
  
      if (userExists) {
        return res.status(400).json({ error: "User with this email already exists" });
      }
  
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Save the user information in the Users collection
      const result = await db.collection("Users").insertOne({
        username,
        email,
        password: hashedPassword,
      });
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

export default router;
