'use client';
import { ReactNode, useEffect } from 'react';
import Button from './Button';
import Divider from './Divider';

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
        <Button onClick={onCancel}>Annuler</Button>
        <Button onClick={onOk} primary className="ok-button">
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
    <div className={`modal ${visible ? 'active' : ''} ${className}`}>
      <div className="modal-overflow">
        <div className="modal-overlay" onClick={() => closable && onCancel()} />

        <div className={`modal-container ${containerClassName}`}>
          <div className="modal-title">{title}</div>

          {closable && (
            <div className="modal-close-button" onClick={onCancel}>
              <span />
              <span />
            </div>
          )}

          <div className="modal-content">{children}</div>
          {buttonsContent && <div className="modal-buttons">{buttonsContent}</div>}
          <Divider />
        </div>
      </div>
    </div>
  );
};

export default Modal;
