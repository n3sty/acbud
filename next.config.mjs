/**
 * @type {import('next').NextConfig}
 */


const nextConfig = {
    images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'links.papareact.com',
            port: '',
            pathname: '/ocw',
        },
    ],
},
};

export default nextConfig;
