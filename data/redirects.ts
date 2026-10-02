module.exports = [
	{
		source: '/:path*',
		has: [
			{
				type: 'host',
				value: 'jasoncockerham\\.com'
			}
		],
		destination: 'https://jcock.rocks/',
		permanent: true
	},
	{
		source: '/:path*',
		has: [
			{
				type: 'host',
				value: 'www\\.jasoncockerham\\.com'
			}
		],
		destination: 'https://jcock.rocks/',
		permanent: true
	},
	{
		source: '/:path*',
		has: [
			{
				type: 'host',
				value: 'jcock\\.com'
			}
		],
		destination: 'https://jcock.rocks/',
		permanent: true
	},
	{
		source: '/:path*',
		has: [
			{
				type: 'host',
				value: 'www\\.jcock\\.com'
			}
		],
		destination: 'https://jcock.rocks/',
		permanent: true
	},
	{
		source: '/work',
		destination: '/',
		permanent: true
	}
];
