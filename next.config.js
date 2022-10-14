/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: true,
    images: {
        domains: [
            'picsum.photos',
            'fakestoreapi.com',
            'naszsklep-api.vercel.app',
        ],
    },
};

module.exports = nextConfig;
