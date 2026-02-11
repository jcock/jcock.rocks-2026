import Script from 'next/script';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { siteMetadata, siteViewport } from '~/lib/seo';
import { inter, notoSerif } from '~/styles/fonts';
import site from '~/data/site.json';
import '~/styles/app.css';

import Layout from '~/components/layout/layout';

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

type AppLayoutProps = Readonly<{
	children: ReactNode;
}>;

const AppLayout = ({ children }: AppLayoutProps) => {
	const gtmId = site.analytics.gtmId;

	return (
		<html lang="en-US">
			<body className={`${inter.variable} ${notoSerif.variable}`}>
				{gtmId && process.env.NODE_ENV === 'production' ? (
					<Script id="google-tag-manager" strategy="afterInteractive">
						{`
							(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
							new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
							j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
							'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
							})(window,document,'script','dataLayer','${gtmId}');
						`}
					</Script>
				) : null}
				<Layout>{children}</Layout>
			</body>
		</html>
	);
};

export default AppLayout;
