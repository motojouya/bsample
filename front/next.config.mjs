/** @type {import('next').NextConfig} */

const serverHost = process.env.SERVER_HOST;
const serverPort = process.env.SERVER_PORT;
const nextConfig = {
  rewrites: () => {
    return [
      {
        source: "/api/:path*",
        destination: `http://${serverHost}:${serverPort}/api/:path*`
      },
    ];
  },
};

export default nextConfig;
