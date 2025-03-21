/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      domains: ["harrison302009-app.prod1.defang.dev"],
    },
    experimental: {
      serverActions: true,
    },
  };
  
  module.exports = nextConfig;