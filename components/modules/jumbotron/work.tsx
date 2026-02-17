'use client';

import * as React from 'react';
import { motion, useInView } from 'motion/react';
import type { Variants } from 'motion/react';

import Jumbotron from '~/components/modules/jumbotron';

import { useScrollDirection } from '~/hooks/useScrollDirection';
import { fadeItemVariants } from '~/components/util/animations';

const MotionJumbotron = motion.create(Jumbotron);
const MotionTitle = motion.create(Jumbotron.Title);

interface JumbotronWorkProps {
	title: string;
	client: string;
	year: string;
	roles: string[];
	color?: string;
}

const JumbotronWork = ({
	title,
	client,
	year,
	roles,
	color
}: JumbotronWorkProps) => {
	const ref = React.useRef<HTMLDivElement | null>(null);
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
		<MotionJumbotron
			ref={ref}
			variants={containerVariants}
			initial="hidden"
			animate={isInView ? 'show' : 'hidden'}
			className="min-h-dvh items-center font-sans"
			style={{
				backgroundColor: color
			}}
		>
			<Jumbotron.Body className="px-[10dvw] py-[20dvh]">
				<MotionTitle variants={fadeItemVariants} className="mb-3">
					{title}
				</MotionTitle>
				<motion.p
					variants={fadeItemVariants}
					className="text-xs text-foreground/70 uppercase tracking-widest"
				>
					{client}
				</motion.p>
			</Jumbotron.Body>

			{(year || roles.length > 0) && (
				<div className="mt-auto py-4 bg-background border-b border-foreground/10">
					<motion.div
						variants={fadeItemVariants}
						className="flex justify-between gap-8 container px-[10dvw] text-2xs text-foreground uppercase tracking-widest font-sans"
					>
						<time dateTime={year}>{year}</time>
						{roles.length > 0 && (
							<motion.ul
								variants={fadeItemVariants}
								className="flex items-center flex-wrap *:after:content-[',_'] *:last:after:content-[''] *:pr-1 *:last:pr-0"
							>
								{roles.map(role => (
									<li key={role}>{role}</li>
								))}
							</motion.ul>
						)}
					</motion.div>
				</div>
			)}
		</MotionJumbotron>
	);
};

export default JumbotronWork;
