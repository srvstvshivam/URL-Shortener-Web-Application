import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortCode: { type: String, required: true },
  longUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Url = mongoose.model("shortUrl", urlSchema);
