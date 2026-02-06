import createMDX from '@next/mdx';
import redirects from './data/redirects.ts';

const withMDX = createMDX({
	extension: /\.(md|mdx)$/
});

const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	experimental: {
		scrollRestoration: true
	},
	async redirects() {
		return redirects;
	},
	turbopack: {
		rules: {
			'*.svg': {
				loaders: ['@svgr/webpack'],
				as: '*.js'
			}
		}
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack']
		});

		return config;
	}
};

export default withMDX(nextConfig);
