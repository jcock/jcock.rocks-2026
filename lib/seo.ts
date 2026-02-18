import type { Metadata, Viewport } from 'next';

import site from '~/data/site.json';

const FALLBACK_SITE_ORIGIN = 'http://localhost:3000';

const resolveSiteOrigin = () => {
	const origin = process.env.NEXT_PUBLIC_HOST || site.url;

	try {
		return new URL(origin).toString();
	} catch {
		return FALLBACK_SITE_ORIGIN;
	}
};

const siteOrigin = resolveSiteOrigin();

type PageMetadataOptions = {
	title?: string;
	description?: string;
	keywords?: string[];
};

type WebPageStructuredDataOptions = {
	pathname: string;
	title?: string;
	description?: string;
};

export const siteMetadata: Metadata = {
	metadataBase: new URL(siteOrigin),
	title: {
		default: site.title,
		template: `%s | ${site.title}`
	},
	description: site.description,
	icons: {
		icon: [
			{
				url: '/favicon-96x96.png',
				type: 'image/png',
				sizes: '96x96'
			},
			{
				url: '/favicon.svg',
				type: 'image/svg+xml'
			},
			{
				url: '/favicon.ico',
				sizes: 'any',
				media: '(prefers-color-scheme: light)'
			},
			{
				url: '/favicon-light.ico',
				sizes: 'any',
				media: '(prefers-color-scheme: dark)'
			}
		],
		apple: '/apple-touch-icon.png'
	},
	other: {
		'msapplication-TileColor': site.colors.manifest.tileColor,
		'apple-mobile-web-app-title': site.webAppTitle
	}
};

export const siteViewport: Viewport = {
	themeColor: site.colors.manifest.themeColor
};

export const buildPageMetadata = ({
	title,
	description,
	keywords
}: PageMetadataOptions = {}): Metadata => {
	const pageTitle = title || site.title;
	const pageDescription = description || site.description;

	return {
		title,
		description: pageDescription,
		keywords
	};
};

export const buildWebPageStructuredData = ({
	pathname,
	title,
	description
}: WebPageStructuredDataOptions) => {
	const resolvedPathname = pathname.startsWith('/') ? pathname : `/${pathname}`;

	return {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		url: new URL(resolvedPathname, siteOrigin).toString(),
		name: title || site.title,
		about: description || site.description
	};
};
