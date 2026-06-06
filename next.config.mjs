const isGithubPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true
  },
  basePath: isGithubPages ? "/mastilearn" : "",
  assetPrefix: isGithubPages ? "/mastilearn/" : undefined
};

export default nextConfig;
