import Brand from '~/components/modules/navigation/brand';
import ViewModeToggle from '~/components/modules/navigation/view-mode';
import Grid from '~/components/modules/grid';

import { RouteGroups } from '~/lib/utils';
import NavLink from './nav-link';

const Navbar = () => {
	const navbarRoutes = RouteGroups('navbar');

	return (
		<div className="px-8 md:px-16 py-2 container text-foreground">
			<Grid columns="grid-cols-2" gap="md:gap-2">
				<Grid.Item>
					<Brand />
				</Grid.Item>
				<nav className="flex flex-row md:flex-col justify-end md:justify-start md:items-start gap-4 md:gap-0">
					{navbarRoutes.map((route: { title: string; slug: string }) => (
						<NavLink.Anchor
							key={route.title}
							href={route.slug}
							className="block md:inline-block px-3 py-2.5 font-sans text-sm text-foreground/50 transition-colors hover:text-foreground focus:text-foreground pointer-events-auto"
							activeClassName="text-foreground! underline! decoration-1 underline-offset-4"
						>
							{route.title}
						</NavLink.Anchor>
					))}
				</nav>
			</Grid>
			{/* <ViewModeToggle /> */}
		</div>
	);
};

export default Navbar;
