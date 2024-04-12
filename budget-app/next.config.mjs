/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Fix Error: Expected signal to be an instanceof AbortSignal
   * https://github.com/vercel/next.js/issues/55682
   */
  experimental: {
    serverMinification: false,
  },
  output: "standalone",
};

export default nextConfig;
