import type { ReactNode } from 'react';

import JumbotronWork from '~/components/modules/jumbotron/work';

type WorkLayoutProps = Readonly<{
	children: ReactNode;
}>;

const WorkLayout = ({ children }: WorkLayoutProps) => {
	return (
		<div>
			<JumbotronWork
				title="Project Title"
				client="Client Name"
				year="2024"
				roles={['Role1', 'Role2']}
			/>
			<section className="container px-4 my-20">
				<article className="mx-auto max-w-3xl prose dark:prose-invert">
					{children}
				</article>
			</section>
		</div>
	);
};

export default WorkLayout;
