import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import React from 'react';
import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';
import { highlight } from 'sugar-high';

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
		return <a {...props} />;
	}

	return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const RoundedImage = (props: ComponentPropsWithoutRef<typeof Image>) => {
	return <Image className="rounded-lg" {...props} />;
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
	Image: RoundedImage,
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
