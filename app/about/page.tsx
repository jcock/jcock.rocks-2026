import type { Metadata } from 'next';

import StructuredData from '~/components/util/structured-data';
import JumbotronHome from '~/components/modules/jumbotron/home';
import AboutSection from '~/components/modules/section/about';
import { buildPageMetadata, buildWebPageStructuredData } from '~/lib/seo';

export const metadata: Metadata = buildPageMetadata({
	title: 'About'
});

const AboutPage = () => {
	const structuredData = buildWebPageStructuredData({
		pathname: '/about'
	});

	return (
		<>
			<StructuredData data={structuredData} />

			<AboutSection />
		</>
	);
};

export default AboutPage;
