'use client';

import { useContext } from 'react';

import SectionContext from '~/components/util/context/section';

const useSectionTracker = () => {
	const context = useContext(SectionContext);
	if (!context) {
		throw new Error('useSectionTracker must be used within a SectionProvider');
	}
	return context;
};

export default useSectionTracker;
