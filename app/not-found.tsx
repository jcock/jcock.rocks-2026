import Link from 'next/link';
import type { Metadata } from 'next';

import StructuredData from '~/components/util/structured-data';
import { Button } from '~/components/modules/core/button';
import { buildPageMetadata, buildWebPageStructuredData } from '~/lib/seo';

export const metadata: Metadata = buildPageMetadata({
	title: '404: Not found'
});

const NotFoundPage = () => {
	const structuredData = buildWebPageStructuredData({
		pathname: '/404',
		title: '404: Not found'
	});

	return (
		<>
			<StructuredData data={structuredData} />

			<section className="relative min-h-[50vh] md:min-h-[70vh] pt-[10vh] pb-12 overflow-clip bg-muted">
				<div className="relative z-10 container px-4 text-center">
					<h1 className="text-[clamp(3.34rem,25vw,23rem)] leading-tight font-extrabold text-pretty uppercase text-primary/30">
						Oops
					</h1>
					<p className="mb-8 text-lg md:text-xl lg:text-2xl font-bold text-pretty">
						This page could not be found
					</p>

					<nav className="max-w-xl mx-auto flex flex-wrap justify-center gap-4 font-semibold">
						<Button
							variant="link"
							hasUnderline
							nativeButton={false}
							render={<Link href="/">Home</Link>}
						/>
					</nav>
				</div>
			</section>
		</>
	);
};

export default NotFoundPage;
