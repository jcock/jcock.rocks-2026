import type { ReactNode } from 'react';

type WorkLayoutProps = Readonly<{
	children: ReactNode;
}>;

const WorkLayout = ({ children }: WorkLayoutProps) => {
	return <>{children}</>;
};

export default WorkLayout;
