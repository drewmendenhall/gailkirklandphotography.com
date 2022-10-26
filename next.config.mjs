/* eslint-env node */

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  // distDir: process.env.NEXT_DIST_DIR,
  // poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig
