module.exports = {

  reactStrictMode: true,
  images: {
    domains: ['dsm01pap002files.storage.live.com', 'dsm04pap002files.storage.live.com', 'drive.google.com', 'onedrive.live.com', 'onedrive.live.com', '1drv.ms'],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: 'https',
        hostname: '1drv.ms',
      },
      {
        protocol: 'https',
        hostname: 'dsm01pap002files.storage.live.com',
      },
      {
        protocol: 'https',
        hostname: 'dsm04pap002files.storage.live.com',
      },
      {
        protocol: 'https',
        hostname: '**.storage.live.com',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname:'/file/d/**',
      },
      {
        protocol: 'https',
        hostname: 'onedrive.live.com',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/tours',
        permanent: false,
      },
    ]
  }

}
