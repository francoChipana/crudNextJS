/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/product",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
