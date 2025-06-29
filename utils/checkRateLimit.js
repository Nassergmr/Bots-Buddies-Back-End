import { RateLimit } from "../models/rateLimit.js";

export const checkAndIncrementLimit = async (modelName, maxLimit) => {
  try {
    const existing = await RateLimit.findOne({ model: modelName });

    if (existing) {
      if (existing.count >= maxLimit) {
        return { allowed: false, remaining: 0 };
      }

      existing.count += 1;
      await existing.save();
      return { allowed: true, remaining: maxLimit - existing.count };
    }

    // No document yet, create one
    await RateLimit.create({ model: modelName, count: 1 });
    return { allowed: true, remaining: maxLimit - 1 };
  } catch (error) {
    console.error("Rate limit check error:", error);
    return { allowed: false, remaining: 0, error };
  }
};
