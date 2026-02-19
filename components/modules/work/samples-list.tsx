'use client';

import * as React from 'react';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';

import Grid from '~/components/modules/grid';
import {
	Card,
	CardImage,
	CardTitle,
	CardDescription,
	CardContent
} from '~/components/modules/core/card';

import {
	Carousel,
	CarouselContent,
	CarouselItem
} from '~/components/modules/core/carousel';

import type { WorkSample } from '~/app/work/types';

interface WorkSamplesListProps {
	className?: string;
	samples: ReadonlyArray<WorkSample>;
}

type WorkSampleCardProps = {
	sample: WorkSample;
};

const WorkSampleCard = ({ sample }: WorkSampleCardProps) => {
	const autoplay = React.useRef(
		Autoplay({
			delay: 1000,
			playOnInit: false,
			stopOnInteraction: false,
			stopOnMouseEnter: false,
			stopOnFocusIn: false
		})
	);
	const fade = React.useRef(Fade());
	const carouselPlugins = React.useMemo(
		() => [autoplay.current, fade.current],
		[]
	);

	const handleMouseEnter = React.useCallback(() => {
		autoplay.current.play();
	}, []);

	const handleMouseLeave = React.useCallback(() => {
		autoplay.current.stop();
	}, []);

	return (
		<Card
			as={Link}
			href={`/work/${sample.slug}`}
			className="relative pt-0"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<Carousel name={`${sample.slug}-images`} plugins={carouselPlugins}>
				<CarouselContent>
					{sample.metadata.images?.map(image => (
						<CarouselItem key={image}>
							<div className="aspect-4/3 overflow-hidden">
								<CardImage
									key={image}
									src={image}
									width={720}
									height={540}
									alt=""
									className="w-full h-full object-cover object-center bg-white"
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
			<CardContent className="px-0">
				<CardTitle>{sample.metadata.title}</CardTitle>
				<CardDescription className="text-xs font-sans">
					{sample.metadata.client}
				</CardDescription>
			</CardContent>
		</Card>
	);
};

const WorkSamplesList = ({ className, samples }: WorkSamplesListProps) => {
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

	return (
		<Grid columns="sm:grid-cols-2 lg:grid-cols-3" className={className ?? ''}>
			{sortedSamples.map(sample => (
				<WorkSampleCard key={sample.slug} sample={sample} />
			))}
		</Grid>
	);
};

export default WorkSamplesList;
