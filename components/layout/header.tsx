'use client';

import Navbar from '~/components/modules/navigation/navbar';

const Header = () => {
	return (
		<header className="absolute top-0 inset-x-0 z-99 pointer-events-none">
			<Navbar />
		</header>
	);
};

export default Header;
