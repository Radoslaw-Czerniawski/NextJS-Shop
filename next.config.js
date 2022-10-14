/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/products',
                destination: '/products/1/',
                permanent: true,
            },
        ];
    },
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
