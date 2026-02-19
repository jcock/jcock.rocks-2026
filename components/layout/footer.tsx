'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';

import Grid from '~/components/modules/grid';
import NavSocial from '~/components/modules/navigation/social';
import NavLink from '~/components/modules/navigation/nav-link';
import { Button } from '~/components/modules/core/button';
import Icon from '~/components/modules/icon';
import ViewModeToggle from '~/components/modules/navigation/view-mode';

import routes from '~/data/routes';
import site from '~/data/site.json';

import { useScrollDirection } from '~/hooks/useScrollDirection';
import {
	fadeUpItemVariants,
	fadeItemVariants
} from '~/components/util/animations';

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
			className="relative flex flex-col border-t border-border"
		>
			<div className="-translate-y-1/2 container px-8 md:px-16 flex justify-end gap-1">
				<motion.div variants={fadeItemVariants}>
					<Button
						variant="outline-fill"
						size="icon-sm"
						nativeButton={false}
						render={
							<Link href="#top" aria-label="To the top!" title="To the top!">
								<Icon icon="mdi:arrow-collapse-up" />
							</Link>
						}
					/>
				</motion.div>
				<motion.div variants={fadeItemVariants}>
					<ViewModeToggle />
				</motion.div>
			</div>
			<div className="container px-8 md:px-16 mt-auto mb-20 pt-36">
				<Grid gap="gap-x-8 gap-y-20" className="items-center">
					<motion.nav
						variants={fadeUpItemVariants}
						className="md:col-start-2 flex flex-row md:flex-col justify-center md:justify-start items-center md:items-start gap-4 md:gap-0"
					>
						{routes.children.map((route: { title: string; slug: string }) => (
							<NavLink.Anchor key={route.title} href={route.slug}>
								{route.title}
							</NavLink.Anchor>
						))}
					</motion.nav>
					<motion.div
						variants={fadeUpItemVariants}
						className="md:col-start-2 md:row-start-2"
					>
						<NavSocial />
					</motion.div>
					<motion.div
						variants={fadeUpItemVariants}
						className="md:order-first md:row-start-2"
					>
						<p className="text-2xs text-foreground/50 dark:text-foreground/60 text-center md:text-left tabular-nums">
							© {new Date().getFullYear()} {copyright.name}
						</p>
					</motion.div>
				</Grid>
			</div>

			<div className="overflow-hidden">
				<div className="-mx-6 translate-y-1/10 opacity-10">
					<FooterBrand />
				</div>
			</div>
		</motion.footer>
	);
};

export const FooterBrand = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 420 93"
			fill="currentColor"
		>
			<motion.path
				variants={fadeItemVariants}
				d="M11.06,64.65c2.97,2.01,7.01,4.02,11.6,4.02,5.93,0,9.98-3.76,9.98-10.06V1.48h27.23v57.54c0,22.94-13.89,33.53-34.78,33.53-8.76,0-18.07-1.88-25.08-7.24l11.06-20.66Z"
			/>
			<motion.path
				variants={fadeItemVariants}
				d="M59.86,46.27C59.86,18.64,81.17,0,109.34,0,132.94,0,144.8,13.68,150.2,26.02l-23.46,10.86c-2.29-6.97-9.3-13.01-17.39-13.01-13.08,0-21.84,9.93-21.84,22.4s8.76,22.4,21.84,22.4c8.09,0,15.1-6.04,17.39-13.01l23.46,10.73c-5.26,11.94-17.26,26.15-40.85,26.15-28.18,0-49.48-18.78-49.48-46.27Z"
			/>
			<motion.path
				variants={fadeItemVariants}
				d="M194.95,0C222.72,0,244.16,18.78,244.16,46.27s-21.44,46.27-49.21,46.27-49.21-18.78-49.21-46.27S167.18,0,194.95,0ZM194.95,23.87c-13.08,0-21.57,9.93-21.57,22.4s8.49,22.4,21.57,22.4,21.57-9.93,21.57-22.4-8.49-22.4-21.57-22.4Z"
			/>
			<motion.path
				variants={fadeItemVariants}
				d="M244.16,46.27c0-27.63,21.3-46.27,49.48-46.27,23.59,0,35.46,13.68,40.85,26.02l-23.46,10.86c-2.29-6.97-9.3-13.01-17.39-13.01-13.08,0-21.84,9.93-21.84,22.4s8.76,22.4,21.84,22.4c8.09,0,15.1-6.04,17.39-13.01l23.46,10.73c-5.26,11.94-17.26,26.15-40.85,26.15-28.18,0-49.48-18.78-49.48-46.27Z"
			/>
			<motion.path
				variants={fadeItemVariants}
				d="M366.61,61.48l-4.99,6.71v24.81h-27.23V1.02h27.23v36.05l23.59-33.53h33.3l-33.98,41.58,35.46,47.88h-33.17l-20.22-31.52Z"
			/>
		</svg>
	);
};

export default Footer;
