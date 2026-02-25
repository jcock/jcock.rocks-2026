'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import { formatDistance } from 'date-fns';
import AutoScroll from 'embla-carousel-auto-scroll';
import Image from 'next/image';

import Section from '~/components/modules/section';
import Grid from '~/components/modules/grid';
import { Button } from '~/components/modules/core/button';
import Icon from '~/components/modules/icon';
import List from '~/components/modules/text/list';
import {
	Carousel,
	CarouselContent,
	CarouselItem
} from '~/components/modules/core/carousel';

import { useScrollDirection } from '~/hooks/useScrollDirection';
import { fadeUpItemVariants } from '~/components/util/animations';

import clients from '~/data/clients';

import ImagePirate from '~/images/jcock-pirate-transparent.png';
import AwardWebby from '~/images/inline/awards/webby.svg';
import AwardAaa from '~/images/inline/awards/aaa.svg';
import AwardWebAward from '~/images/inline/awards/webaward.svg';

interface SectionAboutProps {
	id?: string;
	className?: string;
}

const experienceTime = formatDistance(new Date(2005, 6, 1), new Date());

const SectionAbout = ({ className }: SectionAboutProps) => {
	const scrollDirection = useScrollDirection();
	const clientLogosAutoScroll = useRef(
		AutoScroll({
			startDelay: 0,
			speed: 1.4,
			stopOnInteraction: false,
			stopOnFocusIn: false,
			stopOnMouseEnter: true
		})
	);

	const containerVariants: Variants = {
		show: {
			transition: {
				staggerChildren: 0.03,
				staggerDirection: scrollDirection === 'up' ? -1 : 1
			}
		}
	};

	return (
		<>
			<Section
				id="intro"
				className={`grid items-center px-8 md:px-16 pt-24 sm:pt-56 md:pt-64 pb-20 space-y-32 ${className ?? ''}`}
			>
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="show"
					viewport={{ once: false, amount: 0.15 }}
					className="container"
				>
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
				</motion.div>
			</Section>

			<Section
				id="awards"
				className="py-20 px-8 md:px-16 border-t border-border"
			>
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="show"
					viewport={{ once: false, amount: 0.15 }}
					className="container"
				>
					<Grid columns="lg:grid-cols-2" className="items-center">
						<motion.div variants={fadeUpItemVariants}>
							<Section.Title className="mb-0 text-base md:text-lg text-foreground/75 dark:text-foreground/50">
								A little recognition.
							</Section.Title>
						</motion.div>
						<motion.div variants={fadeUpItemVariants}>
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
				</motion.div>
			</Section>

			<Section
				id="clients"
				className="py-20 px-8 md:px-16 border-t border-border"
			>
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="show"
					viewport={{ once: false, amount: 0.15 }}
					className="container space-y-12"
				>
					<Grid columns="lg:grid-cols-2">
						<motion.div variants={fadeUpItemVariants}>
							<Section.Title className="mb-0 text-base md:text-lg text-foreground/75 dark:text-foreground/50">
								Select clients.
							</Section.Title>
						</motion.div>
					</Grid>
					<motion.div variants={fadeUpItemVariants}>
						<List.Grid
							columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
							gap="gap-0"
							className="border-r border-b border-border"
						>
							{clients.map(client => {
								const ClientLogo = client.logo;
								return (
									<List.Item
										key={client.id}
										showIcon={false}
										className="group/list-item"
									>
										<div
											className="aspect-square grid place-items-center border-t border-l border-border transition-colors duration-300 group-hover/list-item:text-white group-hover/list-item:bg-(--client-color)"
											style={
												{
													'--client-color': client.color
												} as React.CSSProperties
											}
										>
											{ClientLogo && (
												<ClientLogo
													role="img"
													aria-hidden="true"
													className="w-auto h-6 md:h-12 max-w-32 opacity-90 dark:opacity-50 transition-opacity duration-300 group-hover/list-item:opacity-100 dark:group-hover/list-item:opacity-100"
												/>
											)}
											<span className="sr-only">{client.name}</span>
										</div>
									</List.Item>
								);
							})}
						</List.Grid>
					</motion.div>
				</motion.div>
			</Section>
		</>
	);
};

export default SectionAbout;
