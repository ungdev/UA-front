import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import './Modal.css';

/**
 * Displays a modal window
 */
const Modal = ({ title, children, footer, closable, visible, onCancel, onOk, className }) => {
  const footerContent = footer !== ''
    ? footer
    : (
      <>
        <Button onClick={onCancel}>Annuler</Button>
        <Button onClick={onOk} primary>Ok</Button>
      </>
    );

  return (
    <div className={className}>
      <div className={`modal ${visible ? 'active' : ''}`}>
        <div className="modal-overlay" onClick={() => closable && onCancel()} />

        <div className="modal-container">
          <div className="modal-title">{title}</div>

          {closable && (
            <div className="modal-close-button" onClick={onCancel}>
              <span />
              <span />
            </div>
          )}
          <div className="modal-content">{children}</div>
          <div className="modal-footer">{footerContent}</div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  /**
   * The modal window title
   */
  title: PropTypes.node.isRequired,

  /**
   * The modal window content
   */
  children: PropTypes.node.isRequired,

  /**
   * The modal footer content. Default value is two buttons : "Annuler" and "Ok"
   */
  footer: PropTypes.node,

  /**
   * Whether the modal window is closable or not
   * by clicking on the close button or outside the modal window
   */
  closable: PropTypes.bool,

  /**
   * Whether the modal window is visible or not
   */
  visible: PropTypes.bool.isRequired,

  /**
   * Function called when the user clicks on "Annuler" default button,
   * or outside the modal, or on the close button
   */
  onCancel: PropTypes.func,

  /**
   * Function called when the user clicks on "Ok" default button
   */
  onOk: PropTypes.func, // eslint-disable-line react/no-unused-prop-types

  /**
   * The class of the modal container
   */
  className: PropTypes.string,
};

Modal.defaultProps = {
  footer: '',
  closable: true,
  onCancel: () => {},
  onOk: () => {},
  className: '',
};

export default Modal;