import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ComponentType } from 'react';

import {
	getWorkSampleBySlug,
	getWorkSampleSlugs
} from '~/app/work/server-utils';
import type { WorkSampleMetadata } from '~/app/work/types';

type WorkSamplePageProps = {
	params: Promise<{
		slug: string;
	}>;
};

const metadataFromSample = (metadata: WorkSampleMetadata): Metadata => {
	return {
		title: `${metadata.title} | Work`,
		description: metadata.summary || undefined
	};
};

type WorkSampleModule = {
	default: ComponentType<Record<string, never>>;
};

const loadWorkSampleComponent = async (slug: string) => {
	try {
		const module = (await import(
			/* webpackInclude: /\.mdx$/ */
			`../samples/${slug}.mdx`
		)) as WorkSampleModule;
		return module.default;
	} catch {
		return null;
	}
};

export const generateStaticParams = async () => {
	return getWorkSampleSlugs().map(slug => ({ slug }));
};

export const generateMetadata = async ({
	params
}: WorkSamplePageProps): Promise<Metadata> => {
	const { slug } = await params;
	const sample = getWorkSampleBySlug(slug);

	if (!sample) {
		return {
			title: 'Work sample not found'
		};
	}

	return metadataFromSample(sample.metadata);
};

const WorkSamplePage = async ({ params }: WorkSamplePageProps) => {
	const { slug } = await params;
	const sample = getWorkSampleBySlug(slug);
	const SampleContent = await loadWorkSampleComponent(slug);

	if (!sample || !SampleContent) {
		notFound();
	}

	return <SampleContent />;
};

export default WorkSamplePage;
