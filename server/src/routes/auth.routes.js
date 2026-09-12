const express = require("express");

const {
  startGitHubLogin,
  handleGitHubCallback,
  getCurrentUser,
  logoutUser,
} = require("../controllers/auth.controller");

const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/github", startGitHubLogin);

router.get("/github/callback", handleGitHubCallback);

router.get("/me", requireAuth, getCurrentUser);

router.post("/logout", requireAuth, logoutUser);

module.exports = router;