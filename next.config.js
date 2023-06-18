/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: 'cloudinary',
        path: 'https://res.cloudinary.com/dufz34j2z/image/upload',
    },
}

module.exports = nextConfig;