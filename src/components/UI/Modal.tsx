import { ReactNode } from 'react';
import Button from './Button';
import Divider from './Divider';
import { KeyboardEvent } from 'react';

/**
 * Displays a modal window
 * @param title Modal window title
 * @param children Modal window content
 * @param buttons Modal window buttons. The default value is two buttons : "Annuler" and "Ok"
 * @param visible Whether the modal window is visible or not
 * @param closable Whether the modal window is closable or not
 * @param onCancel Function called when the user clicks on "Annuler" default button,
 * or outside the modal, or on the close button
 * @param onOk Function called when the user clicks on "Ok" default button
 * @param className Class of the modal
 * @param containerClassName Class of the container
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
  title?: ReactNode;
  children?: ReactNode;
  buttons?: ReactNode;
  visible: boolean;
  closable?: boolean;
  onCancel: () => void;
  onOk?: () => void;
  className?: string;
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

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className={`modal ${visible ? 'active' : ''} ${className}`} onKeyDown={handleKeyDown}>
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
