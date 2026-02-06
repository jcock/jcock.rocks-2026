import type { Metadata } from 'next';

import StructuredData from '~/components/util/structured-data';
import Jumbotron from '~/components/modules/jumbotron';
import Section from '~/components/modules/section';
import Form from '~/components/modules/form';
import { buildPageMetadata, buildWebPageStructuredData } from '~/lib/seo';

import JumbotronFpoImage from '~/images/jumbotron/fpo.png';

export const metadata: Metadata = buildPageMetadata({
	title: 'Insurance Claim'
});

const ContactPage = () => {
	const structuredData = buildWebPageStructuredData({
		pathname: '/contact',
		title: 'Insurance Claim'
	});

	return (
		<>
			<StructuredData data={structuredData} />

			<Jumbotron>
				<Jumbotron.Body>
					<Jumbotron.Title className="text-center">
						Insurance Claim Intake
					</Jumbotron.Title>
				</Jumbotron.Body>
				<Jumbotron.Image image={JumbotronFpoImage} alt="FPO image" />
			</Jumbotron>

			<Section className="container px-4 py-12">
				<Form />
			</Section>
		</>
	);
};

export default ContactPage;
