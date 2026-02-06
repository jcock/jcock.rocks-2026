import redirects from './data/redirects.ts';

const nextConfig = {
	reactStrictMode: true,
	experimental: {
		scrollRestoration: true
	},
	i18n: {
		locales: ['en-US'],
		defaultLocale: 'en-US'
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

export default nextConfig;
