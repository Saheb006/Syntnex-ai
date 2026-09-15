const prisma = require("../config/db");

const GITHUB_REPOSITORIES_URL = "https://api.github.com/user/repos";

async function getGitHubRepositories(accessToken) {
  const repositories = [];
  let page = 1;

  while (true) {
    const url = new URL(GITHUB_REPOSITORIES_URL);

    url.searchParams.set("per_page", "100");
    url.searchParams.set("page", String(page));
    url.searchParams.set(
      "affiliation",
      "owner,collaborator,organization_member"
    );
    url.searchParams.set("sort", "full_name");

    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${accessToken}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to fetch GitHub repositories"
      );
    }

    repositories.push(...data);

    if (data.length < 100) {
      break;
    }

    page++;
  }

  return repositories;
}

async function syncGitHubRepositories(userId, repositories) {
  const syncedRepositories = [];

  for (const repository of repositories) {
    const syncedRepository = await prisma.repository.upsert({
      where: {
        githubId: String(repository.id),
      },
      update: {
        name: repository.name,
        fullName: repository.full_name,
        url: repository.html_url,
        defaultBranch: repository.default_branch || "main",
        language: repository.language || null,
        stars: repository.stargazers_count || 0,
        userId,
      },
      create: {
        githubId: String(repository.id),
        name: repository.name,
        fullName: repository.full_name,
        url: repository.html_url,
        defaultBranch: repository.default_branch || "main",
        language: repository.language || null,
        stars: repository.stargazers_count || 0,
        userId,
      },
    });

    syncedRepositories.push(syncedRepository);
  }

  return syncedRepositories;
}

module.exports = {
  getGitHubRepositories,
  syncGitHubRepositories,
};