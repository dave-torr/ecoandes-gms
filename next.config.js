module.exports = {

  reactStrictMode: true,
  images: {
    domains: ['dsm01pap002files.storage.live.com', 'dsm04pap002files.storage.live.com', "drive.google.com", "onedrive.live.com", "https://onedrive.live.com", "https://1drv.ms"],
    formats: ['image/avif', 'image/webp'],
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
