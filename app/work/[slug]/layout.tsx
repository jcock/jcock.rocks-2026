import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';

import { getWorkSampleBySlug } from '~/app/work/server-utils';
import { formatDate } from '~/app/work/utils';
import JumbotronWork from '~/components/modules/jumbotron/work';

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

	if (!sample) {
		notFound();
	}

	return (
		<div>
			<JumbotronWork
				title={sample.metadata.title}
				summary={sample.metadata.summary}
				client={sample.metadata.client}
				year={formatDate(sample.metadata.publishedAt)}
				roles={sample.metadata.roles}
				color={sample.metadata.color}
			/>

			<section className="container px-4 my-20">
				<article className="mx-auto prose prose-headings:font-medium dark:prose-invert">
					{children}
				</article>
			</section>
		</div>
	);
};

export default WorkSampleLayout;
