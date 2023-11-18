'use client';
import styles from './Partners.module.scss';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect } from 'react';
import { fetchPartners } from '@/modules/partners';
import { Partner } from '@/types';
import { type Action } from '@reduxjs/toolkit';
import { getPartnerLogoLink } from '@/utils/uploadLink';
import { Square } from './UI';
import Link from 'next/link';

/**
 * Renders a list of partners with their logos as clickable links.
 */
export default function Partners({ cards = false }: { cards?: boolean }) {
  const dispatch = useAppDispatch();
  const partners = useAppSelector((state) => state.partners.partners);

  useEffect(() => {
    if (!partners) {
      dispatch(fetchPartners as unknown as Action);
    }
  }, []);

  return (
    <div id="partners" className={styles.partners}>
      {!partners || partners.length === 0
        ? 'Chargement des partenaires...'
        : partners?.map((partner: Partner) => (
            <Link key={'partner-' + partner.id} href={partner.link} target="_blank" rel="noopener" passHref={true}>
              {cards ? (
                <Square imgSrc={getPartnerLogoLink(partner.id)} alt={partner.name} text={partner.description} long />
              ) : (
                <img src={getPartnerLogoLink(partner.id)} alt={`Logo ${partner.name}`} loading="lazy" />
              )}
            </Link>
          ))}
    </div>
  );
}
