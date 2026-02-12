'use client';

import { usePathname } from 'next/navigation';

import Navbar from '~/components/modules/navigation/navbar';

const Header = () => {
	const pathname = usePathname();
	const altMode = pathname !== '/';

	return (
		<header
			className={`
				fixed top-0 inset-x-0 z-99 pointer-events-none
				${altMode ? 'text-foreground' : 'text-background'}
			`}
		>
			<Navbar altMode={altMode} />
		</header>
	);
};

export default Header;
