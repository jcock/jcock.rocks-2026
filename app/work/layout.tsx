import type { ReactNode } from 'react';

type WorkLayoutProps = Readonly<{
	children: ReactNode;
}>;

const WorkLayout = ({ children }: WorkLayoutProps) => {
	return (
		<section className="container px-4 py-14">
			<article className="mx-auto max-w-3xl">{children}</article>
		</section>
	);
};

export default WorkLayout;
