import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPartners } from '../modules/partners';
import Image from 'next/image';

/**
 * Renders a list of partners with their logos as clickable links.
 * @returns JSX.Element
 */
export default function Partners() {
  const dispatch = useDispatch();
  const partners = useSelector((state: any) => state.partners.partners);

  useEffect(() => {
    if (!partners) {
      dispatch(fetchPartners as any);
    }
  }, []);

  return (
    <div className="partners">
      {!partners
        ? 'Chargement des partenaires...'
        : partners?.map((partner: any, i: number) => (
            <a key={i} href={partner.link}>
              <img src={partner.image} alt={`Logo ${partner.name}`} />
            </a>
          ))}
    </div>
  );
};
