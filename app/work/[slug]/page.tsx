import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { CustomMDX } from '~/components/modules/mdx';
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

	if (!sample) {
		notFound();
	}

	return <CustomMDX source={sample.content} />;
};

export default WorkSamplePage;
