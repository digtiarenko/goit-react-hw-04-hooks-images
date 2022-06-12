import { useState, useEffect } from 'react';

import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import * as Api from '../Services/Api';

export default function App() {
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [modalUrl, setModalUrl] = useState('');

  const handleSearchQuery = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setResult([]);
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    const fetchImages = () => {
      setStatus('pending');
      Api.fetchImages({ searchQuery, page })
        .then(hits => handleHits(hits))
        .catch(error => handleError(error));
    };

    fetchImages();
  }, [searchQuery, page]);

  const handleError = error => {
    console.log(error.toString());
    setStatus('error');
  };

  const handleHits = hits => {
    const normalizedHits = hits.map(
      ({ id, webformatURL, largeImageURL, tags }) => ({
        id,
        webformatURL,
        largeImageURL,
        tags,
      }),
    );

    setResult(prevResult => [...prevResult, ...normalizedHits]);
    setStatus('resolved');
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = modalSrc => {
    setModalUrl(modalSrc);
  };

  const closeModal = () => {
    setModalUrl('');
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchQuery} />
      {status === 'error' && <h2> There're no such pics in our database</h2>}
      {result.length > 0 && (
        <ImageGallery pictures={result} onClickImg={openModal} />
      )}
      {status === 'pending' && <Loader />}
      {status === 'resolved' && <Button onClick={handleLoadMore} />}
      {modalUrl && <Modal src={modalUrl} onClick={closeModal} />}
    </div>
  );
}
