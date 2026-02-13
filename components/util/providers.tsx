'use client';

import type { ReactNode } from 'react';

import { SectionProvider } from '~/components/util/context/section';
import ViewTransitionsProvider from '~/components/util/context/view-transitions';
import { Toaster } from '~/components/modules/core/sonner';

export function Provider({ children }: { children: ReactNode }) {
	return (
		<ViewTransitionsProvider>
			<SectionProvider>
				{children}
				<Toaster />
			</SectionProvider>
		</ViewTransitionsProvider>
	);
}
