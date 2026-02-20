'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';

import Section from '~/components/modules/section';
import Grid from '~/components/modules/grid';
import {
	Card,
	CardImage,
	CardTitle,
	CardDescription,
	CardContent
} from '~/components/modules/core/card';

import { cn } from '~/lib/utils';
import { useScrollDirection } from '~/hooks/useScrollDirection';
import { fadeUpItemVariants } from '~/components/util/animations';
import type { WorkSample } from '~/app/work/types';

interface SectionWorkProps {
	id?: string;
	className?: string;
	title?: string;
	samples: ReadonlyArray<WorkSample>;
}

const SectionWork = ({
	id = 'work',
	className,
	title,
	samples
}: SectionWorkProps) => {
	const scrollDirection = useScrollDirection();

	const sortedSamples = React.useMemo(
		() =>
			[...samples].sort((a, b) => {
				if (
					new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
				) {
					return -1;
				}
				return 1;
			}),
		[samples]
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
		<motion.div
			variants={containerVariants}
			initial="hidden"
			whileInView="show"
			viewport={{ once: false, amount: 0.2 }}
		>
			<Section
				id={id}
				className={cn(
					'grid items-center px-8 md:px-16 py-24 md:py-32',
					className ?? ''
				)}
			>
				<div className="container px-4">
					{title && (
						<Grid>
							<motion.div
								variants={fadeUpItemVariants}
								className="md:col-start-2"
							>
								<Section.Title className="mb-12 text-2xl/8! text-muted-foreground">
									{title}
								</Section.Title>
							</motion.div>
						</Grid>
					)}
					<Grid as="ol" gap="gap-8 md:gap-y-10">
						{sortedSamples.map(sample => (
							<motion.li key={sample.slug} variants={fadeUpItemVariants}>
								<Card
									as={Link}
									href={`/work/${sample.slug}`}
									className="relative pt-0"
								>
									<div className="aspect-4/3 overflow-hidden">
										<CardImage
											src={sample.metadata.featuredImage}
											width={720}
											height={540}
											sizes="100vw, (min-width: 768px) 50vw"
											alt=""
											className="w-full h-full object-cover object-center bg-white transition-transform duration-400 group-hover/card:scale-105"
										/>
									</div>
									<CardContent className="px-0">
										<CardTitle className="mb-2 text-foreground/75 dark:text-foreground/75 transition-colors group-hover/card:text-foreground dark:group-hover/card:text-foreground">
											{sample.metadata.title}
										</CardTitle>
										<CardDescription className="text-xs font-sans text-pretty opacity-75 transition-opacity duration-400 group-hover/card:opacity-100">
											{sample.metadata.client}
										</CardDescription>
									</CardContent>
								</Card>
							</motion.li>
						))}
					</Grid>
				</div>
			</Section>
		</motion.div>
	);
};

export default SectionWork;
