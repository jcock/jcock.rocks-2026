import Brand from '~/components/modules/navigation/brand';
import Grid from '~/components/modules/grid';
import NavLink from '~/components/modules/navigation/nav-link';

import routes from '~/data/routes';

const Navbar = () => {
	return (
		<div className="px-8 md:px-16 py-2 container text-foreground">
			<Grid columns="grid-cols-2" gap="md:gap-2">
				<Grid.Item>
					<Brand />
				</Grid.Item>
				<nav className="flex flex-row md:flex-col justify-end md:justify-start md:items-start gap-4 md:gap-0">
					{routes.children.map((route: { title: string; slug: string }) => (
						<NavLink.Anchor key={route.title} href={route.slug}>
							{route.title}
						</NavLink.Anchor>
					))}
				</nav>
			</Grid>
		</div>
	);
};

export default Navbar;
