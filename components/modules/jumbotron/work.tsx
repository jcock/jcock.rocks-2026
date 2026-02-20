'use client';

import * as React from 'react';
import { motion, useInView } from 'motion/react';
import type { Variants } from 'motion/react';

import Jumbotron from '~/components/modules/jumbotron';
import Grid from '~/components/modules/grid';
import { Button } from '~/components/modules/core/button';
import Icon from '~/components/modules/icon';

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
	siteUrl?: string;
}

const JumbotronWork = ({
	title,
	summary,
	client,
	siteUrl,
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

			{(siteUrl || roles.length > 0) && (
				<div className="mt-auto py-4 bg-background border-y border-border">
					<motion.div
						variants={fadeUpItemVariants}
						className="flex justify-between gap-4 md:gap-8 container px-[10dvw] text-2xs text-muted-foreground uppercase tracking-widest font-sans"
					>
						{roles.length > 0 && (
							<motion.div
								variants={fadeUpItemVariants}
								className="flex gap-1 w-full"
							>
								<Icon
									icon="gravity-ui:gear"
									size="size-3.5"
									className="mt-0.5"
								/>
								<ul className="flex items-center flex-wrap *:after:content-[',_'] *:last:after:content-[''] *:pr-1 *:last:pr-0">
									{roles.map(role => (
										<li key={role}>{role}</li>
									))}
								</ul>
							</motion.div>
						)}
						{siteUrl && (
							<motion.div variants={fadeUpItemVariants}>
								<Button
									nativeButton={false}
									variant="link"
									size="link"
									className="uppercase text-muted-foreground"
									render={
										<a href={siteUrl} target="_blank" rel="noreferrer">
											<Icon icon="mdi:external-link" size="size-3.5" />
											Visit
										</a>
									}
								/>
							</motion.div>
						)}
					</motion.div>
				</div>
			)}
		</MotionJumbotron>
	);
};

export default JumbotronWork;
