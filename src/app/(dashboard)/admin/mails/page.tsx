'use client';
import styles from './style.module.scss';
import { useState } from 'react';

import { Button, Checkbox, Input, Select, Textarea, Title } from '@/components/UI';
import { animated, useTransition } from '@react-spring/web';
import { sendCustomMail, sendGeneralMails } from '@/modules/admin';
import generalMailImg from '@/../public/images/mails/generalmail.webp';
import focusedMailImg from '@/../public/images/mails/focusedmail.webp';
import customMailImg from '@/../public/images/mails/custommail.webp';

const Mails = () => {
  const [step, setStep] = useState(1);
  const [mailContent, setMailContent] = useState<string>('joindiscord');
  const [preview, setPreview] = useState<boolean>(false);
  
  // États pour le mail custom
  const [subject, setSubject] = useState<string>('');
  const [highlightTitle, setHighlightTitle] = useState<string>('');
  const [highlightIntro, setHighlightIntro] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [emails, setEmails] = useState<string>('');
  const [sections, setSections] = useState<Array<{ title: string; components: string }>>([
    { title: '', components: '' }
  ]);

  const transitions = useTransition(step, {
    from: { opacity: 0, transform: `translate3d(100%,0,0)` },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { position: 'absolute', display: 'none' },
    config: {
      duration: 250,
    },
  });

  const MailCard = ({ title, onClick, imgSrc }: { title: string; onClick: () => void; imgSrc: string }) => {
    return (
      <div className={styles.card} onClick={onClick}>
        <img src={imgSrc} alt={title + '  background'} loading="lazy" />
        <p>{title}</p>
      </div>
    );
  };

  const Step1 = (
    <>
      <div className={styles.cardContainer}>
        <MailCard
          title="Mail Général"
          onClick={() => {
            setStep(step + 1);
          }}
          imgSrc={generalMailImg.src}
        />
        <MailCard
          title="Mail Ciblé"
          onClick={() => {
            setStep(step + 2);
          }}
          imgSrc={focusedMailImg.src}
        />
        <MailCard
          title="Mail Custom"
          onClick={() => {
            setStep(step + 3);
          }}
          imgSrc={customMailImg.src}
        />
      </div>
    </>
  );

  const General = (
    <>
      <div className={styles.generalMail}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendGeneralMails(mailContent, preview);
          }}>
          <Select
            label="Type de mail"
            value={mailContent !== null ? mailContent : ''}
            onChange={setMailContent}
            options={[
              { label: 'Rejoindre le Discord', value: 'joindiscord' },
              { label: 'Autorisation parental', value: 'minor' },
              { label: 'Joueur non payés', value: 'notpaid' },
              // { label: 'Joueur non payés SSBU', value: 'notpaidssbu' },
              { label: 'Tickets', value: 'tickets' },
            ]}
            required
          />
          <Checkbox
            className={styles.mailCheckbox}
            key="preview"
            label="Preview"
            value={preview}
            onChange={setPreview}
          />
          <div className={styles.buttonContainer}>
            <Button primary type="submit">
              Envoyer les mail
            </Button>
          </div>
        </form>
      </div>
    </>
  );

  const Focused = (
    <>
      <div className="">
        {/*
        <Input label="Utilisateurs" value="" required />
        <Select
          label="Template de mail"
          value={mailTemplate !== null ? mailTemplate : ''}
          onChange={setMailTemplate}
          options={[{ label: 'TKT bb', value: 'tktbb' }]}
          required
        />
        */}
        <Title>Cette features n'est pas encore disponible</Title>
      </div>
    </>
  );

  const addSection = () => {
    setSections([...sections, { title: '', components: '' }]);
  };

  const updateSection = (index: number, field: 'title' | 'components', value: string) => {
    const newSections = [...sections];
    newSections[index][field] = value;
    setSections(newSections);
  };

  const removeSection = (index: number) => {
    if (sections.length > 1) {
      const newSections = sections.filter((_, i) => i !== index);
      setSections(newSections);
    }
  };

  const Custom = (
    <>
      <div className={styles.customMail}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              // Convertir les sections en format attendu par l'API
              const formattedContent = sections.map((section) => ({
                title: section.title,
                components: [section.components],
              }));

              await sendCustomMail(
                subject,
                { title: highlightTitle, intro: highlightIntro },
                formattedContent,
                emails,
                reason,
                preview
              );

              if (!preview) {
                // Reset form après envoi réussi
                setSubject('');
                setHighlightTitle('');
                setHighlightIntro('');
                setReason('');
                setEmails('');
                setSections([{ title: '', components: '' }]);
                setStep(1);
              }
            } catch (error) {
              console.error('Erreur lors de l\'envoi du mail custom:', error);
            }
          }}>
          
          <Input 
            label="Sujet du mail" 
            value={subject} 
            onChange={setSubject} 
            required 
          />

          <Textarea 
            label="Adresses email des destinataires (si laissé vide, envoie à tous les utilisateurs)" 
            value={emails} 
            onChange={setEmails}
            placeholder="Séparez les emails par des virgules ou des retours à la ligne&#10;Ex: email1@example.com, email2@example.com&#10;ou&#10;email1@example.com&#10;email2@example.com"
          />
          
          <Input 
            label="Titre principal (highlight)" 
            value={highlightTitle} 
            onChange={setHighlightTitle} 
            required 
          />
          
          <Textarea 
            label="Introduction (sous le titre)" 
            value={highlightIntro} 
            onChange={setHighlightIntro} 
          />

          <div className={styles.sectionsContainer}>
            <h3>Sections du mail</h3>
            {sections.map((section, index) => (
              <div key={index} className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                  <h4>Section {index + 1}</h4>
                  {sections.length > 1 && (
                    <Button 
                      type="button" 
                      onClick={() => removeSection(index)}
                      className={styles.removeButton}
                    >
                      Supprimer
                    </Button>
                  )}
                </div>
                
                <Input 
                  label="Titre de la section" 
                  value={section.title} 
                  onChange={(value) => updateSection(index, 'title', value)}
                  required 
                />
                
                <Textarea 
                  label="Contenu de la section" 
                  value={section.components} 
                  onChange={(value) => updateSection(index, 'components', value)}
                  placeholder="Vous pouvez utiliser du HTML basique (ex: <strong>, <em>, <a href=''>, etc.)"
                />
              </div>
            ))}
            
            <Button 
              type="button" 
              onClick={addSection}
              className={styles.addSectionButton}
            >
              Ajouter une section
            </Button>
          </div>

          <Textarea 
            label="Raison d'envoi" 
            value={reason} 
            onChange={setReason}
            placeholder="Ex: Information importante concernant votre inscription"
          />
          
          <Checkbox
            className={styles.mailCheckbox}
            label="Mode preview (envoi uniquement à moi)"
            value={preview}
            onChange={setPreview}
          />
          
          <div className={styles.buttonContainer}>
            <Button primary type="submit">
              {preview ? 'Envoyer le preview' : 'Envoyer les mails'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );

  const renderSwitch = (param: number) => {
    switch (param) {
      case 1:
        return Step1;
      case 2:
        return General;
      case 3:
        return Focused;
      case 4:
        return Custom;
      default:
        break;
    }
  };

  const backButton = () => {
    if (step > 1) {
      return (
        <Button primary onClick={() => setStep(step === 2 ? step - 1 : step === 3 ? step - 2 : step - 3)}>
          {'Retour'}
        </Button>
      );
    }
  };

  const Stepper = () => {
    return (
      <>
        <div className={styles.stepsHeader}>
          <Title level={2} type={1} align="center">
            ENVOIE DE MAILS
          </Title>
        </div>

        {transitions(
          (style, item) =>
            item && (
              <animated.div style={style}>
                <div className={styles.stepContainer}>{renderSwitch(step)}</div>
              </animated.div>
            ),
        )}

        {backButton()}
      </>
    );
  };

  return (
    <div id="dashboard-register" className={styles.dashboardMail}>
      {Stepper()}
    </div>
  );
};

export default Mails;
