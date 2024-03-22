import mongoose from "mongoose";

const uri = "mongodb+srv://prashantaupreti1:health123@cluster0.ti7o7pg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB using Mongoose with the database name specified
mongoose.connect(uri, { dbName: 'library' });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
  console.log("Connected to library database");
});

export default db;

