import createMDX from '@next/mdx';
import redirects from './data/redirects.ts';

const svgAsComponentRule = {
	loaders: ['@svgr/webpack'],
	as: '*.js'
};

const withMDX = createMDX({
	options: {
		// Turbopack requires serializable loader options, so plugins are passed by name.
		remarkPlugins: ['remark-frontmatter', 'remark-mdx-frontmatter']
	}
});

const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	experimental: {
		scrollRestoration: true
	},
	images: {
		deviceSizes: [640, 750, 1080, 1920, 2048, 3840],
		qualities: [25, 50, 75, 90, 100],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.flowplayer.com',
				pathname: '/**/*'
			}
		]
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

export default withMDX(nextConfig);
