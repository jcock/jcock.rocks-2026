'use client';

import { useEffect, useRef } from 'react';
import type { ComponentType, ReactNode } from 'react';
import type {
	HTMLMotionProps,
	HTMLElements,
	SpringOptions,
	UseScrollOptions
} from 'motion/react';
import {
	motion,
	useMotionValue,
	useScroll,
	useSpring,
	useTransform
} from 'motion/react';
import { twMerge } from 'tailwind-merge';

type SlideInDirection = 'top' | 'bottom' | 'left' | 'right';
type OffsetEntry = NonNullable<UseScrollOptions['offset']>[number];

type SlideInProps = {
	as?: keyof HTMLElements;
	children?: ReactNode;
	delay?: number;
	opacity?: number;
	scale?: number;
	x?: number;
	y?: number;
	direction?: SlideInDirection;
	offsetStart?: OffsetEntry;
	offsetEnd?: OffsetEntry;
	damping?: number;
	stiffness?: number;
	className?: string;
	isRouteChanging?: boolean;
} & Omit<HTMLMotionProps<'div'>, 'children' | 'className' | 'style'>;

const SlideIn = ({
	as = 'div',
	children,
	delay = 0,
	opacity = 1,
	scale = 0.95,
	x = 0,
	y = 50,
	direction = 'bottom',
	offsetStart = 'start end',
	offsetEnd = 'start 0.85',
	damping = 100,
	stiffness = 1000,
	className,
	isRouteChanging = false,
	...rest
}: SlideInProps) => {
	const targetRef = useRef<HTMLElement | null>(null);
	const routeChangeOffset = useMotionValue(0);

	useEffect(() => {
		routeChangeOffset.set(isRouteChanging ? 20 : 0);
	}, [isRouteChanging, routeChangeOffset]);

	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: [offsetStart, offsetEnd]
	});

	const initialTransform = (() => {
		switch (direction) {
			case 'top':
				return { x: 0, y: -y };
			case 'bottom':
				return { x: 0, y };
			case 'left':
				return { x: -x || -50, y: 0 };
			case 'right':
				return { x: x || 50, y: 0 };
			default:
				return { x, y };
		}
	})();

	const springOptions: SpringOptions = {
		damping,
		stiffness
	};

	const scaleSpring = useSpring(
		useTransform(scrollYProgress, [0, 1], [scale, 1]),
		springOptions
	);
	const xSpring = useSpring(
		useTransform(scrollYProgress, [0, 1], [initialTransform.x, 0]),
		springOptions
	);
	const ySpring = useSpring(
		useTransform(scrollYProgress, [0, 1], [initialTransform.y, 0]),
		springOptions
	);
	const opacitySpring = useSpring(
		useTransform(scrollYProgress, [0, 1], [opacity, 1]),
		springOptions
	);

	const routeChangeSpring = useSpring(routeChangeOffset, {
		damping: 30,
		stiffness: 300
	});

	const combinedY = useTransform(
		[ySpring, routeChangeSpring],
		([scrollY = 0, routeY = 0]: Array<number | undefined>) => scrollY + routeY
	);

	const MotionComponent = motion.create(as) as ComponentType<
		HTMLMotionProps<'div'>
	>;

	return (
		<MotionComponent
			ref={(node: unknown) => {
				targetRef.current = node as HTMLElement | null;
			}}
			className={twMerge('h-full', className ?? '')}
			style={{
				scale: scaleSpring,
				x: xSpring,
				y: combinedY,
				opacity: opacitySpring,
				transitionDelay: `${delay}s`
			}}
			{...rest}
		>
			{children}
		</MotionComponent>
	);
};

export default SlideIn;
