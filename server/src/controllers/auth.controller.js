// Authentication controller.

const prisma = require("../config/db");

const {
  createOAuthState,
  getGitHubAuthorizationUrl,
  exchangeCodeForToken,
  getGitHubUser,
  upsertGitHubUser,
} = require("../auth/github.auth");

const {
  getGitHubRepositories,
  syncGitHubRepositories,
} = require("../auth/github.repositories");

const {
  SESSION_COOKIE_NAME,
  createSessionToken,
  getSessionCookieOptions,
} = require("../auth/session.auth");

/**
 * Start GitHub OAuth login.
 */
function startGitHubLogin(req, res) {
  try {
    const state = createOAuthState();

    const authorizationUrl = getGitHubAuthorizationUrl(state);

    res.cookie("github_oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 10 * 60 * 1000,
    });

    return res.redirect(authorizationUrl);
  } catch (error) {
    console.error("GitHub login error:", error);

    return res.status(500).json({
      message: "Unable to start GitHub authentication",
    });
  }
}

/**
 * Handle GitHub OAuth callback.
 */
async function handleGitHubCallback(req, res) {
  try {
    const { code, state, error, error_description } = req.query;

    if (error) {
      return res.status(400).json({
        message:
          error_description || "GitHub authentication was cancelled",
      });
    }

    if (!code || !state) {
      return res.status(400).json({
        message: "Missing GitHub authorization code or state",
      });
    }

    const savedState = req.cookies.github_oauth_state;

    if (!savedState || savedState !== state) {
      return res.status(400).json({
        message: "Invalid OAuth state",
      });
    }

    res.clearCookie("github_oauth_state");

    // Exchange authorization code for GitHub access token
    const tokenData = await exchangeCodeForToken(code);

    // Fetch GitHub profile
    const githubUser = await getGitHubUser(tokenData.accessToken);

    // Create or update local User + GitHub Account
    const user = await upsertGitHubUser(githubUser, tokenData);

    // Get GitHub account and access token
    const account = await prisma.account.findUnique({
      where: {
        provider_providerAccountId: {
          provider: "github",
          providerAccountId: String(githubUser.id),
        },
      },
    });

    if (!account || !account.accessToken) {
      throw new Error("GitHub account or access token not found");
    }

    // Fetch repositories from GitHub
    const githubRepositories = await getGitHubRepositories(
      account.accessToken
    );

    // Save repositories in database
    const repositories = await syncGitHubRepositories(
      user.id,
      githubRepositories
    );

    // Create Syntnex AI session
    const sessionToken = createSessionToken(user.id);

    res.cookie(
      SESSION_COOKIE_NAME,
      sessionToken,
      getSessionCookieOptions()
    );

    console.log(`✅ GitHub login successful: ${githubUser.login}`);
    console.log(`📦 Repositories synced: ${repositories.length}`);
    console.log(`🔐 Syntnex AI session created`);

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    return res.redirect(`${frontendUrl}?username=${githubUser.login}&login=success`);
  } catch (error) {
    console.error("GitHub callback error:", error);

    return res.status(500).json({
      message: "GitHub authentication failed",
    });
  }
}

/**
 * Get currently authenticated user.
 */
async function getCurrentUser(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
      include: {
        accounts: {
          select: {
            provider: true,
            providerAccountId: true,
          },
        },
        repositories: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.json({
      user: {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      accounts: user.accounts,
      repositories: {
        count: user.repositories.length,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return res.status(500).json({
      message: "Failed to fetch current user",
    });
  }
}

/**
 * Logout current user.
 */
function logoutUser(req, res) {
  try {
    res.clearCookie(
      SESSION_COOKIE_NAME,
      getSessionCookieOptions()
    );

    return res.json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      message: "Logout failed",
    });
  }
}

module.exports = {
  startGitHubLogin,
  handleGitHubCallback,
  getCurrentUser,
  logoutUser,
};