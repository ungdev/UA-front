'use client';
import { Button, Icon, Input, Select, Title } from '@/components/UI';
import styles from './style.module.scss';
import { useState } from 'react';
import { IconName } from '@/components/UI/Icon';
import { generateBadges } from '@/modules/admin';

const GenBadges = () => {
  const [fieldCount, setFieldCount] = useState(1);
  const [fields, setFields] = useState<{
    type: 'orgas' | 'custom' | 'single';
    name?: string;
    permission?: 'none' | 'orgaprice' | 'fullaccess';
    quantity?: number;
    email?: string;
  }[]>([{ type: 'orgas' }]);

  const addBadgeField = () => {
    setFieldCount(fieldCount + 1);
    setFields([...fields, { type: 'orgas' }]);
  }

  return (
    <div className={styles.genbadges}>
      <div className={styles.titleContainer}>
        <Title level={2} gutterBottom={false}>
          Badge Generator
        </Title>
        <div>
          <Button primary onClick={() => addBadgeField()}>
            Ajouter un champ
          </Button>
        </div>
      </div>

      <div className={styles.formContainer}>
        {Array.from(Array(fieldCount).keys()).map((i) => (
            <div key={`field-${i}`} className={styles.field}>

              <Select label="Type" value={fields![i]?.type} onChange={(e) => {
                const newFields = [...fields!];
                newFields[i] = { ...newFields[i], type: e as any };
                setFields(newFields);
              }} options={
                [
                  { label: 'Orgas', value: 'orgas' },
                  { label: 'Custom', value: 'custom' },
                  { label: 'Single orga', value: 'single' },
                ]
              } required />

              {fields![i]?.type === 'custom' && (
                <>
                  <Input label="Nom" value={fields![i]?.name} onChange={(e) => {
                    const newFields = [...fields!];
                    newFields[i] = { ...newFields[i], name: e };
                    setFields(newFields);
                  }} required />
                  <Select label="Permissions" value={fields![i]!.permission ?? ''} onChange={(e) => {
                    const newFields = [...fields!];
                    newFields[i] = { ...newFields[i], permission: e as any};
                    setFields(newFields);
                  }} options={
                    [
                      { label: 'Aucune', value: 'none' },
                      { label: 'Prix Orga', value: 'orgaprice' },
                      { label: 'Full Access', value: 'fullaccess' },
                    ]
                  } required
                  />
                  <Input label="Quantité" type='number' value={fields![i]?.quantity} onChange={(e) => {
                    const newFields = [...fields!];
                    newFields[i] = { ...newFields[i], quantity: parseInt(e) };
                    setFields(newFields);
                  }} required />
                </>
              )}

              {fields![i]?.type === 'single' && (
                <Input label="Email" value={fields![i]?.email} onChange={(e) => {
                  const newFields = [...fields!];
                  newFields[i] = { ...newFields[i], email: e };
                  setFields(newFields);
                }} required />
              )}

              <Button
                primary
                onClick={() => {
                  const newFields = [...fields!];
                  newFields.splice(i, 1);
                  setFields(newFields);
                  setFieldCount(fieldCount - 1);
                }}>
                <Icon name={IconName.Trash} className={styles.trashIcon} />
              </Button>
            </div>
          ))}
      </div>
      <div className={styles.buttonContainer}>
        <Button primary onClick={
          () => {
            generateBadges(fields);
          }
        }>
          Générer les badges
        </Button>
      </div>
    </div>
  );
};

export default GenBadges;