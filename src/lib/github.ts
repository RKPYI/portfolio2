import { Buffer } from "buffer";
import type { PortfolioData } from "@/types/portfolio";

const OWNER = process.env.GITHUB_REPO_OWNER;
const REPO = process.env.GITHUB_REPO_NAME;
const BRANCH = process.env.GITHUB_BRANCH || "main";
const FILE_PATH = "data/portfolio.json";

function apiBase() {
  if (!OWNER || !REPO) {
    throw new Error(
      "GITHUB_REPO_OWNER and GITHUB_REPO_NAME must be set in your environment."
    );
  }
  return `https://api.github.com/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`;
}

export interface PortfolioFile {
  data: PortfolioData;
  sha: string;
}

/**
 * Reads data/portfolio.json straight from the GitHub repo via the Contents
 * API. Using the API (not raw.githubusercontent.com) avoids CDN caching, so
 * edits show up immediately without a redeploy.
 */
export async function getPortfolioFile(): Promise<PortfolioFile> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (process.env.GITHUB_READ_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_READ_TOKEN}`;
  }

  const res = await fetch(`${apiBase()}?ref=${BRANCH}`, {
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      `Could not load portfolio content from GitHub (status ${res.status}). ` +
        `Check GITHUB_REPO_OWNER / GITHUB_REPO_NAME / GITHUB_BRANCH.`
    );
  }

  const json = await res.json();
  const decoded = Buffer.from(json.content, "base64").toString("utf-8");
  return { data: JSON.parse(decoded) as PortfolioData, sha: json.sha as string };
}

/**
 * Commits an updated portfolio.json back to the repo. Requires the signed-in
 * owner's GitHub OAuth access token (scope: repo).
 */
export async function updatePortfolioFile(
  newData: PortfolioData,
  sha: string,
  accessToken: string
) {
  const content = Buffer.from(JSON.stringify(newData, null, 2)).toString(
    "base64"
  );

  const res = await fetch(apiBase(), {
    method: "PUT",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Update portfolio content — ${new Date().toISOString()}`,
      content,
      sha,
      branch: BRANCH,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`GitHub commit failed (status ${res.status}): ${errText}`);
  }

  return res.json();
}
