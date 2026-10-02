'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { forwardRef, useContext, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { cn } from '~/lib/utils';
import SectionContext from '~/components/util/context/section';
import { decodeSectionHash, resolveSectionLink } from '~/lib/section-tracking';

const locationListeners = new Set<() => void>();
const notifyLocation = () => locationListeners.forEach(notify => notify());
const subscribeLocation = (notify: () => void) => {
	if (locationListeners.size === 0) {
		window.addEventListener('hashchange', notifyLocation);
		window.addEventListener('popstate', notifyLocation);
	}
	locationListeners.add(notify);
	return () => {
		locationListeners.delete(notify);
		if (locationListeners.size === 0) {
			window.removeEventListener('hashchange', notifyLocation);
			window.removeEventListener('popstate', notifyLocation);
		}
	};
};
const getLocation = () => window.location.href;
const getServerLocation = () => null;

const NavLink = ({ children }: { children?: ReactNode }) => {
	return <>{children}</>;
};

export type AnchorProps = Omit<
	ComponentPropsWithoutRef<typeof Link>,
	'href'
> & {
	href: string;
	activeClassName?: string;
	partiallyActive?: boolean;
	className?: string;
	children?: ReactNode;
};

export const Anchor = ({
	href,
	children,
	activeClassName,
	className,
	partiallyActive = false,
	replace,
	scroll,
	prefetch,
	onNavigate,
	...rest
}: AnchorProps) => {
	const pathname = usePathname();
	const context = useContext(SectionContext);
	const location = useSyncExternalStore(
		subscribeLocation,
		getLocation,
		getServerLocation
	);
	const sectionLink = location
		? resolveSectionLink(href, location)
		: {
				nativeAnchor: href.startsWith('#'),
				id: null
			};
	const isActive = sectionLink.nativeAnchor
		? sectionLink.id !== null && sectionLink.id === context?.hashSection
		: pathname === href || (pathname.startsWith(`${href}/`) && partiallyActive);
	const classes = cn(
		'group block md:inline-block px-3 py-2.5 font-sans text-sm text-foreground/65 transition-colors hover:text-foreground focus:text-foreground pointer-events-auto',
		className ?? '',
		isActive &&
			`is-active text-foreground! underline! decoration-1 underline-offset-4 ${activeClassName ?? ''}`,
		isActive && !sectionLink.nativeAnchor && 'pointer-events-none'
	);

	if (sectionLink.nativeAnchor) {
		return (
			<a
				href={href}
				className={classes}
				{...rest}
				data-transition-ignore="true"
				aria-current={isActive ? 'location' : undefined}
			>
				{children}
			</a>
		);
	}
	return (
		<Link
			href={href}
			className={classes}
			replace={replace}
			scroll={scroll}
			prefetch={prefetch}
			onNavigate={onNavigate}
			{...rest}
		>
			{children}
		</Link>
	);
};

type ScrollAnchorProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
	href: string;
	className?: string;
	children?: ReactNode;
};

export const ScrollAnchor = forwardRef<HTMLAnchorElement, ScrollAnchorProps>(
	({ children, href, className, ...rest }, ref) => {
		const context = useContext(SectionContext);
		const id = href.startsWith('#') ? decodeSectionHash(href) : href;
		const isActive = id !== null && id === context?.hashSection;
		return (
			<a
				ref={ref}
				href={`#${encodeURIComponent(id ?? '')}`}
				className={cn(className ?? '', isActive && 'is-active')}
				{...rest}
				data-transition-ignore="true"
				aria-current={isActive ? 'location' : undefined}
			>
				{children}
			</a>
		);
	}
);

NavLink.Anchor = Anchor;
NavLink.ScrollAnchor = ScrollAnchor;

ScrollAnchor.displayName = 'NavLink:ScrollAnchor';

export default NavLink;
