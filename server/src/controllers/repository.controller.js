const prisma = require("../config/db");

const {
  getGitHubRepositories,
  syncGitHubRepositories,
} = require("../auth/github.repositories");

/**
 * Get all repositories for the authenticated user
 */
async function getUserRepositories(req, res) {
  try {
    const repositories = await prisma.repository.findMany({
      where: {
        userId: req.userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return res.json({
      repositories: repositories.map((repo) => ({
        id: repo.id,
        githubId: repo.githubId,
        name: repo.name,
        fullName: repo.fullName,
        url: repo.url,
        defaultBranch: repo.defaultBranch,
        language: repo.language || "Unknown",
        stars: repo.stars || 0,
        updatedAt: repo.updatedAt,
      })),
    });
  } catch (error) {
    console.error("Get user repositories error:", error);
    return res.status(500).json({
      message: "Failed to fetch repositories",
    });
  }
}

/**
 * Sync repositories from GitHub
 */
async function syncRepositories(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
      include: {
        accounts: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const githubAccount = user.accounts.find(
      (acc) => acc.provider === "github"
    );

    if (!githubAccount || !githubAccount.accessToken) {
      return res.status(400).json({
        message: "GitHub account not connected",
      });
    }

    // Fetch repositories from GitHub
    const githubRepositories = await getGitHubRepositories(
      githubAccount.accessToken
    );

    // Sync repositories to database
    const syncedRepositories = await syncGitHubRepositories(
      user.id,
      githubRepositories
    );

    return res.json({
      message: "Repositories synced successfully",
      count: syncedRepositories.length,
      repositories: syncedRepositories,
    });
  } catch (error) {
    console.error("Sync repositories error:", error);
    return res.status(500).json({
      message: "Failed to sync repositories",
    });
  }
}

module.exports = {
  getUserRepositories,
  syncRepositories,
};
