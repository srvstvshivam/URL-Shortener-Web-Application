import express from "express";
import mongoose from "mongoose";
import path from "path";
import dotenv from "dotenv";
import { shorturl, getOriginalUrl } from "./controllers/url.js";

dotenv.config();

const app = express();
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection (now from .env)
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Rendering EJS
app.get("/", (req, res) => {
  res.render("index.ejs", { shortUrl: null });
});

// Shortening logic
app.post("/", shorturl);

// Redirect to original URL
app.get("/:shortCode", getOriginalUrl);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
