'use client';

import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { forwardRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { cn } from '~/lib/utils';

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
	...rest
}: AnchorProps) => {
	const pathname = usePathname();
	const isActive =
		pathname === href || (pathname.startsWith(`${href}/`) && partiallyActive);

	return (
		<Link
			href={href}
			className={cn(
				'group block md:inline-block px-3 py-2.5 font-sans text-sm text-foreground/50 transition-colors hover:text-foreground focus:text-foreground pointer-events-auto',
				className ?? '',
				isActive &&
					`is-active text-foreground! underline! decoration-1 underline-offset-4 ${activeClassName ?? ''}`
			)}
			{...rest}
		>
			{children}
		</Link>
	);
};

type ScrollAnchorProps = Omit<ComponentPropsWithoutRef<typeof Link>, 'href'> & {
	href: string;
	className?: string;
	children?: ReactNode;
};

export const ScrollAnchor = forwardRef<HTMLAnchorElement, ScrollAnchorProps>(
	({ children, href, className, ...rest }, ref) => {
		return (
			<Link
				ref={ref}
				href={`#${href}`}
				scroll={false}
				className={className ?? ''}
				{...rest}
			>
				{children}
			</Link>
		);
	}
);

NavLink.Anchor = Anchor;
NavLink.ScrollAnchor = ScrollAnchor;

ScrollAnchor.displayName = 'NavLink:ScrollAnchor';

export default NavLink;
