import type { ReactNode } from 'react';

type WorkLayoutProps = Readonly<{
	children: ReactNode;
}>;

const WorkLayout = ({ children }: WorkLayoutProps) => {
	return (
		<section className="container px-4 pb-20">
			<article className="mx-auto max-w-3xl prose dark:prose-invert">
				{children}
			</article>
		</section>
	);
};

export default WorkLayout;
