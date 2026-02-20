'use client';

import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import { formatDistance } from 'date-fns';
import Image from 'next/image';

import Section from '~/components/modules/section';
import Grid from '~/components/modules/grid';
import { Button } from '~/components/modules/core/button';
import Icon from '~/components/modules/icon';
import List from '~/components/modules/text/list';

import { useScrollDirection } from '~/hooks/useScrollDirection';
import { fadeUpItemVariants } from '~/components/util/animations';

import clients from '~/data/clients';

import ImagePirate from '~/images/jcock-pirate.png';
import AwardWebby from '~/images/inline/awards/webby.svg';
import AwardAaa from '~/images/inline/awards/aaa.svg';
import AwardWebAward from '~/images/inline/awards/webaward.svg';

interface SectionAboutProps {
	id?: string;
	className?: string;
}

const experienceTime = formatDistance(new Date(2005, 6, 1), new Date());

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
			viewport={{ once: false, amount: 0.15 }}
		>
			<Section
				id={id}
				className={`grid items-center px-8 md:px-16 pt-24 sm:pt-64 pb-20 ${className ?? ''}`}
			>
				<div className="container px-4 space-y-32">
					<Grid columns="lg:grid-cols-2">
						<Grid.Item className="-mt-16 lg:mt-0">
							<motion.div variants={fadeUpItemVariants} className="mb-8">
								<Section.Title className="text-foreground/75 dark:text-foreground/50">
									I like to dabble in design and code.
								</Section.Title>
							</motion.div>
							<motion.div
								variants={fadeUpItemVariants}
								className="space-y-4 *:text-pretty prose"
							>
								<p>
									In other words, I’m an experienced UX/UI Designer, Full-Stack
									Developer, Project Manager, Digital Strategist, and all-around
									solver of problems. I reside in Delaware and work as part of
									the digital team at{' '}
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
									I’m happy to say that even after {experienceTime} I haven’t
									lost my love for making things that have a positive impact. I
									love solving problems. Not only at work, but with the products
									I produce. I am so grateful that I have the opportunity to
									work with such talented people. I’ve learned so much from
									them.
								</p>

								<Button
									nativeButton={false}
									variant="outline"
									className="not-prose"
									render={
										<a
											href="/documents/Jason.Cockerham_Designer_Developer_Resume.pdf"
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
						</Grid.Item>
						<Grid.Item className="order-first lg:order-last">
							<motion.div
								variants={fadeUpItemVariants}
								className="relative lg:aspect-4/5 overflow-hidden -mx-8 lg:mx-0 mask-b-from-70% dark:mask-b-from-40% lg:mask-b-from-70% dark:lg:mask-b-from-60%"
							>
								<Image
									src={ImagePirate}
									alt="An ai generated picture of me as a pirate, holding a kitten."
									priority
									sizes="100vw, (min-width: 768px) 50vw"
									className="w-full h-full object-cover object-top grayscale opacity-90 dark:opacity-75"
								/>
							</motion.div>
						</Grid.Item>
					</Grid>

					<Grid columns="lg:grid-cols-2">
						<motion.div variants={fadeUpItemVariants}>
							<h3 className="mb-8 text-base md:text-lg text-foreground/75 dark:text-foreground/50">
								A little recognition.
							</h3>

							<List.Grid columns="grid-cols-3" gap="gap-4 md:gap-8">
								{[
									{
										name: 'Webby Award',
										image: (
											<AwardWebby
												role="img"
												aria-hidden="true"
												className="w-18 md:w-24 mx-auto"
											/>
										)
									},
									{
										name: 'American Advertising Award',
										image: (
											<AwardAaa
												role="img"
												aria-hidden="true"
												className="w-16 md:w-22 mx-auto"
											/>
										)
									},
									{
										name: 'Webaward',
										image: (
											<AwardWebAward
												role="img"
												aria-hidden="true"
												className="w-14 md:w-20 mx-auto"
											/>
										)
									}
								].map(award => (
									<List.Item
										key={award.name}
										showIcon={false}
										className="flex items-end"
									>
										<span className="sr-only">{award.name}</span>
										{award.image}
									</List.Item>
								))}
							</List.Grid>
						</motion.div>
					</Grid>

					<Grid columns="lg:grid-cols-2">
						<Grid.Item>
							<motion.div variants={fadeUpItemVariants}>
								<h3 className="mb-8 text-base md:text-lg text-foreground/75 dark:text-foreground/50">
									Select clients.
								</h3>
							</motion.div>

							<List.Grid className="text-xs" gap="gap-4">
								{clients.map(client => (
									<List.Item key={client} showIcon={false}>
										{client}
									</List.Item>
								))}
							</List.Grid>
						</Grid.Item>
					</Grid>
				</div>
			</Section>
		</motion.div>
	);
};

export default SectionAbout;
