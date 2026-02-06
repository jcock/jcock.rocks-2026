'use client';

import type { ReactNode } from 'react';

import { SectionProvider } from '~/components/util/context/section';
import { Toaster } from '~/components/modules/core/sonner';

export function Provider({ children }: { children: ReactNode }) {
	return (
		<SectionProvider>
			{children}
			<Toaster />
		</SectionProvider>
	);
}
