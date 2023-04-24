/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		API_URL: process.env.API_URL,
		RAPID_API_KEY: process.env.RAPID_API_KEY,
		RAPID_API_HOST: process.env.RAPID_API_HOST,
	},
	experimental: {
		appDir: true,
	},
}

module.exports = nextConfig
