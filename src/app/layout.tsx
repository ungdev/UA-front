import Wrapper from '@/components/Wrapper';
import '@/styles.scss';
import type { Metadata, Viewport } from 'next';
import { Providers } from '@/lib/provider';
import { ToastContainer, Flip } from 'react-toastify';
import { googleVerification, uploadsUrl, appUrl } from '@/utils/environment';
import { headers } from 'next/headers';
// Dependencies CSS files
import 'react-toastify/dist/ReactToastify.css';
import 'modern-normalize/modern-normalize.css';
import Script from 'next/script';
import { Kanit } from 'next/font/google';
import Agenor from 'next/font/local';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';

const agenor = Agenor({
  src: '../../public/fonts/AgenorNeue-Regular.otf',
  variable: '--font-agenor',
  fallback: ['sans-serif'],
  display: 'swap',
});

const kanit = Kanit({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-kanit',
  fallback: ['sans-serif'],
  display: 'swap',
});

export const metadata: Metadata = {
  alternates: {
    canonical: appUrl(),
  },
  title: 'UTT Arena 2024 - 6, 7 et 8 décembre 2024',
  description:
    "L'UTT Arena revient les 6, 7 et 8 décembre 2024." +
    "8 tournois sur des incontournables de l'esport, " +
    'de nombreuses animations, du cashprize et des lots à gagner. ' +
    "Alors prépare tout ton stuff et impose-toi dans l'arène !",
  metadataBase: new URL(appUrl()),
  openGraph: {
    siteName: 'UTT Arena 2024',
    title: 'UTT Arena 2024 - 6, 7 et 8 décembre 2024',
    url: appUrl(),
    type: 'website',
    images: [
      {
        url: uploadsUrl() + '/images/banniere_SEO.png',
        alt: "Logo de l'UTT Arena",
        width: 1500,
        height: 500,
      },
    ],
    description: 'Entrez dans l’arène les 6, 7 et 8 décembre pour le retour de la compétition esport Troyenne !',
  },
  twitter: {
    title: 'UTT Arena 2024 - 6, 7 et 8 décembre 2024',
    site: '@UTTArena',
    card: 'summary_large_image',
    images: [
      {
        url: uploadsUrl() + '/images/banniere_SEO.png',
        alt: "Bannière de l'UTT Arena 2024, les 6, 7 et 8 décembre 2024",
      },
    ],
    description: 'Entrez dans l’arène les 6, 7 et 8 décembre 2024 pour le retour de la compétition esport Troyenne !',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      {
        url: '/icons/favicon-32x32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        url: '/icons/favicon-16x16.png',
        type: 'image/png',
        sizes: '16x16',
      },
    ] as unknown as Icon[],
    apple: '/icons/apple-touch-icon.png',
    other: [
      {
        rel: 'mask-icon',
        url: '/icons/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ],
  },
  keywords: [
    'UTT',
    'UTT Arena',
    'UTT Arena 2023',
    'esport',
    'e-sport',
    'gaming',
    'tournoi',
    'tournoi esport',
    'LAN',
    'LAN Troyes',
    'LAN Aube',
    'LAN Grand-Est',
    'Grand-Est',
    'Aube',
    'Troyes',
    'compétition',
    'compétition esport',
    'compétition e-sport',
    'compétition gaming',
    'compétition gaming Troyes',
    'compétition gaming Aube',
    'compétition gaming Grand-Est',
    'compétition gaming France',
    'France',
  ],
  verification: {
    google: googleVerification(),
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#202020',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Get header x-nonce
  const nonce = headers().get('x-nonce') || '';

  return (
    <html lang="fr" className={`${agenor.variable} ${kanit.variable}`}>
      <body>
        <Script src="/matomo.js" nonce={nonce} strategy="lazyOnload" />
        <Providers>
          <Wrapper>{children}</Wrapper>
        </Providers>
        <ToastContainer autoClose={3000} transition={Flip} hideProgressBar={true} pauseOnHover={true} />
      </body>
    </html>
  );
}
