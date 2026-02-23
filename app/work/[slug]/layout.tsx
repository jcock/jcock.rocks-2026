import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';

import JumbotronWork from '~/components/modules/jumbotron/work';
import WorkSection from '~/components/modules/section/work';

import { getWorkSampleBySlug, getWorkSamples } from '~/app/work/server-utils';
import { formatDate } from '~/app/work/utils';

type WorkSampleLayoutProps = Readonly<{
	children: ReactNode;
	params: Promise<{
		slug: string;
	}>;
}>;

const WorkSampleLayout = async ({
	children,
	params
}: WorkSampleLayoutProps) => {
	const { slug } = await params;
	const sample = getWorkSampleBySlug(slug);
	const workSamples = getWorkSamples();
	const filteredSamples = workSamples.filter(sample => sample.slug !== slug);

	if (!sample) {
		notFound();
	}

	return (
		<div>
			<JumbotronWork
				title={sample.metadata.title}
				summary={sample.metadata.summary}
				siteUrl={sample.metadata.siteUrl}
				client={sample.metadata.client}
				year={formatDate(sample.metadata.publishedAt)}
				roles={sample.metadata.roles}
				color={sample.metadata.color}
			/>

			<section className="container px-8 md:px-16 my-20">
				<article className="mx-auto prose prose-headings:font-medium dark:prose-invert *:text-pretty">
					{children}
				</article>
			</section>

			<WorkSection
				title="More work"
				samples={filteredSamples}
				className="md:py-24 border-t border-border"
			/>
		</div>
	);
};

export default WorkSampleLayout;
