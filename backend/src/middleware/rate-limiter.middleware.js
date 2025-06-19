import { rateLimit } from "../config/rate-limit.js";

export const ratelimiter = async (req, res, next) => {
  try {
    const ip =
      req.ip || req.connection.remoteAddress || req.socket.remoteAddress;

    const { success } = await rateLimit.limit(ip);

    if (!success) {
      return res.status(429).json({ message: "Too many requests" });
    }

    next();
  } catch (err) {
    console.log("Rate limit error:", err);
    next();
  }
};
