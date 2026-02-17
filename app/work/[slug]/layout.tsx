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
				client={sample.metadata.client}
				year={formatDate(sample.metadata.publishedAt)}
				roles={sample.metadata.roles}
				color={sample.metadata.color}
			/>

			<section className="container px-4 my-20">
				<article className="mx-auto prose dark:prose-invert">
					{sample.metadata.summary && (
						<p className="text-xl/8 md:text-2xl/10 font-light text-gray-600 dark:text-gray-400">
							{sample.metadata.summary}
						</p>
					)}
					{children}
				</article>
			</section>
		</div>
	);
};

export default WorkSampleLayout;
