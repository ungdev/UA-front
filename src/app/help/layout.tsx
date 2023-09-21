import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Aide - UTT Arena 2023 - 1, 2 et 3 décembre 2023',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
