/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/changelog',
        destination: '/catatan-rilis',
        permanent: true,
      },
      {
        source: '/pembaruan',
        destination: '/catatan-rilis',
        permanent: true,
      },
      {
        source: '/kasir',
        destination: '/kapasitas',
        permanent: true,
      },
      {
        source: '/bayar',
        destination: '/kapasitas',
        permanent: true,
      },
      {
        source: '/topup',
        destination: '/kapasitas',
        permanent: true,
      },
      {
        source: '/kebijakan-pengembalian-dana',
        destination: '/transparansi',
        permanent: true,
      },
      {
        source: '/beta',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
