'use client';

import * as React from 'react';
import { motion, useInView } from 'motion/react';
import type { Variants } from 'motion/react';

import Jumbotron from '~/components/modules/jumbotron';
import Grid from '~/components/modules/grid';

import { useScrollDirection } from '~/hooks/useScrollDirection';
import { fadeItemVariants } from '~/components/util/animations';

const MotionJumbotron = motion.create(Jumbotron);

const JumbotronHome = () => {
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
			className="items-center"
		>
			<Jumbotron.Body className="px-8 md:px-16 pt-64 pb-20">
				<Grid>
					<Jumbotron.Title className="md:col-start-2 text-xl sm:text-2xl font-normal">
						<motion.span variants={fadeItemVariants} className="block">
							I’m Jason Cockerham
						</motion.span>
						<motion.span variants={fadeItemVariants} className="block">
							and I make internets.
						</motion.span>
					</Jumbotron.Title>
				</Grid>
			</Jumbotron.Body>
		</MotionJumbotron>
	);
};

export default JumbotronHome;
