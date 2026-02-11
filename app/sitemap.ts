import type { MetadataRoute } from 'next';

import site from '~/data/site.json';
import { getWorkSamples } from '~/app/work/server-utils';

const withNoTrailingSlash = (value: string) => value.replace(/\/+$/, '');

export const baseUrl = withNoTrailingSlash(
	process.env.NEXT_PUBLIC_HOST || site.url
);

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date().toISOString();

	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: `${baseUrl}/`,
			lastModified: now
		}
	];

	const workRoutes: MetadataRoute.Sitemap = getWorkSamples().map(sample => ({
		url: `${baseUrl}/work/${sample.slug}`,
		lastModified: sample.metadata.publishedAt || now
	}));

	return [...staticRoutes, ...workRoutes];
}
