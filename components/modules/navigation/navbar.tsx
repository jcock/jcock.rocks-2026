'use client';

import Link from 'next/link';

import site from '~/data/site.json';

import Horns from '~/images/inline/horns.svg';

type NavbarProps = {
	isPinned: boolean;
};

const Navbar = ({ isPinned }: NavbarProps) => {
	return (
		<div className="bg-background border-b border-border">
			<div className="flex flex-wrap items-center justify-between py-2 px-4 container">
				<Link href="/" className="flex gap-2 items-center">
					<Horns role="img" aria-hidden="true" className="size-6" />
					<h1 className="text-foreground font-bold text-md no-underline">
						{site.title}
					</h1>
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
