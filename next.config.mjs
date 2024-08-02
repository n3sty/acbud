/**
 * @type {import('next').NextConfig}
 */


const nextConfig = {
    images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: "links.papareact.com",
            port: '',
            pathname: '/*',
        },{
            protocol: 'https',
            hostname: "img.daisyui.com",
            port: '',
            pathname: '/images/stock/*',
        },{
            protocol: 'https',
            hostname: "lh3.googleusercontent.com",
        },{
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
        },{
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com'
        }

        
    ],
},
};

export default nextConfig;
