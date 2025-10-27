'use client';

import { useState } from 'react';
import { Modal, Button, Checkbox, Input, Textarea } from '@/components/UI';
import { useAppDispatch } from '@/lib/hooks';
import { Faq } from '@/types';
import { createFaqApi, updateFaqApi, deleteFaqApi } from '@/modules/admin';

interface FaqModalProps {
  faq: Faq | null;
  onClose?: () => void;
}

const FaqModal = ({ faq, onClose }: FaqModalProps) => {
  const dispatch = useAppDispatch();

  // Les différents champs
  const [category, setCategory] = useState(faq?.category ?? '');
  const [question, setQuestion] = useState(faq?.question ?? '');
  const [answer, setAnswer] = useState(faq?.answer ?? '');
  const [display, setDisplay] = useState(faq?.display ?? true);

  // ID existant pour édition
  const id = faq?.id ?? null;

  const handleSave = () => {
    if (!question.trim() || !answer.trim()) return;

    const payload = { category, question, answer, display };

    if (faq == null) {
      // Création
      dispatch(createFaqApi(payload));
    } else {
      // Edition
      dispatch(updateFaqApi(id!, payload));
    }

    if (onClose) onClose();
  };

  const handleDelete = () => {
    if (id) {
      dispatch(deleteFaqApi(id));
      if (onClose) onClose();
    }
  };

  return (
    <Modal
      visible={true}
      title={faq ? 'Modifier une FAQ' : 'Créer une FAQ'}
      onCancel={onClose ? onClose : () => {}}
      buttons={
        <>
          {faq && (
            <Button primary outline onClick={handleDelete}>
              Supprimer
            </Button>
          )}
          <Button primary onClick={handleSave}>
            Enregistrer
          </Button>
        </>
      }
      containerClassName="faq-modal">
      <>
        <Input
          label="Catégorie"
          value={category}
          onChange={setCategory}
          placeholder="Ex : Général, Inscriptions, Tournois..."
        />
        <Input
          label="Question"
          value={question}
          onChange={setQuestion}
          placeholder="Ex : Quand commencent les tournois ?"
        />
        <Textarea
          label="Réponse"
          value={answer}
          onChange={setAnswer}
          placeholder="Ex : Les tournois commencent le samedi à 10h..."
        />
        <Checkbox label="Afficher sur le site" value={display} onChange={setDisplay} />
      </>
    </Modal>
  );
};

export default FaqModal;
