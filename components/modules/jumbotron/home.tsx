'use client';

import Link from 'next/link';
import * as React from 'react';
import { motion, useInView } from 'motion/react';
import type { Variants } from 'motion/react';

import Jumbotron from '~/components/modules/jumbotron';
import { Button } from '~/components/modules/core/button';

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
			className="min-h-dvh items-center"
		>
			<Jumbotron.Body className="px-[10dvw] py-[20dvh]">
				<Jumbotron.Title>
					<motion.span
						variants={fadeItemVariants}
						className="block mb-3 text-2xs text-muted-foreground uppercase tracking-widest"
					>
						Hello,
					</motion.span>
					<motion.span variants={fadeItemVariants} className="block">
						I’m{' '}
						<Button
							variant="link"
							size="link"
							hasUnderline
							nativeButton={false}
							render={<Link href="#about">Jason Cockerham</Link>}
						/>
					</motion.span>
					<motion.span variants={fadeItemVariants} className="block">
						and I{' '}
						<Button
							variant="link"
							size="link"
							hasUnderline
							nativeButton={false}
							render={<Link href="#work">make internets.</Link>}
						/>
					</motion.span>
				</Jumbotron.Title>
			</Jumbotron.Body>
		</MotionJumbotron>
	);
};

export default JumbotronHome;
