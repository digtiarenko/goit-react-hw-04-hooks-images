import styles from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

const modalRoot = document.getElementById('modal-root');

function Modal({ src, onClick }) {
  const handleCloseModal = event => {
    if (event.target === event.currentTarget) {
      onClick();
    }
  };

  useEffect(() => {
    const handleKeydown = event => {
      if (event.code === 'Escape') {
        onClick();
      }
    };
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  return createPortal(
    <div
      className={styles.overlay}
      onKeyPress={handleCloseModal}
      onClick={handleCloseModal}
    >
      <div className={styles.modal}>
        <img src={src} alt="" />
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
};

export default Modal;
