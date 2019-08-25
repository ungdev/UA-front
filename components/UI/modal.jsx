import React from 'react';
import PropTypes from 'prop-types';

import Button from './button';
import './modal.css';

const Modal = (props) => {
  const footer = typeof props.footer === 'object' ? props.footer : props.footer(props);

  return (
    <div className={props.className}>
      <div className={`modal ${props.visible ? 'active' : ''}`}>
        <div className="modal-overlay" onClick={props.onCancel} />

        <div className="modal-container">
          <div className="modal-title">{props.title}</div>
          <div className="modal-content">{props.children}</div>
          <div className="modal-footer">{footer}</div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,

  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,

  footer: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]),

  className: PropTypes.string,

  visible: PropTypes.bool.isRequired,

  onCancel: PropTypes.func.isRequired,

  onOk: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
};

Modal.defaultProps = {
  footer: (props) => (
    <>
      <Button onClick={props.onCancel}>Annuler</Button>
      <Button onClick={props.onOk} primary>Ok</Button>
    </>
  ),

  className: '',

  onOk: () => {},
};

export default Modal;