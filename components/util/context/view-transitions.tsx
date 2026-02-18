'use client';

import { useRef, startTransition } from 'react';
import type { ReactNode } from 'react';
import { TransitionRouter } from 'next-transition-router';
import { gsap } from 'gsap';

import Jcock from '~/images/inline/jcock.svg';

type ViewTransitionsProviderProps = {
	children: ReactNode;
};

export const ViewTransitionsProvider = ({
	children
}: ViewTransitionsProviderProps) => {
	const loadingLayer = useRef<HTMLDivElement | null>(null);
	const bodyLayer = useRef<HTMLDivElement | null>(null);
	const iconJcock = useRef<HTMLDivElement | null>(null);

	return (
		<TransitionRouter
			auto={true}
			leave={(next, from, to) => {
				const tl = gsap
					.timeline({
						onComplete: next
					})
					.fromTo(
						bodyLayer.current,
						{ scale: 1, opacity: 1 },
						{
							scale: 0.99,
							opacity: 0,
							duration: 0.5,
							ease: 'circ.inOut'
						}
					)
					.fromTo(
						loadingLayer.current,
						{ opacity: 0 },
						{
							opacity: 1,
							duration: 0.5,
							ease: 'circ.inOut'
						},
						'<'
					)
					.fromTo(
						iconJcock.current,
						{ scale: 0.8, opacity: 0 },
						{ scale: 1, opacity: 1, duration: 0.33, ease: 'circ.inOut' },
						'<15%'
					);

				return () => {
					tl.kill();
				};
			}}
			enter={next => {
				const tl = gsap
					.timeline()
					.fromTo(
						loadingLayer.current,
						{ opacity: 1 },
						{
							opacity: 0,
							duration: 0.5,
							ease: 'circ.inOut'
						},
						'<50%'
					)
					.fromTo(
						iconJcock.current,
						{ scale: 1, opacity: 1 },
						{ scale: 0.8, opacity: 0, duration: 0.25, ease: 'circ.inOut' },
						'<15%'
					)
					.fromTo(
						bodyLayer.current,
						{ scale: 0.99, opacity: 0 },
						{
							scale: 1,
							opacity: 1,
							duration: 0.5,
							ease: 'circ.inOut'
						}
					)
					.call(
						() => {
							// Defer React updates to prevent jank during animation
							requestAnimationFrame(() => {
								startTransition(next);
							});
						},
						undefined,
						'<50%'
					);

				return () => {
					tl.kill();
				};
			}}
		>
			<div ref={bodyLayer}>{children}</div>
			<div
				ref={loadingLayer}
				className="fixed inset-0 z-50 grid place-items-center opacity-0 bg-background text-foreground pointer-events-none"
				aria-hidden="true"
			>
				<Jcock
					ref={iconJcock}
					role="img"
					aria-hidden="true"
					className="w-1/2 md:w-1/3 max-w-96"
				/>
			</div>
		</TransitionRouter>
	);
};
