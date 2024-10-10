/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com']
    },
    experimental: {
        serverActions: {
          bodySizeLimit: '2mb',
        },
      },
      async rewrites() {
        return [
          {
            source: '/@:username',
            destination: '/:username',
          },
        ];
      },
      
};

export default nextConfig;
