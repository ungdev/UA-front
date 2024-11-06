'use client';
import styles from './style.module.scss';
import { useState } from 'react';

import { useAppDispatch } from '@/lib/hooks';
import Mail from '@types';
import { MailType } from '@/types';
import { Button, Title } from '@/components/UI';
import { animated, useTransition } from '@react-spring/web';
import generalMailImg from '@/../public/images/mails/generalmail.webp';
import focusedMailImg from '@/../public/images/mails/focusedmail.webp';
import customMailImg from '@/../public/images/mails/custommail.webp';

const Mails = () => {
  const dispatch = useAppDispatch();

  const [step, setStep] = useState(1);
  const [mailType, setMailType] = useState<MailType>();

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
            setMailType(MailType.general);
            setStep(step + 1);
          }}
          imgSrc={generalMailImg.src}
        />
        <MailCard
          title="Mail Ciblé"
          onClick={() => {
            setMailType(MailType.focused);
            setStep(step + 1);
          }}
          imgSrc={focusedMailImg.src}
        />
        <MailCard
          title="Mail Custom"
          onClick={() => {
            setMailType(MailType.custom);
            setStep(step + 1);
          }}
          imgSrc={customMailImg.src}
        />
      </div>
    </>
  );

  const renderSwitch = (param: number) => {
    switch (param) {
      case 1:
        return Step1;
      case 2:
        return Step2;
      case 3:
        return Step3;
      case 4:
        return Step4;
      case 5:
        return Step5;
      default:
        break;
    }
  };

  const backButton = () => {
    if (step > 1) {
      return (
        <Button primary onClick={() => setStep(step - 1)}>
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
          <ul className={styles.steps}>
            <li className={styles.active}></li>
            <li className={step > 1 ? styles.active : ``}></li>
            <li className={step > 2 ? styles.active : ``}></li>
            <li className={step > 3 ? styles.active : ``}></li>
            <li className={step > 4 ? styles.active : ``}></li>
          </ul>
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
    <div id="dashboard-register" className={styles.dashboardRegister}>
      {Stepper()}
    </div>
  );
};

export default Mails;
