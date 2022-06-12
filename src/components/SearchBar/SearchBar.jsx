import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import PropTypes from 'prop-types';

export default function SearchBar({ onSubmit }) {
  const [input, setInput] = useState('');

  const handleChange = event => {
    const { value } = event.target;
    setInput(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (input.trim() === '') {
      return alert('Please specify tour search');
    }
    onSubmit(input);
    setInput('');
  };

  return (
    <header className={styles.searchBar}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <button type="submit" className={styles.searchFormButton}>
          <span className="material-symbols-outlined">search</span>
        </button>
        <input
          onChange={handleChange}
          value={input}
          className={styles.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus="on"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
