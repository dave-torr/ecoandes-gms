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
        port: '',
        search: '',
        // pathname:'/i/**',
        // search:'s!Ap4t05ufR52dg',
      },
      {
        protocol: 'https',
        hostname: 'dsm01pap002files.storage.live.com',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'dsm04pap002files.storage.live.com',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: '**.storage.live.com',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        port: '',
        search: '',
        pathname:'/file/d/**',
      },
      {
        protocol: 'https',
        hostname: 'onedrive.live.com',
        port: '',
        search: '',
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
