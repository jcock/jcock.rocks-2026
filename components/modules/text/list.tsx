'use client';

import type { ReactNode } from 'react';
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import type { HTMLMotionProps, Variants } from 'motion/react';
import { twMerge } from 'tailwind-merge';

import Grid from '~/components/modules/grid';
import Icon from '~/components/modules/icon';

import { useScrollDirection } from '~/hooks/useScrollDirection';
import { fadeItemVariants } from '~/components/util/animations';

type ListObjectItem = {
	id?: string | number;
	title?: ReactNode;
	content?: ReactNode;
	icon?: string;
};

type ListDataItem = string | number | ListObjectItem;

type ListContainerProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
	children?: ReactNode;
	className?: string;
};

type SharedListProps = Omit<ListContainerProps, 'children' | 'className'> & {
	as?: 'ul' | 'ol';
	children?: ReactNode;
	className?: string;
	containerClassName?: string;
	icon?: string;
	items?: ReadonlyArray<ListDataItem>;
	iconSize?: string;
	iconClassName?: string;
};

type ListProps = SharedListProps;

type ListGridProps = SharedListProps & {
	columns?: string;
	gap?: string;
};

type ListItemsProps = {
	items: ReadonlyArray<ListDataItem>;
	icon?: string;
	iconSize?: string;
	iconClassName?: string;
};

type ListItemProps = Omit<HTMLMotionProps<'li'>, 'children' | 'className'> & {
	children?: ReactNode;
	className?: string;
	contentClassName?: string;
	showIcon?: boolean;
	icon?: string;
	iconUrl?: string;
	iconSize?: string;
	iconClassName?: string;
};

const getListItemContent = (data: ListDataItem): ReactNode => {
	if (typeof data === 'object') {
		return data.content ?? data.title ?? '';
	}

	return data;
};

const getListItemIcon = (data: ListDataItem, icon?: string): string => {
	if (icon) {
		return icon;
	}

	if (typeof data === 'object' && data.icon) {
		return data.icon;
	}

	return 'material-symbols:chevron-right';
};

const getListItemKey = (data: ListDataItem, index: number): string | number => {
	if (typeof data === 'object' && data.id !== undefined) {
		return data.id;
	}

	const content = getListItemContent(data);

	if (typeof content === 'string' || typeof content === 'number') {
		return `${index}-${content}`;
	}

	return index;
};

const ListBase = ({
	as = 'ul',
	className,
	containerClassName,
	icon,
	items,
	iconSize,
	iconClassName,
	children,
	...props
}: ListProps) => {
	const Container = as;

	return (
		<ListContainer className={containerClassName ?? ''} {...props}>
			<Container className={twMerge('space-y-4', className ?? '')}>
				{items && items.length > 0 ? (
					<ListItems
						items={items}
						icon={icon}
						iconSize={iconSize}
						iconClassName={iconClassName}
					/>
				) : null}
				{children}
			</Container>
		</ListContainer>
	);
};

const ListGrid = ({
	as = 'ul',
	columns = 'md:grid-cols-2',
	gap = 'gap-x-12 md:gap-x-16 gap-y-8',
	containerClassName,
	className,
	items,
	icon,
	iconSize,
	iconClassName,
	children,
	...props
}: ListGridProps) => {
	return (
		<ListContainer className={containerClassName ?? ''} {...props}>
			<Grid as={as} columns={columns} gap={gap} className={className ?? ''}>
				{items && items.length > 0 ? (
					<ListItems
						items={items}
						icon={icon}
						iconSize={iconSize}
						iconClassName={iconClassName}
					/>
				) : null}
				{children}
			</Grid>
		</ListContainer>
	);
};

export const ListContainer = ({
	children,
	className,
	...props
}: ListContainerProps) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const isInView = useInView(ref, { once: false });
	const scrollDirection = useScrollDirection();

	const containerVariants: Variants = {
		show: {
			transition: {
				staggerChildren: 0.03,
				staggerDirection: scrollDirection === 'up' ? -1 : 1
			}
		}
	};

	return (
		<motion.div
			ref={ref}
			variants={containerVariants}
			initial="hidden"
			animate={isInView ? 'show' : 'hidden'}
			className={className ?? ''}
			{...props}
		>
			{children}
		</motion.div>
	);
};

export const ListItems = ({
	items,
	icon,
	iconSize,
	iconClassName
}: ListItemsProps) => {
	return items.map((item, index) => {
		return (
			<motion.li
				key={getListItemKey(item, index)}
				variants={fadeItemVariants}
				className="flex items-start gap-2"
			>
				<Icon
					icon={getListItemIcon(item, icon)}
					size={iconSize ?? 'size-4'}
					className={twMerge('mt-1 text-sky-550', iconClassName ?? '')}
				/>
				<p className="self-center text-pretty">{getListItemContent(item)}</p>
			</motion.li>
		);
	});
};

export const ListItem = ({
	className,
	contentClassName,
	children,
	showIcon = true,
	icon,
	iconUrl,
	iconSize,
	iconClassName,
	...rest
}: ListItemProps) => {
	return (
		<motion.li
			variants={fadeItemVariants}
			className={twMerge('flex items-start gap-2', className ?? '')}
			{...rest}
		>
			{showIcon ? (
				<>
					{iconUrl ? (
						<span
							className={twMerge(
								'inline-flex mt-1 text-sky-550',
								iconSize ?? 'size-4',
								iconClassName ?? ''
							)}
						>
							<img src={iconUrl} alt="" aria-hidden className="h-full w-full" />
						</span>
					) : (
						<Icon
							icon={icon ?? 'material-symbols:chevron-right'}
							size={iconSize ?? 'size-4'}
							className={twMerge('mt-1 text-sky-550', iconClassName ?? '')}
						/>
					)}
					<div
						className={twMerge(
							'w-full text-pretty *:text-pretty',
							contentClassName ?? ''
						)}
					>
						{children}
					</div>
				</>
			) : (
				<div
					className={twMerge(
						'w-full text-pretty *:text-pretty',
						contentClassName ?? ''
					)}
				>
					{children}
				</div>
			)}
		</motion.li>
	);
};

type ListComponent = typeof ListBase & {
	Grid: typeof ListGrid;
	Items: typeof ListItems;
	Item: typeof ListItem;
};

const List = ListBase as ListComponent;

List.Grid = ListGrid;
List.Items = ListItems;
List.Item = ListItem;

export default List;
