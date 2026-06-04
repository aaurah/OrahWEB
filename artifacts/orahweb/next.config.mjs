/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["bcryptjs"],
  allowedDevOrigins: ["*.janeway.replit.dev", "*.replit.dev"],
};

export default nextConfig;
