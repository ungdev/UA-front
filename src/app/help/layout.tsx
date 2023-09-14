import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Aide - UTT Arena 2022 - 3 et 4 décembre 2022',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
