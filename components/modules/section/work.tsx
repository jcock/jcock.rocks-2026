'use client';

import { motion } from 'motion/react';
import type { Variants } from 'motion/react';

import Section from '~/components/modules/section';
import Grid from '~/components/modules/grid';
import List from '~/components/modules/text/list';
import WorkSamplesList from '~/components/modules/work/samples-list';

import { useScrollDirection } from '~/hooks/useScrollDirection';
import { fadeItemVariants } from '~/components/util/animations';

import AwardWebby from '~/images/inline/awards/webby.svg';
import AwardAaa from '~/images/inline/awards/aaa.svg';
import AwardWebAward from '~/images/inline/awards/webaward.svg';
import type { WorkSample } from '~/app/work/types';

interface SectionWorkProps {
	id?: string;
	className?: string;
	samples: ReadonlyArray<WorkSample>;
}

const SectionWork = ({ id = 'work', className, samples }: SectionWorkProps) => {
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
				className={`grid items-center min-h-dvh px-[5dvw] sm:px-[10dvw] py-[20dvh] ${className ?? ''}`}
			>
				<div className="container px-4">
					<Grid columns="lg:grid-cols-2" className="items-center">
						<motion.div variants={fadeItemVariants}>
							<Section.Title>Work.</Section.Title>
						</motion.div>

						<Grid.Item className="space-y-12 md:space-y-20">
							<motion.div
								variants={fadeItemVariants}
								className="space-y-4 *:text-pretty"
							>
								<h3 className="mb-8 text-base lg:text-xs lg:uppercase text-muted-foreground">
									Things I’ve made.
								</h3>

								<WorkSamplesList samples={samples} />
							</motion.div>

							<motion.div variants={fadeItemVariants} className="*:text-pretty">
								<h3 className="mb-8 text-base lg:text-xs lg:uppercase text-muted-foreground">
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
						</Grid.Item>
					</Grid>
				</div>
			</Section>
		</motion.div>
	);
};

export default SectionWork;
