'use client';

import { useCallback } from 'react';
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import { cn } from '~/lib/utils';

import useSectionTracker from '~/hooks/useSectionTracker';

type SectionProps = ComponentPropsWithoutRef<'section'> & {
	track?: boolean;
};

const Section = ({
	children,
	className,
	id,
	track = true,
	...props
}: SectionProps) => {
	const { registerSection } = useSectionTracker();
	const sectionRef = useCallback(
		(element: HTMLElement | null) => {
			if (element && id && track) return registerSection(id, element);
		},
		[id, track, registerSection]
	);

	return (
		<section
			ref={sectionRef}
			id={id}
			className={`scroll-mt-20 ${className ?? ''}`}
			{...props}
		>
			{children}
		</section>
	);
};

type SectionTitleProps = {
	as?: ElementType;
	children?: ReactNode;
	className?: string;
};

export const SectionTitle = ({
	as: Title = 'h2',
	children,
	className
}: SectionTitleProps) => {
	const Heading = Title as ElementType;

	return (
		<Heading
			className={cn(
				'mb-4 text-3xl/10 md:text-4xl/12 xl:text-5xl/14 text-pretty lg:text-balance',
				className ?? ''
			)}
		>
			{children}
		</Heading>
	);
};

Section.Title = SectionTitle;

export default Section;
