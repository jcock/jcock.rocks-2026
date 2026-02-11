import StructuredData from '~/components/util/structured-data';
import JumbotronHome from '~/components/modules/jumbotron/home';
import AboutSection from '~/components/modules/section/about';
import WorkSection from '~/components/modules/section/work';
import { getWorkSamples } from '~/app/work/server-utils';
import { buildWebPageStructuredData } from '~/lib/seo';

const HomePage = () => {
	const structuredData = buildWebPageStructuredData({
		pathname: '/'
	});
	const workSamples = getWorkSamples();

	return (
		<>
			<StructuredData data={structuredData} />

			<JumbotronHome />
			<AboutSection />
			<WorkSection samples={workSamples} />
		</>
	);
};

export default HomePage;
