import Link from 'next/link';

import site from '~/data/site.json';

const Brand = () => {
	return (
		<Link href="/" className="group block mt-2.75 pointer-events-auto">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 800 610"
				role="img"
				aria-hidden="true"
				fill="currentColor"
				className="w-10 opacity-50 transition-opacity group-hover:opacity-100"
			>
				{/* J */}
				<path d="M36.31 213.89c9.75 6.66 23 13.31 38.09 13.31 19.49 0 32.77-12.42 32.77-33.26V0h89.46v195.27c0 75.83-45.61 110.87-114.26 110.87-28.78 0-59.37-6.21-82.37-23.95z" />
				{/* C */}
				<path d="M196.63 153.14c0-91.36 70-153 162.53-153 77.51 0 116.48 45.24 134.19 86l-77.06 35.96c-7.52-23.06-30.55-43-57.13-43-43 0-71.74 32.82-71.74 74.06s28.79 74.06 71.74 74.06c26.58 0 49.61-20 57.13-43l77.06 35.48c-17.27 39.47-56.68 86.48-134.19 86.48-92.55-.04-162.53-62.13-162.53-153.04z" />
				{/* O */}
				<path
					className="sm:opacity-0 sm:translate-y-[10%] transition delay-100 group-hover:opacity-100 group-hover:translate-y-0 group-hover:delay-0"
					d="M638.35.14c-91.23 0-161.64 62.09-161.64 153s70.41 153 161.64 153S800 244.05 800 153.14 729.58.14 638.35.14zm0 227.06c-43 0-70.85-32.82-70.85-74.06s27.9-74.06 70.85-74.06 70.86 32.82 70.86 74.06-27.9 74.06-70.86 74.06z"
				/>
				{/* C */}
				<path
					className="sm:opacity-0 sm:translate-y-[10%] transition delay-75 group-hover:opacity-100 group-hover:translate-y-0"
					d="M196.63 457c0-91.35 70-153 162.53-153 77.51 0 116.48 45.24 134.19 86l-77.06 36c-7.52-23.06-30.55-43-57.13-43-43 0-71.74 32.82-71.74 74.06s28.79 74.06 71.74 74.06c26.58 0 49.61-19.95 57.13-43l77.06 35.47C476.08 563 436.67 610 359.16 610c-92.55 0-162.53-62.09-162.53-153z"
				/>
				{/* K */}
				<path
					className="sm:opacity-0 sm:translate-y-[10%] transition delay-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:delay-100"
					d="M596.84 494.36l-16.39 22.18V610h-89.46V294.47h89.46v119.18L647 294l132.14-62.09-123.4 208.35L780.61 610H670.64l-73.8-115.64z"
				/>
			</svg>
			<h1 className="sr-only">{site.title}</h1>
		</Link>
	);
};

export default Brand;
