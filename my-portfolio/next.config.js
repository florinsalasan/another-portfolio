/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Check if this is the server build (Node.js environment)
    if (isServer) {
      // Ensure that 'fs' module is not bundled on the server side
      config.externals.push("fs");
    }

    return config;
  },
};
