import express from "express";
import session from 'express-session';
import flash from 'connect-flash';
import cors from 'cors';
import ejs from 'ejs';
import  db  from "./db/conn.mjs";
import signup from "./routes/signup.mjs";
import { ObjectId } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 2000;
const app = express();

// Configure express-session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Configure flash messages (should be before using flash)
app.use(flash());

// Configure CORS middleware (should be before any routes)
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Set up routes
app.use("/api", signup);

// Set the view engine to ejs
app.set("view engine", "ejs");

// Set up static files serving
app.use(express.static('public'));

// Start the Express server
app.listen(PORT, () => {
  console.log("application running");
});

// Define routes
app.get("/", (req, res) => {
    // Assuming `user` is set in your session or available from your authentication mechanism
    const user = req.session.user; // Adjust this according to your authentication mechanism
  
    // Passing the 'title' and 'content' variables to the view, along with the 'user' variable
    res.render("pages/home", { title: "Home", content: "", user: user });
});
app.get('/search', (req, res) => {
    const query = req.query.query; // Get the search query from the request query parameters

    // Perform the search operation (replace this with your actual search logic)
    const searchResults = performSearch(query);

    // Render the search results (replace 'search-results.ejs' with your actual search results template)
    res.render('search-results', { results: searchResults });
});
app.get("/login", (req, res)=> {
  res.render("pages/login", {title: "login Page"});
});

app.get("/signup", (req, res)=> {
  res.render("pages/signup", {title: "signUp Page"});
});

// Global error handling
app.use((err, _req, res, next) => {
  console.error(err);
  res.status(500).send("Uh oh! An unexpected error occurred.");
});
