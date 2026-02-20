'use client';

import * as React from 'react';
import { motion, useInView } from 'motion/react';
import type { Variants } from 'motion/react';

import Jumbotron from '~/components/modules/jumbotron';
import Grid from '~/components/modules/grid';

import { useScrollDirection } from '~/hooks/useScrollDirection';
import { fadeUpItemVariants } from '~/components/util/animations';

const MotionJumbotron = motion.create(Jumbotron);
const MotionTitle = motion.create(Jumbotron.Title);

interface JumbotronWorkProps {
	title: string;
	summary: string;
	client: string;
	year: string;
	roles: string[];
	color?: string;
}

const JumbotronWork = ({
	title,
	summary,
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
			className="items-center font-sans"
		>
			<Jumbotron.Body className="px-[10dvw] py-[20dvh]">
				<Grid columns="lg:grid-cols-2">
					<Grid.Item>
						<MotionTitle
							variants={fadeUpItemVariants}
							className="mb-3"
							style={{ color }}
						>
							{title}
						</MotionTitle>
						<motion.p
							variants={fadeUpItemVariants}
							className="text-xs text-muted-foreground uppercase tracking-widest text-pretty"
						>
							{client}
						</motion.p>
					</Grid.Item>
					<Grid.Item>
						<motion.p
							variants={fadeUpItemVariants}
							className="font-serif text-xl/10 font-light text-foreground text-pretty"
						>
							{summary}
						</motion.p>
					</Grid.Item>
				</Grid>
			</Jumbotron.Body>

			{(year || roles.length > 0) && (
				<div className="mt-auto py-4 bg-background border-y border-foreground/10">
					<motion.div
						variants={fadeUpItemVariants}
						className="flex justify-between gap-8 container px-[10dvw] text-2xs text-foreground uppercase tracking-widest font-sans"
					>
						{roles.length > 0 && (
							<motion.ul
								variants={fadeUpItemVariants}
								className="flex items-center flex-wrap *:after:content-[',_'] *:last:after:content-[''] *:pr-1 *:last:pr-0"
							>
								{roles.map(role => (
									<li key={role}>{role}</li>
								))}
							</motion.ul>
						)}
						<time dateTime={year}>{year}</time>
					</motion.div>
				</div>
			)}
		</MotionJumbotron>
	);
};

export default JumbotronWork;
