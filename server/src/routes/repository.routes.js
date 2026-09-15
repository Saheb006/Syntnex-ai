const express = require("express");

const {
  getUserRepositories,
  syncRepositories,
} = require("../controllers/repository.controller");

const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", requireAuth, getUserRepositories);

router.post("/sync", requireAuth, syncRepositories);

module.exports = router;
