'use client';

import * as React from 'react';
import { motion, useInView } from 'motion/react';
import type { Variants } from 'motion/react';

import Jumbotron from '~/components/modules/jumbotron';
import Grid from '~/components/modules/grid';

import { useScrollDirection } from '~/hooks/useScrollDirection';
import { fadeUpItemVariants } from '~/components/util/animations';

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
			<Jumbotron.Body className="px-8 md:px-16 pt-64 pb-12 sm:pb-20">
				<Grid>
					<motion.div variants={fadeUpItemVariants} className="md:col-start-2 ">
						<Jumbotron.Title className="text-2xl/10 md:text-3xl/10 xl:text-4xl/12 text-foreground/75 dark:text-foreground/50">
							I’m Jason Cockerham and I make internets.
						</Jumbotron.Title>
					</motion.div>
				</Grid>
			</Jumbotron.Body>
		</MotionJumbotron>
	);
};

export default JumbotronHome;
