'use client';

import { Button } from '~/components/modules/core/button';
import Icon from '~/components/modules/icon';
import Link from '~/components/modules/navigation/transition-link';

import site from '~/data/site.json';

import JcockLetters from '~/images/inline/jcock-letters.svg';

interface NavbarProps {
	altMode: boolean;
}

const Navbar = ({ altMode }: NavbarProps) => {
	return (
		<div className="flex py-2 px-4 container">
			<Button
				variant="none"
				size="icon"
				nativeButton={false}
				aria-label="Back to all work samples"
				className={
					altMode
						? 'pointer-events-auto opacity-50 hover:opacity-100'
						: 'pointer-events-none opacity-0'
				}
				render={
					<Link href="/#work">
						<Icon
							icon="ph:arrow-left-bold"
							className="transition-transform group-hover/button:-translate-x-1"
						/>
					</Link>
				}
			/>
			<Link
				href="/"
				className="block group jcock-letters--container mt-2.75 pointer-events-auto"
			>
				<JcockLetters
					role="img"
					aria-hidden="true"
					className="jcock-letters w-10"
				/>
				<h1 className="sr-only">{site.title}</h1>
			</Link>
		</div>
	);
};

export default Navbar;
