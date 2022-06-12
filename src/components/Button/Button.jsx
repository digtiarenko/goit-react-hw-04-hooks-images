import PropTypes from 'prop-types';
import styles from './Button.module.css';
import React, { useRef, useEffect } from 'react';

function Button({ onClick }) {
  const btnRef = useRef(null);

  useEffect(() => {
    btnRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={() => {
        onClick();
      }}
      className={styles.button}
      type="button"
    >
      {' '}
      Load more{' '}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
