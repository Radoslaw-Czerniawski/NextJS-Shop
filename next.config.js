/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    trailingSlash: true,
    images: {
        domains: ['picsum.photos', 'fakestoreapi.com'],
    },
};

module.exports = nextConfig;
