'use client';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
import { fetchPartners } from '@/modules/partners';
import { Partner } from '@/types';

/**
 * Renders a list of partners with their logos as clickable links.
 * @returns JSX.Element
 */
export default function Partners() {
  const dispatch = useAppDispatch();
  const partners = useAppSelector((state) => state.partners.partners);

  useEffect(() => {
    if (!partners) {
      dispatch(fetchPartners as any);
    }
  }, []);

  return (
    <div className="partners">
      {!partners
        ? 'Chargement des partenaires...'
        : partners?.map((partner: Partner, i: number) => (
            <a key={i} href={partner.link}>
              <img src={partner.image} alt={`Logo ${partner.name}`} />
            </a>
          ))}
    </div>
  );
}
