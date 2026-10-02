type SectionEntry = {
	id: string;
	rect: Pick<DOMRect, 'top' | 'bottom'>;
};

type SectionTrackerOptions = {
	viewport: Window & typeof globalThis;
	pathname?: string;
	sections: Map<string, HTMLElement>;
	onChange: (id: string | null) => void;
	onSettled: (id: string | null) => void;
	onHashChange: (id: string | null) => void;
	onView: (id: string) => void;
};

export function registerSectionElement(
	sections: Map<string, HTMLElement>,
	id: string,
	element: HTMLElement,
	refresh: () => void
) {
	sections.set(id, element);
	refresh();
	return () => {
		if (sections.get(id) !== element) return;
		sections.delete(id);
		refresh();
	};
}

export function decodeSectionHash(hash: string): string | null {
	try {
		return decodeURIComponent(hash.slice(1)) || null;
	} catch {
		return null;
	}
}

// Compare the resolved document, including its query. A section link to another
// page (or query) must continue through the normal route navigation.
export function resolveSectionLink(href: string, currentUrl: string) {
	try {
		const current = new URL(currentUrl);
		const target = new URL(href, current);
		const sameDocument =
			target.origin === current.origin &&
			target.pathname === current.pathname &&
			target.search === current.search;
		return {
			nativeAnchor: sameDocument && Boolean(target.hash),
			id: sameDocument ? decodeSectionHash(target.hash) : null
		};
	} catch {
		return { nativeAnchor: false, id: null };
	}
}

export const SECTION_SETTLE_MS = 900;

// Entries are in document order, so the last tie-breaker is deterministic.
export function pickDominantSection(
	entries: SectionEntry[],
	viewportHeight: number,
	activeId: string | null
): string | null {
	let best: { id: string; score: number; distance: number } | null = null;
	for (const { id, rect } of entries) {
		const height = rect.bottom - rect.top;
		const visible = Math.max(
			0,
			Math.min(viewportHeight, rect.bottom) - Math.max(0, rect.top)
		);
		if (height <= 0 || visible <= 0 || viewportHeight <= 0) continue;
		const score = visible / Math.min(height, viewportHeight);
		const distance = Math.abs(rect.top);
		if (
			!best ||
			score > best.score ||
			(score === best.score &&
				(id === activeId || (best.id !== activeId && distance < best.distance)))
		) {
			best = { id, score, distance };
		}
	}
	return best?.id ?? null;
}

// Browser dependencies are injected to test the actual event/timer
// lifecycle without duplicating it in a simulated React component.
export function createSectionTracker({
	viewport,
	pathname = '/',
	sections,
	onChange,
	onSettled,
	onHashChange,
	onView
}: SectionTrackerOptions) {
	let activeId: string | null = null;
	let hashId: string | null = null;
	let settled = false;
	let pending: { id: string | null; deadline: number } | null = null;
	let timer: number | null = null;
	let frame: number | null = null;
	let navigation: string | null = null;
	let disposed = false;
	const viewed = new Set<string>();
	const knownIds = new Set<string>();
	const observed = new Set<HTMLElement>();
	const now = () => viewport.performance.now();

	function clearPending() {
		pending = null;
		if (timer !== null) viewport.clearTimeout(timer);
		timer = null;
	}

	function schedule() {
		if (disposed || frame !== null) return;
		frame = viewport.requestAnimationFrame(() => {
			frame = null;
			evaluate();
		});
	}

	function publishHashSection() {
		if (disposed) return;
		const id = decodeSectionHash(viewport.location.hash);
		const nextId =
			viewport.location.pathname === pathname && id && sections.has(id)
				? id
				: null;
		if (nextId !== hashId) {
			hashId = nextId;
			onHashChange(hashId);
		}
	}

	function syncHash() {
		if (disposed || !settled || navigation !== null) return;
		const { pathname: currentPath, search, hash } = viewport.location;
		if (currentPath !== pathname) return;
		// Non-section bookmarks remain meaningful while no section is visible.
		const hashId = decodeSectionHash(hash);
		if (activeId === null && (hashId === null || !knownIds.has(hashId))) return;
		const nextHash = activeId ? `#${encodeURIComponent(activeId)}` : '';
		if (hashId === activeId) {
			publishHashSection();
			return;
		}
		const url = `${pathname}${search}${nextHash}`;
		const state = viewport.history.state;
		// App Router's __NA/tree metadata is already in state. Passing it through
		// also makes Next's installed history wrapper skip a router restoration.
		viewport.history.replaceState(state, '', url);
		// replaceState does not emit hashchange. Publish its result explicitly.
		publishHashSection();
	}

	function evaluate() {
		if (disposed || navigation !== null) return;
		const entries = [...sections]
			.filter(([, element]) => {
				if (!element.isConnected || element.hidden) return false;
				if (
					element.checkVisibility &&
					!element.checkVisibility({
						opacityProperty: true,
						visibilityProperty: true
					})
				)
					return false;
				const style = viewport.getComputedStyle(element);
				return (
					style.display !== 'none' &&
					Number(style.opacity) !== 0 &&
					style.visibility !== 'hidden' &&
					style.visibility !== 'collapse'
				);
			})
			.sort(([, a], [, b]) => {
				const position = a.compareDocumentPosition(b);
				return position & 4 ? -1 : position & 2 ? 1 : 0;
			})
			.map(([id, element]) => ({ id, rect: element.getBoundingClientRect() }));
		const candidate = pickDominantSection(
			entries,
			viewport.innerHeight,
			activeId
		);
		// Publish the instant measurement independently of the settled value.
		if (candidate !== activeId) {
			clearPending();
			settled = false;
			activeId = candidate;
			onChange(activeId);
			if (disposed) return;
		}
		if (settled) {
			syncHash();
			return;
		}
		if (!pending || pending.id !== candidate) {
			clearPending();
			pending = { id: candidate, deadline: now() + SECTION_SETTLE_MS };
		}
		const remaining = pending.deadline - now();
		if (remaining <= 0) {
			clearPending();
			settled = true;
			onSettled(activeId);
			if (disposed) return;
			if (activeId && !viewed.has(activeId)) {
				viewed.add(activeId);
				onView(activeId);
			}
			syncHash();
		} else if (timer === null) {
			timer = viewport.setTimeout(() => {
				timer = null;
				schedule();
			}, remaining);
		}
	}

	function startNavigation(token: string) {
		if (disposed) return;
		navigation = token;
		clearPending();
		settled = false;
	}

	function finishNavigation(token: string) {
		if (disposed || (navigation !== null && navigation !== token)) return;
		navigation = null;
		clearPending();
		settled = false;
		publishHashSection();
		schedule();
	}

	function onLocationChange() {
		if (disposed) return;
		publishHashSection();
		clearPending();
		settled = false;
		schedule();
	}

	const observer = viewport.ResizeObserver
		? new viewport.ResizeObserver(schedule)
		: null;

	function refreshSections() {
		if (disposed) return;
		publishHashSection();
		const elements = new Set(sections.values());
		for (const element of observed) {
			if (!elements.has(element)) {
				observer?.unobserve(element);
				observed.delete(element);
			}
		}
		for (const [id, element] of sections) {
			knownIds.add(id);
			if (!observed.has(element)) {
				observer?.observe(element);
				observed.add(element);
			}
		}
		schedule();
	}

	const browserEvents = {
		scroll: schedule,
		resize: schedule,
		orientationchange: schedule,
		hashchange: onLocationChange,
		popstate: onLocationChange
	};
	for (const [event, handler] of Object.entries(browserEvents)) {
		viewport.addEventListener(event, handler, { passive: true });
	}
	refreshSections();

	return {
		refreshSections,
		startNavigation,
		finishNavigation,
		refreshLocation: onLocationChange,
		dispose() {
			disposed = true;
			clearPending();
			if (frame !== null) viewport.cancelAnimationFrame(frame);
			observer?.disconnect();
			for (const [event, handler] of Object.entries(browserEvents)) {
				viewport.removeEventListener(event, handler);
			}
		}
	};
}
