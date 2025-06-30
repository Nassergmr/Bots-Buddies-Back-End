import mongoose from "mongoose";

const RateLimitSchema = new mongoose.Schema({
  model: { type: String, required: true, unique: true },
  count: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

RateLimitSchema.index({ createdAt: 1 }, { expireAfterSeconds: 180 });

export const RateLimit = mongoose.model("RateLimit", RateLimitSchema);
