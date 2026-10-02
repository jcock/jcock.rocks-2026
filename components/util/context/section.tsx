'use client';

import {
	createContext,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useTransitionState } from 'next-transition-router';

import {
	createSectionTracker,
	registerSectionElement
} from '~/lib/section-tracking';
import trackEvent from '~/hooks/useEventTracker';

type SectionContextValue = {
	currentSection: string | null;
	settledSection: string | null;
	hashSection: string | null;
	registerSection: (id: string, element: HTMLElement) => () => void;
};

type SectionSnapshot = Pick<
	SectionContextValue,
	'currentSection' | 'settledSection' | 'hashSection'
> & {
	pathname: string;
};

export const SectionContext = createContext<SectionContextValue | null>(null);

export const SectionProvider = ({ children }: { children: ReactNode }) => {
	const pathname = usePathname();
	const { stage } = useTransitionState();
	// The layout persists between routes, but each page gets a fresh registry and
	// tracker lifetime (including analytics deduplication and owned bookmarks).
	const registry = useMemo(
		() => ({ pathname, elements: new Map<string, HTMLElement>() }),
		[pathname]
	);
	const sections = registry.elements;
	const trackerRef = useRef<ReturnType<typeof createSectionTracker> | null>(
		null
	);
	const [snapshot, setSnapshot] = useState<SectionSnapshot>({
		pathname,
		currentSection: null,
		settledSection: null,
		hashSection: null
	});

	useEffect(() => {
		setSnapshot({
			pathname,
			currentSection: null,
			settledSection: null,
			hashSection: null
		});
		const publish = (
			key: 'currentSection' | 'settledSection' | 'hashSection',
			id: string | null
		) => {
			setSnapshot(previous =>
				previous[key] === id && previous.pathname === pathname
					? previous
					: { ...previous, pathname, [key]: id }
			);
		};
		const tracker = createSectionTracker({
			viewport: window,
			pathname,
			sections,
			onChange: id => publish('currentSection', id),
			onSettled: id => publish('settledSection', id),
			onHashChange: id => publish('hashSection', id),
			onView: id => {
				try {
					trackEvent('Engagement', 'View Section', id);
				} catch (error) {
					console.error('Section-view analytics failed', error);
				}
			}
		});
		trackerRef.current = tracker;
		return () => {
			tracker.dispose();
			trackerRef.current = null;
		};
	}, [pathname, sections]);

	useEffect(() => {
		// Use the site's actual transition lifecycle, with no timed suppression.
		// Completion (including a return to the same page) starts fresh settling.
		if (stage !== 'none')
			trackerRef.current?.startNavigation('page-transition');
		else trackerRef.current?.finishNavigation('page-transition');
	}, [stage, pathname]);

	const registerSection = useCallback(
		(id: string, element: HTMLElement) =>
			registerSectionElement(sections, id, element, () =>
				trackerRef.current?.refreshSections()
			),
		[sections]
	);

	const contextValue = useMemo(
		() => ({
			currentSection:
				snapshot.pathname === pathname ? snapshot.currentSection : null,
			settledSection:
				snapshot.pathname === pathname ? snapshot.settledSection : null,
			hashSection: snapshot.pathname === pathname ? snapshot.hashSection : null,
			registerSection
		}),
		[snapshot, pathname, registerSection]
	);

	return (
		<SectionContext.Provider value={contextValue}>
			{children}
		</SectionContext.Provider>
	);
};

export default SectionContext;
