'use client';

import { Button, Title } from '@/components/UI';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Faq } from '@/types';
import { useEffect, useMemo, useState } from 'react';
import styles from './style.module.scss';
import { fetchFaqs, deleteFaqApi } from '@/modules/admin';
import FaqModal from '@/components/dashboard/FaqModal';

const AdminFaqPage = () => {
  const dispatch = useAppDispatch();
  const faqs = useAppSelector((state) => state.admin.faqs);
  const [selectedFaq, setSelectedFaq] = useState<Faq | null>(null);
  const [createNewFAQ, setCreateNewFAQ] = useState(false);

  // Charger les FAQ au montage
  useEffect(() => {
    dispatch(fetchFaqs());
  }, [dispatch]);

  // Regrouper par catégorie
  const groupedFaqs = useMemo(() => {
    if (!faqs) return {};
    return faqs.reduce<Record<string, Faq[]>>((acc, faq) => {
      if (!acc[faq.category]) acc[faq.category] = [];
      acc[faq.category].push(faq);
      return acc;
    }, {});
  }, [faqs]);

  const handleDelete = (id: string) => {
    dispatch(deleteFaqApi(id));
  };

  return (
    <div className={styles.faq}>
      <div className={styles.titleContainer}>
        <Title level={2} gutterBottom={false}>
          FAQ
        </Title>
        <Button primary onClick={() => setCreateNewFAQ(true)}>
          Ajouter une FAQ
        </Button>
      </div>

      <div className={styles.squareContainer}>
        {Object.keys(groupedFaqs).length > 0 ? (
          Object.keys(groupedFaqs).map((category) => (
            <div key={category} className={styles.categoryBlock}>
              <h3 className={styles.categoryTitle}>{category}</h3>
              {groupedFaqs[category].map((faq) => (
                <div key={faq.id} className={styles.faqItem}>
                  <p className={styles.question}>
                    <span className={faq.display ? styles.visible : styles.hidden}>{faq.display ? '✅' : '🚫'}</span>{' '}
                    {faq.question}
                  </p>
                  <p className={styles.answer}>{faq.answer}</p>
                  <div className={styles.actions}>
                    <Button onClick={() => setSelectedFaq(faq)}>Modifier</Button>
                    <Button outline onClick={() => handleDelete(faq.id)}>
                      Supprimer
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>Aucune FAQ disponible</p>
        )}
      </div>

      {(selectedFaq !== null || createNewFAQ) && (
        <FaqModal
          faq={selectedFaq}
          onClose={() => {
            setSelectedFaq(null);
            setCreateNewFAQ(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminFaqPage;
