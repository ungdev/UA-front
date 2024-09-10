import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Aide - UTT Arena 2024 - 6, 7 et 8 décembre 2024',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
