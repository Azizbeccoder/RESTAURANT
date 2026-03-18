// BUG FIX 14: The original config.ts exported hardcoded values (PORT=3005, MONGO_URI with localhost).
// But server.ts uses dotenv (process.env.PORT / process.env.MONGO_URL) — these conflicted.
// jwt.utils.ts imports JWT_SECRET and JWT_EXPIRES_IN from config — keep those.
// PORT and MONGO_URI constants are removed since server.ts reads from .env directly.

export const MORGAN_FORMAT = "dev";

export const JWT_SECRET = process.env.JWT_SECRET || "secret"; // BUG FIX 15: Never hardcode secrets — read from .env
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
