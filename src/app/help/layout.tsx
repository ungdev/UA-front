import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Aide - UTT Arena 2025 - 28, 29 et 30 novembre 2025',
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
