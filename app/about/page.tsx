import Link from 'next/link';
import type { Metadata } from 'next';

import StructuredData from '~/components/util/structured-data';
import Jumbotron from '~/components/modules/jumbotron';
import Section, { SectionTitle } from '~/components/modules/section';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardImage,
	CardTitle
} from '~/components/modules/core/card';
import SlideIn from '~/components/modules/animations/slidein';
import Grid from '~/components/modules/grid';
import Dialog from '~/components/modules/dialog';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '~/components/modules/core/accordion';
import { Button } from '~/components/modules/core/button';
import { buildPageMetadata, buildWebPageStructuredData } from '~/lib/seo';

import JumbotronFpoImage from '~/images/jumbotron/fpo.png';
import FpoImage from '~/images/fpo.png';

export const metadata: Metadata = buildPageMetadata({
	title: 'About'
});

const AboutPage = () => {
	const structuredData = buildWebPageStructuredData({
		pathname: '/about',
		title: 'About'
	});

	return (
		<>
			<StructuredData data={structuredData} />

			<Jumbotron>
				<Jumbotron.Body>
					<Jumbotron.Title className="text-center">About</Jumbotron.Title>
				</Jumbotron.Body>
				<Jumbotron.Image image={JumbotronFpoImage} alt="FPO image" />
			</Jumbotron>

			<Section id="alpha" className="container px-4 my-20">
				<SectionTitle>Alpha</SectionTitle>

				<Dialog
					title="Dialog Title"
					button={{
						text: 'Open Dialog',
						icon: 'mdi:dialogue-plus'
					}}
				>
					<p className="text-pretty">
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat
						dolor inventore deserunt, perferendis asperiores quibusdam
						repudiandae.
					</p>
				</Dialog>

				<Grid className="my-12">
					<SlideIn>
						<Card className="h-full">
							<CardImage src={FpoImage} alt="FPO image" />
							<CardContent>
								<CardTitle>Card Title</CardTitle>
								<CardDescription>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit.
									Placeat dolor inventore deserunt, perferendis asperiores
									quibusdam repudiandae.
								</CardDescription>
							</CardContent>
							<CardFooter>
								<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
							</CardFooter>
						</Card>
					</SlideIn>
					<SlideIn>
						<Card className="h-full">
							<CardImage src={FpoImage} alt="FPO image" />
							<CardContent>
								<CardTitle>Card Title</CardTitle>
								<CardDescription>
									Lorem ipsum, dolor sit amet consectetur adipisicing elit.
									Placeat dolor inventore deserunt, perferendis asperiores
									quibusdam repudiandae.
								</CardDescription>
							</CardContent>
							<CardFooter>
								<Button
									render={<Link href="/">Lorem ipsum</Link>}
									nativeButton={false}
									className="stretched-link"
								/>
							</CardFooter>
						</Card>
					</SlideIn>
				</Grid>
			</Section>

			<Section id="beta" className="container px-4 my-20">
				<SectionTitle>Beta</SectionTitle>
				<Accordion defaultValue={['item-1']}>
					<AccordionItem value="item-1">
						<AccordionTrigger>Item 1</AccordionTrigger>
						<AccordionContent>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
								Placeat dolor inventore deserunt, perferendis asperiores
								quibusdam repudiandae. Fugiat voluptatem blanditiis reiciendis
								earum repellat, qui dolor tenetur maiores at voluptate enim modi
								asperiores ab corrupti explicabo recusandae ea excepturi
								assumenda quae iure rem similique consectetur veritatis minima.
								Natus.
							</p>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-2">
						<AccordionTrigger>Item 2</AccordionTrigger>
						<AccordionContent>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
								Placeat dolor inventore deserunt, perferendis asperiores
								quibusdam repudiandae. Fugiat voluptatem blanditiis reiciendis
								earum repellat, qui dolor tenetur maiores at voluptate enim modi
								asperiores ab corrupti explicabo recusandae ea excepturi
								assumenda quae iure rem similique consectetur veritatis minima.
								Natus.
							</p>
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value="item-3">
						<AccordionTrigger>Item 3</AccordionTrigger>
						<AccordionContent>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
								Placeat dolor inventore deserunt, perferendis asperiores
								quibusdam repudiandae. Fugiat voluptatem blanditiis reiciendis
								earum repellat, qui dolor tenetur maiores at voluptate enim modi
								asperiores ab corrupti explicabo recusandae ea excepturi
								assumenda quae iure rem similique consectetur veritatis minima.
								Natus.
							</p>
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</Section>
		</>
	);
};

export default AboutPage;
