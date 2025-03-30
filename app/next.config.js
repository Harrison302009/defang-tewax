/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
      domains: ["avatars.githubusercontent.com", "harrison302009-app.prod1.defang.dev"],
    },
    experimental: {
      serverActions: true,
    },
  };
  
  module.exports = nextConfig;