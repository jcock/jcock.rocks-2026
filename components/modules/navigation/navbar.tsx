import Link from '~/components/modules/navigation/transition-link';
import ViewModeToggle from '~/components/modules/navigation/view-mode';
import Icon from '~/components/modules/icon';

import site from '~/data/site.json';

import JcockLetters from '~/images/inline/jcock-letters.svg';

const Navbar = () => {
	return (
		<div className="flex justify-between gap-4 py-2 px-4 container text-foreground">
			<Link
				href="/"
				className="group jcock-letters--container block mt-2.75 pointer-events-auto"
			>
				<JcockLetters
					role="img"
					aria-hidden="true"
					className="jcock-letters w-10"
				/>
				<h1 className="sr-only">{site.title}</h1>
			</Link>
			<ViewModeToggle />
		</div>
	);
};

export default Navbar;
