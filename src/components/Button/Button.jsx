import PropTypes from 'prop-types';
import styles from './Button.module.css';

function Button({ onClick }) {
  return (
    <button
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
