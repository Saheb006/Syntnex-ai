const crypto = require("crypto");
const prisma = require("../config/db");

const GITHUB_AUTHORIZE_URL =
  "https://github.com/login/oauth/authorize";

const GITHUB_TOKEN_URL =
  "https://github.com/login/oauth/access_token";

const GITHUB_USER_URL =
  "https://api.github.com/user";

// Generate OAuth state
function createOAuthState() {
  return crypto.randomBytes(32).toString("hex");
}

// Generate GitHub authorization URL
function getGitHubAuthorizationUrl(state) {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: process.env.GITHUB_CALLBACK_URL,
    state,
  });

  return `${GITHUB_AUTHORIZE_URL}?${params.toString()}`;
}

// Exchange authorization code for access token
async function exchangeCodeForToken(code) {
  const response = await fetch(GITHUB_TOKEN_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: process.env.GITHUB_CALLBACK_URL,
    }),
  });

  const data = await response.json();

  if (!response.ok || data.error || !data.access_token) {
    throw new Error(
      data.error_description || "Failed to obtain GitHub access token"
    );
  }

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token || null,
    expiresIn: data.expires_in || null,
    refreshTokenExpiresIn: data.refresh_token_expires_in || null,
  };
}

// Fetch GitHub user
async function getGitHubUser(accessToken) {
  const response = await fetch(GITHUB_USER_URL, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${accessToken}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch GitHub user"
    );
  }

  return data;
}

// Create or update local User + GitHub Account
async function upsertGitHubUser(githubUser, tokenData) {
  const provider = "github";
  const providerAccountId = String(githubUser.id);

  const existingAccount = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider,
        providerAccountId,
      },
    },
  });

  if (existingAccount) {
    return prisma.user.update({
      where: {
        id: existingAccount.userId,
      },
      data: {
        accounts: {
          update: {
            where: {
              id: existingAccount.id,
            },
            data: {
              accessToken: tokenData.accessToken,
              refreshToken: tokenData.refreshToken,
              expiresAt: tokenData.expiresIn
                ? new Date(Date.now() + tokenData.expiresIn * 1000)
                : null,
            },
          },
        },
      },
    });
  }

  return prisma.user.create({
    data: {
      accounts: {
        create: {
          provider,
          providerAccountId,
          accessToken: tokenData.accessToken,
          refreshToken: tokenData.refreshToken,
          expiresAt: tokenData.expiresIn
            ? new Date(Date.now() + tokenData.expiresIn * 1000)
            : null,
        },
      },
    },
  });
}

module.exports = {
  createOAuthState,
  getGitHubAuthorizationUrl,
  exchangeCodeForToken,
  getGitHubUser,
  upsertGitHubUser,
};