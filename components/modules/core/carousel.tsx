'use client';

import * as React from 'react';
import useEmblaCarousel, {
	type UseEmblaCarouselType
} from 'embla-carousel-react';
import ClassNames from 'embla-carousel-class-names';
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

import { cn } from '~/lib/utils';
import { Button } from '~/components/modules/core/button';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';

import trackEvent from '~/hooks/useEventTracker';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
	name: string;
	opts?: CarouselOptions;
	plugins?: CarouselPlugin;
	orientation?: 'horizontal' | 'vertical';
	setApi?: (api: CarouselApi) => void;
	trackOnSelect?: boolean;
};

type CarouselContextProps = {
	carouselRef: ReturnType<typeof useEmblaCarousel>[0];
	api: ReturnType<typeof useEmblaCarousel>[1];
	scrollPrev: () => void;
	scrollNext: () => void;
	scrollTo: (index: number) => void;
	canScrollPrev: boolean;
	canScrollNext: boolean;
	selectedIndex: number;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
	const context = React.useContext(CarouselContext);

	if (!context) {
		throw new Error('useCarousel must be used within a <Carousel />');
	}

	return context;
}

function Carousel({
	name,
	orientation = 'horizontal',
	opts,
	setApi,
	plugins,
	trackOnSelect = true,
	className,
	children,
	...props
}: React.ComponentProps<'div'> & CarouselProps) {
	const carouselPlugins = React.useMemo(
		() => [...(plugins ?? []), ClassNames(), WheelGesturesPlugin()],
		[plugins]
	);

	const [carouselRef, api] = useEmblaCarousel(
		{
			align: 'center',
			loop: true,
			...opts,
			axis: orientation === 'horizontal' ? 'x' : 'y'
		},
		carouselPlugins
	);
	const [canScrollPrev, setCanScrollPrev] = React.useState(false);
	const [canScrollNext, setCanScrollNext] = React.useState(false);
	const [selectedIndex, setSelectedIndex] = React.useState(
		opts?.startIndex || 0
	);
	const onSelect = React.useCallback(
		(api: CarouselApi) => {
			if (!api) return;
			const carouselIndex = api.selectedScrollSnap() + 1;
			setCanScrollPrev(api.canScrollPrev());
			setCanScrollNext(api.canScrollNext());
			setSelectedIndex(api.selectedScrollSnap());

			if (!trackOnSelect) return;

			trackEvent(
				'Engagement',
				'Carousel',
				`${name ? `${name}: ` : ''}Slide ${carouselIndex}`,
				carouselIndex
			);
		},
		[name, trackOnSelect]
	);

	const scrollPrev = React.useCallback(() => {
		api?.scrollPrev();
	}, [api]);

	const scrollNext = React.useCallback(() => {
		api?.scrollNext();
	}, [api]);

	const scrollTo = React.useCallback(
		(index: number) => {
			if (index === api?.selectedScrollSnap()) return;
			api?.scrollTo(index);
		},
		[api]
	);

	const handleKeyDown = React.useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			if (event.key === 'ArrowLeft') {
				event.preventDefault();
				scrollPrev();
			} else if (event.key === 'ArrowRight') {
				event.preventDefault();
				scrollNext();
			}
		},
		[scrollPrev, scrollNext]
	);

	React.useEffect(() => {
		if (!api || !setApi) return;
		setApi(api);
	}, [api, setApi]);

	React.useEffect(() => {
		if (!api) return;
		onSelect(api);
		api.on('reInit', onSelect);
		api.on('select', onSelect);

		return () => {
			api?.off('select', onSelect);
		};
	}, [api, onSelect]);

	return (
		<CarouselContext.Provider
			value={{
				name,
				carouselRef,
				api: api,
				opts,
				orientation:
					orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
				scrollPrev,
				scrollNext,
				scrollTo,
				canScrollPrev,
				canScrollNext,
				selectedIndex
			}}
		>
			<div
				onKeyDownCapture={handleKeyDown}
				className={cn('relative', className)}
				role="region"
				aria-roledescription="carousel"
				data-slot="carousel"
				{...props}
			>
				{children}
			</div>
		</CarouselContext.Provider>
	);
}

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
	const { carouselRef, orientation } = useCarousel();

	return (
		<div
			ref={carouselRef}
			className="overflow-hidden"
			data-slot="carousel-content"
		>
			<div
				className={cn(
					'flex',
					orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
					className
				)}
				{...props}
			/>
		</div>
	);
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
	const { orientation } = useCarousel();

	return (
		<div
			role="group"
			aria-roledescription="slide"
			data-slot="carousel-item"
			className={cn(
				'min-w-0 shrink-0 grow-0 basis-full',
				orientation === 'horizontal' ? 'pl-4' : 'pt-4',
				className
			)}
			{...props}
		/>
	);
}

function CarouselDots({ className, ...props }: React.ComponentProps<'div'>) {
	const { selectedIndex, scrollTo, api } = useCarousel();

	return (
		<div
			role="tablist"
			className={cn(
				'absolute bottom-0 w-full flex items-center justify-center gap-2',
				className
			)}
			{...props}
		>
			{api?.scrollSnapList().map((_, index) => (
				<button
					key={index}
					role="tab"
					data-slot="carousel-dot"
					aria-selected={index === selectedIndex}
					aria-controls="carousel-item"
					aria-label={`Slide ${index + 1}`}
					className={cn(
						'size-3.5 rounded-full border-2 border-ring/30 cursor-pointer transition-colors',
						index === selectedIndex
							? 'border-ring bg-ring'
							: 'bg-transparent hover:border-ring'
					)}
					onClick={() => scrollTo(index)}
				/>
			))}
		</div>
	);
}

function CarouselPrevious({
	className,
	variant = 'outline',
	size = 'icon-sm',
	...props
}: React.ComponentProps<typeof Button>) {
	const { orientation, scrollPrev, canScrollPrev } = useCarousel();

	return (
		<Button
			data-slot="carousel-previous"
			variant={variant}
			size={size}
			className={cn(
				'rounded-full absolute touch-manipulation',
				orientation === 'horizontal'
					? 'top-1/2 -left-12 -translate-y-1/2'
					: '-top-12 left-1/2 -translate-x-1/2 rotate-90',
				className
			)}
			disabled={!canScrollPrev}
			onClick={scrollPrev}
			{...props}
		>
			<CaretLeftIcon />
			<span className="sr-only">Previous slide</span>
		</Button>
	);
}

function CarouselNext({
	className,
	variant = 'outline',
	size = 'icon-sm',
	...props
}: React.ComponentProps<typeof Button>) {
	const { orientation, scrollNext, canScrollNext } = useCarousel();

	return (
		<Button
			data-slot="carousel-next"
			variant={variant}
			size={size}
			className={cn(
				'rounded-full absolute touch-manipulation',
				orientation === 'horizontal'
					? 'top-1/2 -right-12 -translate-y-1/2'
					: '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
				className
			)}
			disabled={!canScrollNext}
			onClick={scrollNext}
			{...props}
		>
			<CaretRightIcon />
			<span className="sr-only">Next slide</span>
		</Button>
	);
}

export {
	type CarouselApi,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselDots,
	CarouselPrevious,
	CarouselNext,
	useCarousel
};
