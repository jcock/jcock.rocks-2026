import StructuredData from '~/components/util/structured-data';
import JumbotronHome from '~/components/modules/jumbotron/home';
import AboutSection from '~/components/modules/section/about';
import { buildWebPageStructuredData } from '~/lib/seo';

const HomePage = () => {
	const structuredData = buildWebPageStructuredData({
		pathname: '/'
	});

	return (
		<>
			<StructuredData data={structuredData} />

			<JumbotronHome />
			<AboutSection />
		</>
	);
};

export default HomePage;
