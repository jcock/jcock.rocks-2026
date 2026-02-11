'use client';

import { motion } from 'motion/react';
import type { Variants } from 'motion/react';

import Section from '~/components/modules/section';
import Grid from '~/components/modules/grid';
import { Button } from '~/components/modules/core/button';
import Icon from '~/components/modules/icon';

import { useScrollDirection } from '~/hooks/useScrollDirection';
import { fadeItemVariants } from '~/components/util/animations';

interface SectionAboutProps {
	id?: string;
	className?: string;
}

const SectionAbout = ({ id = 'about', className }: SectionAboutProps) => {
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
		<motion.div
			variants={containerVariants}
			initial="hidden"
			whileInView="show"
			viewport={{ once: false, amount: 0.4 }}
		>
			<Section
				id={id}
				className={`grid items-center min-h-dvh px-[10dvw] py-[20dvh] ${className ?? ''}`}
			>
				<div className="container px-4">
					<Grid columns="lg:grid-cols-2" className="items-center">
						<motion.div variants={fadeItemVariants}>
							<Section.Title>About.</Section.Title>
						</motion.div>

						<motion.div
							variants={fadeItemVariants}
							className="space-y-4 *:text-pretty"
						>
							<h3 className="text-base lg:text-xs lg:uppercase text-muted-foreground">
								I like to dabble in design and code.
							</h3>
							<p>
								In other words, I’m an experienced UX & UI Designer, Front-End
								Developer, Project Manager, Digital Strategist, and all-around
								solver of problems. I reside in Delaware and work as part of the
								digital team at{' '}
								<Button
									variant="link"
									size="link"
									hasUnderline
									nativeButton={false}
									render={
										<a
											href="https://abccreative.com"
											target="_blank"
											rel="noopener noreferrer"
										>
											AB&C
										</a>
									}
								/>
								.
							</p>
							<p className="mb-8">
								I’m happy to say that even after more than 15 years I haven’t
								lost my love for making things that have a positive impact. I
								love solving problems. Not only at work, but with the products I
								produce. I am so grateful that I have the opportunity to work
								with such talented people. I’ve learned so much from them.
							</p>

							<Button
								nativeButton={false}
								render={
									<a
										href="https://abccreative.com"
										target="_blank"
										rel="noopener noreferrer"
									>
										Download CV
										<span className="relative">
											<Icon
												icon="ph:file-pdf"
												className="transition group-hover/button:-translate-y-full group-hover/button:opacity-0"
											/>
											<Icon
												icon="ph:download-simple"
												className="absolute top-px inset-x-0 translate-y-full opacity-0 transition group-hover/button:translate-y-0 group-hover/button:opacity-100"
											/>
										</span>
									</a>
								}
							/>
						</motion.div>
					</Grid>
				</div>
			</Section>
		</motion.div>
	);
};

export default SectionAbout;
