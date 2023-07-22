import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPartners } from '../modules/partners';

const Partners = () => {
  const dispatch = useDispatch();
  const partners = useSelector((state) => state.partners.partners);

  useEffect(() => {
    if (!partners) {
      dispatch(fetchPartners);
    }
  }, []);

  return (
    <div className="partners">
      {!partners
        ? 'Chargement des partenaires...'
        : partners?.map((partner, i) => (
            <a key={i} href={partner.link}>
              <img src={partner.image} alt={`Logo ${partner.name}`}></img>
            </a>
          ))}
    </div>
  );
};

export default Partners;
