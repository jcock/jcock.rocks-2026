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
const MotionTitle = motion.create(Jumbotron.Title);

interface JumbotronWorkProps {
	title: string;
	client: string;
	year: string;
	roles: string[];
}

const JumbotronWork = ({ title, client, year, roles }: JumbotronWorkProps) => {
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
				<MotionTitle variants={fadeItemVariants}>{title}</MotionTitle>
				<motion.p
					variants={fadeItemVariants}
					className="text-2xs text-muted-foreground uppercase tracking-widest"
				>
					{client}
				</motion.p>
			</Jumbotron.Body>
		</MotionJumbotron>
	);
};

export default JumbotronWork;
