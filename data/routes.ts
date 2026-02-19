const routes = {
	id: 'home',
	slug: '/',
	title: 'Home',
	children: [
		{
			slug: '/',
			title: 'Work',
			useIn: ['navbar', '404']
		},
		{
			slug: '/about',
			title: 'About',
			useIn: ['navbar', '404']
		}
	]
};

export default routes;
