// Authentication middleware.

const {
  SESSION_COOKIE_NAME,
  verifySessionToken,
} = require("../auth/session.auth");

function requireAuth(req, res, next) {
  try {
    const token = req.cookies[SESSION_COOKIE_NAME];

    if (!token) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const payload = verifySessionToken(token);

    if (!payload.userId) {
      return res.status(401).json({
        message: "Invalid authentication session",
      });
    }

    req.userId = payload.userId;

    next();
  } catch (error) {
    console.error("Authentication middleware error:", error);

    return res.status(401).json({
      message: "Invalid or expired authentication session",
    });
  }
}

module.exports = {
  requireAuth,
};
