const express = require("express");

const {
  getUserRepositories,
  syncRepositories,
  getRepositoryBranches,
} = require("../controllers/repository.controller");

const { requireAuth } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", requireAuth, getUserRepositories);

router.post("/sync", requireAuth, syncRepositories);

router.get("/:fullName/branches", requireAuth, getRepositoryBranches);

module.exports = router;
