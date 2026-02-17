import Link from 'next/link';
import type { Metadata } from 'next';

import StructuredData from '~/components/util/structured-data';
import { Button } from '~/components/modules/core/button';
import { buildPageMetadata, buildWebPageStructuredData } from '~/lib/seo';

import FaceHurt from '~/images/inline/face.hurt.svg';

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

			<section className="relative grid place-items-center min-h-dvh py-12 overflow-clip">
				<div className="relative z-10 container px-4 text-center">
					<FaceHurt
						role="img"
						aria-hidden="true"
						className="w-1/6 md:w-1/5 mx-auto opacity-30"
					/>
					<h1 className="text-[clamp(3.34rem,20vw,18rem)] leading-tight font-extrabold text-pretty uppercase text-foreground/30">
						Damn
					</h1>
					<p className="max-w-xl mx-auto mb-8 text-base md:text-lg lg:text-xl text-pretty">
						Looks like the page you’re looking for doesn’t exist. Don’t worry,
						it happens to the best of us. You can always head back to the
						homepage and start fresh.
					</p>

					<nav className="max-w-xl mx-auto flex flex-wrap justify-center gap-4 font-semibold font-sans">
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
