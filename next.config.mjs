/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'groww.in',
            },
        ],
    },
};

export default nextConfig;
