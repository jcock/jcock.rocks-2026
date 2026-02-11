import type { ReactNode } from 'react';

import { Provider } from '~/components/util/provider';
import SkipLink from '~/components/modules/navigation/skip-link';
import Footer from '~/components/layout/footer';

type RootLayoutProps = {
	children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
	return (
		<div id="top" className="relative">
			<Provider>
				<SkipLink />

				<main id="start-of-content">{children}</main>

				<Footer />
			</Provider>
		</div>
	);
};

export default RootLayout;
