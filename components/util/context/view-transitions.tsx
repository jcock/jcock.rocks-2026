'use client';

import type { ReactNode } from 'react';

type ViewTransitionsProviderProps = {
	children: ReactNode;
};

export const ViewTransitionsProvider = ({
	children
}: ViewTransitionsProviderProps) => {
	return <>{children}</>;
};
