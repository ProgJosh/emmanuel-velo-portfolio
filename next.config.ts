import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'export', // Forces Next.js to compile static HTML/CSS/JS
  basePath: '/emmanuel-velo-portfolio', // Matches your GitHub repository name
  images: {
    unoptimized: true, // Required because Next.js image optimization needs a server
  },
};

module.exports = nextConfig;
