import express from "express";
import connectDB from "./database/connection.js";
import dotenv from "dotenv/config"; // Automatically loads environment variables from .env file
import "dotenv/config"; // Automatically loads environment variables from .env file
import bodyParser from "body-parser";
import cors from "cors";

// Initialize express app
const app = express();

// Middleware to enable CORS
const corsOptions = {
  origin: "http://localhost:5173", // Adjust this to your client URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials
  optionsSuccessStatus: 204, // For legacy browser support
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.error("Error connecting to the database:", error));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.json());
// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Importing routes
import userRoutes from "./routes/User.js";
import snippetRoutes from "./routes/Snippets.js";
import snippetCommentRoutes from "./routes/SnippetComment.js";
// Using routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/snippet", snippetRoutes);
app.use("/api/v1/comment", snippetCommentRoutes);
