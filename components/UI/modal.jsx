import React from 'react';
import PropTypes from 'prop-types';

import Button from './button';
import './modal.css';

const Modal = (props) => {
  const footer = props.footer !== ''
    ? props.footer
    : (
      <>
        <Button onClick={props.onCancel}>Annuler</Button>
        <Button onClick={props.onOk} primary>Ok</Button>
      </>
    );

  return (
    <div className={props.className}>
      <div className={`modal ${props.visible ? 'active' : ''}`}>
        <div className="modal-overlay" onClick={() => props.closable && props.onCancel()} />

        <div className="modal-container">
          <div className="modal-title">{props.title}</div>

          {props.closable && (
            <div className="modal-close-button" onClick={props.onCancel}>
              <span />
              <span />
            </div>
          )}
          <div className="modal-content">{props.children}</div>
          <div className="modal-footer">{footer}</div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.node.isRequired,

  children: PropTypes.node.isRequired,

  footer: PropTypes.node,

  closable: PropTypes.bool,

  visible: PropTypes.bool.isRequired,

  onCancel: PropTypes.func,

  onOk: PropTypes.func, // eslint-disable-line react/no-unused-prop-types

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