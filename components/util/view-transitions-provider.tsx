'use client';

import type { ReactNode } from 'react';
import { ViewTransitions } from 'next-view-transitions';

type ViewTransitionsProviderProps = {
	children: ReactNode;
};

const ViewTransitionsProvider = ({
	children
}: ViewTransitionsProviderProps) => {
	return <ViewTransitions>{children}</ViewTransitions>;
};

export default ViewTransitionsProvider;
