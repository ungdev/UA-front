'use client';
import styles from './Modal.module.scss';
import { ReactNode, useEffect } from 'react';
import Button from '@/components/UI/Button';
import Divider from '@/components/UI/Divider';

/**
 * Displays a modal window.
 */
const Modal = ({
  title = '',
  children = '',
  buttons = '',
  visible = false,
  closable = true,
  onCancel = () => {},
  onOk = () => {},
  className = '',
  containerClassName = '',
}: {
  /** Modal window title */
  title?: ReactNode;
  /** Modal window content */
  children?: ReactNode;
  /** Modal window buttons. The default value is two buttons : "Annuler" and "Ok" */
  buttons?: ReactNode;
  /** Whether the modal window is visible or not */
  visible: boolean;
  /** Whether the modal window is closable or not */
  closable?: boolean;
  /** Function called when the user clicks on "Annuler" default button,
   * or outside the modal, or on the close button */
  onCancel: () => void;
  /** Function called when the user clicks on "Ok" default button */
  onOk?: () => void;
  /** An optional class name to add to the modal */
  className?: string;
  /** An optional class name to add to the modal container */
  containerClassName?: string;
}) => {
  const buttonsContent =
    buttons !== '' ? (
      buttons
    ) : (
      <>
        <Button onClick={onCancel} onLightBackground>
          Annuler
        </Button>
        <Button onClick={onOk} primary className={styles.okButton}>
          Ok
        </Button>
      </>
    );

  useEffect(() => {
    let listener;
    if (visible) {
      listener = window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          onCancel();
        }
      });
    }
    window.removeEventListener('keydown', listener as any);
  }, [visible]);

  return (
    <div className={`${styles.modal} ${visible ? styles.active : ''} ${className}`}>
      <div className={styles.modalOverflow}>
        <div className={styles.modalOverlay} onClick={() => closable && onCancel()} />

        <div className={`${styles.modalContainer} ${containerClassName}`}>
          <div className={styles.modalTitle}>{title}</div>

          {closable && (
            <div className={styles.modalCloseButton} onClick={onCancel}>
              <span />
              <span />
            </div>
          )}

          <div className={styles.modalContent}>{children}</div>
          {buttonsContent && <div className={styles.modalButtons}>{buttonsContent}</div>}
          <Divider className={styles.divider} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
