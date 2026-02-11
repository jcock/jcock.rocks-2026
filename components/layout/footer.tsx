'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';

import NavSocial from '~/components/modules/navigation/social';
import { Button } from '~/components/modules/core/button';
import Grid from '~/components/modules/grid';

import site from '~/data/site.json';

import { useScrollDirection } from '~/hooks/useScrollDirection';
import { fadeItemVariants } from '~/components/util/animations';

import Jcock from '~/images/inline/jcock.svg';

type CopyrightData = {
	name: string;
	url: string;
};

const Footer = () => {
	const scrollDirection = useScrollDirection();
	const copyright = site.copyright as CopyrightData;

	const containerVariants: Variants = {
		show: {
			transition: {
				staggerChildren: 0.03,
				staggerDirection: scrollDirection === 'up' ? -1 : 1
			}
		}
	};

	return (
		<motion.footer
			variants={containerVariants}
			initial="hidden"
			whileInView="show"
			viewport={{ once: false, amount: 0.4 }}
			className="relative flex min-h-dvh px-[7.5dvw] sm:px-[10dvw] py-[20dvh] border-t border-border"
		>
			<Grid
				columns="grid-cols-1 grid-rows-[1fr_auto]"
				className="container px-4"
			>
				<motion.div
					variants={fadeItemVariants}
					className="grid place-items-center"
				>
					<Button
						variant="none"
						size="none"
						nativeButton={false}
						render={
							<Link href="#top" aria-label="To the top!" className="block">
								<Jcock
									role="img"
									aria-hidden="true"
									className="w-[50vw]! sm:w-[40vw]! md:w-[20vw]! h-auto!"
								/>
							</Link>
						}
					/>
				</motion.div>

				<motion.div variants={fadeItemVariants}>
					<NavSocial />
				</motion.div>
			</Grid>

			<p className="absolute bottom-4 inset-x-0 px-4 text-2xs text-muted-foreground/50 text-center tabular-nums">
				© {new Date().getFullYear()}. {copyright.name}
			</p>
		</motion.footer>
	);
};

export default Footer;
