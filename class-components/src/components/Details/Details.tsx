import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { searchItem } from '@/api';
import type { CharacterCard } from '@/types/SearchResults';
import Loader from '../Loader/Loader';
import './Details.css';

export function Details() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setLoading] = useState(false);
  const [item, setItem] = useState<CharacterCard>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      const getItem = async () => {
        const result = await searchItem(id);
        setItem(result);
        setLoading(false);
      };

      getItem();
    }
  }, [id]);

  const handleCloseButton = () => {
    navigate(`/`);
  };

  return (
    <>
      <div className="close_handler" onClick={handleCloseButton} />
      <section className="wrapper">
        {!isLoading && item ? (
          <>
            <h2 className="title">{item.name}</h2>
            <p>Height: {item.height}</p>
            <p>Mass: {item.mass}</p>
            <p>Hair color: {item.hair_color}</p>
            <p>Skin color: {item.skin_color}</p>
            <p>Eye color: {item.eye_color}</p>
            <p>Birth year: {item.birth_year}</p>
            <p>Gender: {item.gender}</p>
            <button className="button" onClick={handleCloseButton}>
              Close
            </button>
          </>
        ) : (
          <Loader />
        )}
      </section>
    </>
  );
}
