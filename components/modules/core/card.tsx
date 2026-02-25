import * as React from 'react';
import Image, { type ImageProps } from 'next/image';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/lib/utils';

const cardVariants = cva(
	'gap-6 overflow-hidden py-6 text-sm has-[>img:first-child]:pt-0 data-[size=sm]:gap-4 data-[size=sm]:py-4 group/card flex flex-col',
	{
		variants: {
			variant: {
				none: '',
				default: 'bg-card text-card-foreground',
				secondary: 'bg-secondary text-secondary-foreground'
			},
			hasBorder: {
				false: null,
				true: 'ring-1 ring-foreground/10'
			},
			hasShadow: {
				false: null,
				true: 'shadow-xs'
			}
		},
		defaultVariants: {
			variant: 'default',
			hasBorder: false,
			hasShadow: false
		}
	}
);

type CardProps<T extends React.ElementType = 'div'> = {
	as?: T;
	size?: 'default' | 'sm';
	variant?: VariantProps<typeof cardVariants>['variant'];
	hasBorder?: VariantProps<typeof cardVariants>['hasBorder'];
} & React.ComponentPropsWithoutRef<T>;

function Card<T extends React.ElementType = 'div'>({
	as,
	className,
	size = 'default',
	variant = 'default',
	hasBorder = false,
	hasShadow = false,
	...props
}: CardProps<T>) {
	const Container = as ?? 'div';

	return (
		<Container
			data-slot="card"
			data-size={size}
			className={cn(cardVariants({ variant, hasBorder, hasShadow }), className)}
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				'gap-1 px-6 group-data-[size=sm]/card:px-4 [.border-b]:pb-6 group-data-[size=sm]/card:[.border-b]:pb-4 group/card-header @container/card-header grid auto-rows-min items-start has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto]',
				className
			)}
			{...props}
		/>
	);
}

function CardImage({ className, alt, ...props }: ImageProps) {
	return (
		<Image
			data-slot="card-image"
			className={cn('w-full h-auto', className)}
			alt={alt ?? ''}
			{...props}
		/>
	);
}

type CardTitleProps<T extends React.ElementType = 'h3'> = {
	as?: T;
	children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

function CardTitle<T extends React.ElementType = 'h3'>({
	as,
	className,
	children,
	...props
}: CardTitleProps<T>) {
	const Heading = as ?? 'h3';
	return (
		<Heading
			data-slot="card-title"
			className={cn(
				'text-lg sm:text-base lg:text-xl leading-normal group-data-[size=sm]/card:text-sm',
				className
			)}
			{...props}
		>
			{children}
		</Heading>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-description"
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
				className
			)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-content"
			className={cn('flex-auto px-6 group-data-[size=sm]/card:px-4', className)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-footer"
			className={cn(
				'px-6 group-data-[size=sm]/card:px-4 [.border-t]:pt-6 group-data-[size=sm]/card:[.border-t]:pt-4 flex items-center',
				className
			)}
			{...props}
		/>
	);
}

export {
	Card,
	CardHeader,
	CardImage,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent
};
