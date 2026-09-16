import type { NextConfig } from 'next';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'emmanuel-velo-portfolio';
const isGitHubPagesBuild = process.env.npm_lifecycle_event === 'build:pages'
  || process.env.GITHUB_PAGES === 'true';
const githubPagesBasePath = isGitHubPagesBuild
  ? (process.env.NEXT_PUBLIC_BASE_PATH ?? `/${repositoryName}`)
  : '';

const nextConfig: NextConfig = {
  ...(isGitHubPagesBuild
    ? {
        output: 'export' as const,
        basePath: githubPagesBasePath,
        trailingSlash: true,
      }
    : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
