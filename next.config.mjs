/** @type {import('next').NextConfig} */
const nextConfig = {
    rewrites: async () => {
        return [{
            source: '/api/:path*',
            destination:
                process.env.NODE_ENV === 'development' ?
                    'http://localhost:8000/api/:path*' :
                    '/api/',
        }]
    }
};

export default nextConfig;