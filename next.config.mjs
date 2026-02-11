import redirects from './data/redirects.ts';

const svgAsComponentRule = {
	loaders: ['@svgr/webpack'],
	as: '*.js'
};

const nextConfig = {
	reactStrictMode: true,
	experimental: {
		scrollRestoration: true
	},
	async redirects() {
		return redirects;
	},
	turbopack: {
		rules: {
			// Keep a single SVG pipeline in Turbopack during `next dev`.
			'*.svg': svgAsComponentRule
		}
	}
};

export default nextConfig;
