'use client';

import type { ComponentProps, ReactNode } from 'react';
import * as React from 'react';
import ReactPlayer from 'react-player';

import Icon from '~/components/modules/icon';

import trackEvent from '~/hooks/useEventTracker';

const isBrowser = typeof window !== 'undefined';

type ReactPlayerComponentProps = ComponentProps<typeof ReactPlayer>;

type VideoPlayerProps = Omit<
	ReactPlayerComponentProps,
	'src' | 'light' | 'playing' | 'className' | 'onReady'
> & {
	url: string;
	title?: string;
	placeholder?: string;
	className?: string;
	containerClassName?: string;
	innerContainerClassName?: string;
	aspectRatio?: string;
	playOnLoad?: boolean;
	playsInline?: boolean;
	muted?: boolean;
	autoPlay?: boolean;
	onReady?: ReactPlayerComponentProps['onReady'];
	playIcon?: ReactNode;
};

const VideoPlayer = React.forwardRef<HTMLDivElement, VideoPlayerProps>(
	(
		{
			url,
			title,
			placeholder,
			className,
			containerClassName,
			innerContainerClassName,
			aspectRatio = 'aspect-16/9',
			playOnLoad = false,
			playsInline,
			muted = false,
			autoPlay = true,
			onReady,
			playIcon,
			...playerOptions
		},
		ref
	) => {
		const [lightMode] =
			React.useState<ReactPlayerComponentProps['light']>(placeholder);
		const [isPlaying, setIsPlaying] = React.useState(autoPlay);
		const [pageLoaded, setPageLoaded] = React.useState(false);
		const divRef = React.useRef<HTMLDivElement | null>(null);
		const [lastPercentProgress, setLastPercentProgress] = React.useState(0);

		React.useEffect(() => {
			if (isBrowser) {
				setPageLoaded(true);
			}
		}, []);

		return (
			<div ref={ref} className={`${containerClassName ?? ''}`}>
				<div
					ref={divRef}
					className={`
						block relative w-full overflow-hidden
						${innerContainerClassName ?? ''}
						${aspectRatio}
					`}
				>
					{pageLoaded && (
						<ReactPlayer
							className={`
								border-0 my-0
								${className ?? ''}
							`}
							src={url}
							light={
								playOnLoad
									? false
									: lightMode === false
										? lightMode
										: placeholder
							}
							onReady={() => {
								setIsPlaying(autoPlay);
								onReady?.();
							}}
							onStart={() => {
								if (title) {
									trackEvent('Engagement', 'video_start', title);
								}
							}}
							onPlay={() => {
								setIsPlaying(true);
							}}
							onPause={() => {
								setIsPlaying(false);
								if (title) {
									trackEvent('Engagement', 'video_pause', title);
								}
							}}
							onProgress={progressEvent => {
								const progress = progressEvent as unknown as {
									played: number;
								};
								const percentPlayed = Math.floor(progress.played * 100);
								if (
									[10, 25, 50, 75].includes(percentPlayed) &&
									percentPlayed !== lastPercentProgress &&
									title
								) {
									trackEvent(
										'Engagement',
										`video_progress`,
										title,
										percentPlayed
									);
									setLastPercentProgress(percentPlayed);
								}
								if (isBrowser) {
									document.querySelectorAll('button:focus').forEach(element => {
										if (element instanceof HTMLButtonElement) {
											element.blur();
										}
									});
								}
							}}
							onEnded={() => {
								if (title) {
									trackEvent('Engagement', 'video_complete', title);
								}
							}}
							playing={isPlaying}
							autoPlay={autoPlay}
							playsInline={playsInline}
							width="100%"
							height="100%"
							muted={muted}
							playIcon={
								playIcon ?? (
									<button className="transition-opacity hover:opacity-90 focus:opacity-90">
										<span className="sr-only">Play</span>
										<Icon
											icon="fe:play"
											size="size-16"
											className="text-white drop-shadow-md translate-x-1"
										/>
									</button>
								)
							}
							{...playerOptions}
						/>
					)}
				</div>
			</div>
		);
	}
);

export default VideoPlayer;
