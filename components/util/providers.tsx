'use client';

import type { ReactNode } from 'react';

import { ReactLenis } from 'lenis/react';

import { ThemeProvider } from '~/components/util/context/theme';
import { ScrollToTopOnNavigation } from '~/components/util/context/scroll-to-top-on-navigation';
import { ViewTransitionsProvider } from '~/components/util/context/view-transitions';
import { SectionProvider } from '~/components/util/context/section';
import { Toaster } from '~/components/modules/core/sonner';

export function Provider({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<ViewTransitionsProvider>
				<ScrollToTopOnNavigation />
				<SectionProvider>
					<ReactLenis root />
					{children}
					<Toaster />
				</SectionProvider>
			</ViewTransitionsProvider>
		</ThemeProvider>
	);
}
