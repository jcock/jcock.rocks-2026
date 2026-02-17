'use client';

import type { ReactNode } from 'react';
import { ViewTransitions } from 'next-view-transitions';

type ViewTransitionsProviderProps = {
	children: ReactNode;
};

export const ViewTransitionsProvider = ({
	children
}: ViewTransitionsProviderProps) => {
	return <ViewTransitions>{children}</ViewTransitions>;
};
