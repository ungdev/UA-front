import Wrapper from '@/components/Wrapper';
import '@/styles.scss';
import type { Metadata } from 'next';
import { Providers } from '@/lib/provider';
import { ToastContainer, Flip } from 'react-toastify';
import { googleVerification, uploadsUrl } from '@/utils/environment';
import { headers } from 'next/headers';
// Dependencies CSS files
import 'react-toastify/dist/ReactToastify.css';
import 'modern-normalize/modern-normalize.css';
import Script from 'next/script';
import { Montserrat, Lexend } from 'next/font/google';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';

const montserrat = Montserrat({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  fallback: ['sans-serif'],
  display: 'swap',
});

const lexend = Lexend({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lexend',
  fallback: ['sans-serif'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'UTT Arena 2022 - 3 et 4 décembre 2022',
  description:
    'Viens participer au célèbre tournoi du Grand-Est ! ' +
    "L'UTT Arena revient pour sa 20ème édition les 3 et 4 décembre 2022. " +
    "Au programme, 7 tournois sur des incontournables de l'esport, du skill, des personnalités et des rencontres, " +
    'de nombreuses animations, du cashprize et des lots à gagner, qui rendront cette édition plus intense et vibrante que jamais. ' +
    "Alors prépare tout ton stuff et impose-toi dans l'arène !",
  openGraph: {
    siteName: 'UTT Arena 2022',
    title: 'UTT Arena 2022 - 3 et 4 décembre 2022',
    url: 'https://arena.utt.fr/',
    type: 'website',
    images: [
      {
        url: uploadsUrl() + '/images/banniere_SEO.png',
        alt: "Logo de l'UTT Arena",
        width: 1500,
        height: 500,
      },
    ],
    description: 'Entrez dans l’arène les 3 et 4 décembre pour le retour de la compétition e-sport Troyenne !',
  },
  twitter: {
    title: 'UTT Arena 2022 - 3 et 4 décembre 2022',
    site: '@UTTArena',
    card: 'summary_large_image',
    images: [
      {
        url: uploadsUrl() + '/images/banniere_SEO.png',
        alt: "Bannière de l'UTT Arena 2022, le 3 et 4 décembre",
      },
    ],
    description: 'Entrez dans l’arène les 3 et 4 décembre pour le retour de la compétition e-sport Troyenne !',
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
    'UTT Arena 2022',
    'esport',
    'e-sport',
    'gaming',
    'tournoi',
    'tournoi esport',
    'LAN',
    'LAN Troyes',
  ],
  themeColor: '#202020',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: googleVerification(),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Get header x-nonce
  const nonce = headers().get('x-nonce') || '';

  return (
    <html lang="fr" className={`${montserrat.variable} ${lexend.variable}`}>
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
