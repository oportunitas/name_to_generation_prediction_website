/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: "name_to_generation_prediction_website",
    images: {
        unoptimized: true,
    },
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