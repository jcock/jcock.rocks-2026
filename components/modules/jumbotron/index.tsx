import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { twMerge } from 'tailwind-merge';

type JumbotronProps = HTMLAttributes<HTMLElement> & {
	className?: string;
	children?: ReactNode;
};

const Jumbotron = forwardRef<HTMLElement, JumbotronProps>(
	({ className, children, ...rest }, ref) => {
		return (
			<section
				ref={ref}
				className={twMerge(
					'relative grid grid-cols-1 grid-rows-1 overflow-hidden bg-background text-foreground',
					className ?? ''
				)}
				{...rest}
			>
				{children}
			</section>
		);
	}
);

Jumbotron.displayName = 'Jumbotron';

type JumbotronBodyProps = HTMLAttributes<HTMLDivElement> & {
	children?: ReactNode;
};

export const JumbotronBody = ({
	className,
	children,
	...rest
}: JumbotronBodyProps) => {
	return (
		<div
			className={twMerge(
				'md:row-span-full col-span-full grid relative z-10 container p-4',
				className ?? ''
			)}
			{...rest}
		>
			{children}
		</div>
	);
};

type JumbotronTitleProps = HTMLAttributes<HTMLHeadingElement> & {
	children?: ReactNode;
};

export const JumbotronTitle = ({
	className,
	children,
	...rest
}: JumbotronTitleProps) => {
	return (
		<h1
			className={twMerge(
				'text-2xl sm:text-4xl font-bold text-pretty',
				className ?? ''
			)}
			{...rest}
		>
			{children}
		</h1>
	);
};

type JumbotronImageProps = Omit<
	React.ComponentPropsWithoutRef<typeof Image>,
	'src' | 'alt'
> & {
	image: StaticImageData;
	alt?: string;
	className?: string;
	containerClassName?: string;
};

export const JumbotronImage = ({
	image,
	alt,
	className,
	containerClassName,
	...rest
}: JumbotronImageProps) => {
	return (
		<div
			className={twMerge(
				'relative order-first md:order-last row-span-full col-span-full',
				containerClassName ?? ''
			)}
		>
			<Image
				src={image.src}
				width={image.width}
				height={image.height}
				alt={alt ?? ''}
				priority
				className={twMerge(
					'md:col-start-1 h-full w-full object-cover object-center opacity-70 md:opacity-20',
					className ?? ''
				)}
				{...rest}
			/>
		</div>
	);
};

type JumbotronCompound = typeof Jumbotron & {
	Body: typeof JumbotronBody;
	Title: typeof JumbotronTitle;
	Image: typeof JumbotronImage;
};

const JumbotronCompound = Jumbotron as JumbotronCompound;

JumbotronCompound.Body = JumbotronBody;
JumbotronCompound.Title = JumbotronTitle;
JumbotronCompound.Image = JumbotronImage;

export default JumbotronCompound;
