// models/rateLimit.js
import mongoose from "mongoose";

const RateLimitSchema = new mongoose.Schema({
  model: { type: String, required: true },
  count: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now, expires: 86400 }, // 24h
});

// Unique index to avoid duplicates
RateLimitSchema.index({ model: 1 }, { unique: true });

export const RateLimit = mongoose.model("RateLimit", RateLimitSchema);
