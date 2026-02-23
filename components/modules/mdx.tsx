import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import React from 'react';
import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';
import { highlight } from 'sugar-high';

import SlideIn from '~/components/modules/animations/slidein';
import VideoPlayer from '~/components/modules/video-player';
import Grid from '~/components/modules/grid';

type TableProps = {
	data: {
		headers: string[];
		rows: string[][];
	};
};

const Table = ({ data }: TableProps) => {
	const headers = data.headers.map((header, index) => (
		<th
			key={`${header}-${index}`}
			className="border border-border bg-muted px-3 py-2 text-left font-semibold"
		>
			{header}
		</th>
	));

	const rows = data.rows.map((row, rowIndex) => (
		<tr key={`row-${rowIndex}`}>
			{row.map((cell, cellIndex) => (
				<td
					key={`cell-${rowIndex}-${cellIndex}`}
					className="border border-border px-3 py-2"
				>
					{cell}
				</td>
			))}
		</tr>
	));

	return (
		<div className="my-6 overflow-x-auto">
			<table className="w-full border-collapse text-sm">
				<thead>
					<tr>{headers}</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		</div>
	);
};

const CustomLink = (props: ComponentPropsWithoutRef<'a'>) => {
	const href = props.href || '';

	if (href.startsWith('/')) {
		return (
			<Link href={href} {...props}>
				{props.children}
			</Link>
		);
	}

	if (href.startsWith('#')) {
		return <a {...props}>{props.children}</a>;
	}

	return (
		<a target="_blank" rel="noopener noreferrer" {...props}>
			{props.children}
		</a>
	);
};

const DefaultImage = (props: ComponentPropsWithoutRef<typeof Image>) => {
	return <Image sizes="100vw" {...props} />;
};

const PulledImage = (props: ComponentPropsWithoutRef<typeof Image>) => {
	return (
		<SlideIn className="md:-mx-8 lg:-mx-24">
			<Image className="w-full h-auto" {...props} />
		</SlideIn>
	);
};

const PulledContent = (props: ComponentPropsWithoutRef<'div'>) => {
	return <div className="md:-mx-8 lg:-mx-24" {...props} />;
};

const Device = (props: ComponentPropsWithoutRef<'div'>) => {
	const { children, ...rest } = props;
	return (
		<SlideIn>
			<div className="relative not-prose">
				<div
					className="lg:-mx-16 p-2.5 sm:p-4 md:p-6 md:pt-8 border border-border rounded-4xl md:rounded-b-none before:hidden md:before:block before:absolute before:top-3 before:left-1/2 before:-translate-x-1/2 before:size-2 before:border before:border-border before:rounded-full sm:after:hidden after:absolute after:top-1/2 after:left-4.5 after:-translate-y-1/2 after:w-3 after:h-1/5 after:bg-background after:border after:border-border after:rounded-full"
					{...rest}
				>
					<div className="border border-border rounded-xl sm:rounded-xl md:rounded-none overflow-hidden">
						{children}
					</div>
				</div>
				<i className="hidden md:block md:-mx-8 lg:-mx-24 border border-border rounded-b-4xl h-8 after:absolute after:bottom-5 after:left-1/2 after:-translate-x-1/2 after:w-1/4 after:h-3 after:border after:border-t-0 after:border-border after:rounded-b-full" />
			</div>
		</SlideIn>
	);
};

const Video = (props: ComponentPropsWithoutRef<typeof VideoPlayer>) => {
	return <VideoPlayer {...props} />;
};

const GridContainer = (props: ComponentPropsWithoutRef<typeof Grid>) => {
	return <Grid {...props} />;
};

const GridItem = (props: ComponentPropsWithoutRef<typeof Grid.Item>) => {
	return (
		<SlideIn>
			<Grid.Item {...props} />
		</SlideIn>
	);
};

const SlideInItem = (props: ComponentPropsWithoutRef<typeof SlideIn>) => {
	return <SlideIn {...props} />;
};

const Code = ({
	children,
	...props
}: ComponentPropsWithoutRef<'code'> & {
	children?: ReactNode;
}) => {
	const code =
		typeof children === 'string'
			? children
			: Array.isArray(children)
				? children.join('')
				: '';
	const isBlockCode =
		typeof props.className === 'string' &&
		props.className.includes('language-');
	const codeForHighlight = isBlockCode ? code.replace(/\n$/, '') : code;
	const codeHTML = highlight(codeForHighlight);

	return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
};

const slugify = (input: string) => {
	return input
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/&/g, '-and-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-');
};

const flattenText = (node: ReactNode): string => {
	if (node === null || node === undefined || typeof node === 'boolean') {
		return '';
	}
	if (typeof node === 'string' || typeof node === 'number') {
		return `${node}`;
	}
	if (Array.isArray(node)) {
		return node.map(flattenText).join('');
	}
	if (React.isValidElement<{ children?: ReactNode }>(node)) {
		return flattenText(node.props.children);
	}
	return '';
};

const createHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
	const Heading = ({ children }: { children?: ReactNode }) => {
		const slug = slugify(flattenText(children));

		return React.createElement(
			`h${level}`,
			{
				id: slug,
				className: 'scroll-mt-24'
			},
			[
				React.createElement('a', {
					href: `#${slug}`,
					key: `link-${slug}`,
					className: 'anchor'
				}),
				children
			]
		);
	};

	Heading.displayName = `Heading${level}`;

	return Heading;
};

const defaultMDXComponents: MDXComponents = {
	h1: createHeading(1),
	h2: createHeading(2),
	h3: createHeading(3),
	h4: createHeading(4),
	h5: createHeading(5),
	h6: createHeading(6),
	Image: DefaultImage,
	PulledImage,
	PulledContent,
	Device,
	Video,
	Grid: GridContainer,
	GridItem,
	SlideIn: SlideInItem,
	a: CustomLink,
	code: Code,
	Table
};

export const getMDXComponents = (overrides?: MDXComponents): MDXComponents => {
	return {
		...defaultMDXComponents,
		...(overrides || {})
	};
};
