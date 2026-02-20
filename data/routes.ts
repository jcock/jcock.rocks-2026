const routes = {
	id: 'home',
	slug: '/',
	title: 'Home',
	children: [
		{
			slug: '/',
			title: 'Work',
			useIn: ['navbar', 'error']
		},
		{
			slug: '/about',
			title: 'About',
			useIn: ['navbar', 'error']
		}
	]
};

export default routes;
