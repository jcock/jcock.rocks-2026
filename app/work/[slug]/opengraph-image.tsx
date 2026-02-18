import { ImageResponse } from 'next/og';
import { getWorkSampleBySlug } from '~/app/work/server-utils';

import site from '~/data/site.json';

export const alt = 'Work sample preview';
export const size = {
	width: 1200,
	height: 630
};
export const contentType = 'image/png';

type OpengraphImageProps = {
	params: Promise<{ slug: string }>;
};

export default async function Image({ params }: OpengraphImageProps) {
	const { slug } = await params;
	const sample = getWorkSampleBySlug(slug);

	if (!sample) {
		return new ImageResponse(
			<div
				style={{
					fontSize: 56,
					backgroundColor: '#0f172a',
					color: '#f8fafc',
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				Work sample not found
			</div>,
			{
				...size
			}
		);
	}

	const { title, client, color } = sample.metadata;

	return new ImageResponse(
		<div
			style={{
				fontSize: 32,
				backgroundColor: color,
				backgroundImage: 'linear-gradient(to top, #00000033, transparent)',
				color: '#f9fafc',
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: '48px'
				}}
			>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<p
						style={{
							fontSize: '16px',
							textTransform: 'uppercase',
							letterSpacing: '0.1em',
							color: '#00000099'
						}}
					>
						Work sample
					</p>

					<h1
						style={{
							fontSize: '64px',
							lineHeight: '1.1',
							marginTop: '12px',
							fontWeight: 700
						}}
					>
						{title}
					</h1>

					<p
						style={{
							fontSize: '28px'
						}}
					>
						{client}
					</p>
				</div>

				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						gap: '24px',
						fontSize: '16px',
						color: '#fff'
					}}
				>
					<p>{site.title}</p>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 800 612"
						fill="currentColor"
						style={{ width: '48px', height: '37px' }}
					>
						<path d="M757 301.91h-69.15C753.91 283.22 800 228.24 800 154.43 800 62.67 728.78 0 636.5 0c-64.73 0-119.11 30.84-145.8 80.94C471.65 41.42 432.34 0 357.68 0c-78.14 0-140.35 43.35-158.8 111.3V0H108.4v195.61c0 21-13.44 33.57-33.15 33.57-15.23 0-28.67-6.71-38.52-13.43L0 284.69c23.29 17.9 54.2 24.17 83.32 24.17 69.3 0 115.39-35.23 115.56-111.47 15.68 57.65 63 97.86 124.87 108.6-76.27 13.17-130.47 70.89-130.47 151.58 0 91.76 70.78 154.43 164.39 154.43 70.52 0 109.86-38.4 129.77-75.11V612h90.48v-94.34l16.57-22.38L669.06 612h111.33L654.08 440.67zM636.5 79.68c43.45 0 71.67 33.12 71.67 74.75S680 229.18 636.5 229.18s-71.67-33.12-71.67-74.75 28.22-74.75 71.67-74.75zM562 293.52h-74.55v84.17c-16.84-31.35-46.9-62.42-97.65-71.74 54.08-10.24 84.9-45.8 100.77-78.27 15.52 29.26 40.43 51.97 71.43 65.84zM285.12 154.43c0-41.63 29.12-74.75 72.57-74.75 26.88 0 50.17 20.14 57.78 43.42l70.73-32.9a157.12 157.12 0 0 0-13.2 64.23 157.25 157.25 0 0 0 13 63.72l-70.5-32.39c-7.62 23.28-30.91 43.42-57.78 43.42-43.49 0-72.6-33.12-72.6-74.75zM415.47 488.9c-7.62 23.28-30.91 43.42-57.78 43.42-43.45 0-72.57-33.12-72.57-74.75s29.12-74.75 72.57-74.75c26.88 0 50.17 20.14 57.78 43.42l72-33.48V522zm162.47-75.09V299.7a186.4 186.4 0 0 0 58.57 9.16c5.2 0 10.32-.21 15.37-.6z" />
					</svg>
				</div>
			</div>
		</div>,
		{
			...size
		}
	);
}
