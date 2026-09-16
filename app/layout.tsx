import type { Metadata, Viewport } from 'next';
import './globals.css';

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteUrl = configuredSiteUrl && /^https?:\/\//.test(configuredSiteUrl)
  ? configuredSiteUrl.replace(/\/$/, '')
  : 'http://localhost:3000';
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, '') ?? '';
const publicAsset = (path: string) => `${configuredBasePath}${path}`;

const title = 'Emmanuel Josh Velo | Web Developer & Software Engineer';
const description = 'Portfolio of Emmanuel Josh Velo, a Web Developer and Software Engineer in the Philippines building responsive websites, business systems, and practical digital products.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: 'Emmanuel Josh Velo Portfolio',
  authors: [{ name: 'Emmanuel Josh Velo', url: siteUrl }],
  creator: 'Emmanuel Josh Velo',
  keywords: ['Emmanuel Josh Velo', 'Web Developer', 'Software Engineer', 'React Developer', 'Laravel Developer', 'Philippines'],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    url: siteUrl,
    siteName: 'Emmanuel Josh Velo Portfolio',
    title,
    description,
    images: [{ url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: 'Emmanuel Josh Velo — Web Developer and Software Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [`${siteUrl}/og.png`],
  },
  icons: {
    icon: [{ url: publicAsset('/favicon.svg'), type: 'image/svg+xml' }],
    shortcut: publicAsset('/favicon.svg'),
    apple: publicAsset('/favicon.svg'),
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f5f3ee',
  colorScheme: 'light',
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Emmanuel Josh Velo',
  url: siteUrl,
  jobTitle: 'Web Developer',
  email: 'mailto:velojoshemmanuel30@gmail.com',
  address: { '@type': 'PostalAddress', addressCountry: 'PH' },
  sameAs: ['https://github.com/ProgJosh', 'https://www.linkedin.com/in/emmanuel-josh-velo', 'https://www.facebook.com/heyiamjosh'],
  knowsAbout: ['Web development', 'Software engineering', 'Responsive design', 'React', 'TypeScript', 'Laravel', 'PHP', 'MySQL'],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, '\\u003c') }}
        />
      </body>
    </html>
  );
}
