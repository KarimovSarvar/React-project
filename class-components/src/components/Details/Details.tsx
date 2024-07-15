import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { searchItem } from '@/api';
import type { CharacterCard } from '@/types/SearchResults';
import Loader from '../Loader/Loader';
import { Button } from '../Button/Button';
import './Details.css';

export function Details() {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setLoading] = useState(false);
  const [item, setItem] = useState<CharacterCard>();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const search = searchParams.get('search') || '';

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
    navigate(`/?page=${currentPage}&search=${search}`);
  };

  return (
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
          <Button onClick={handleCloseButton} type="button">
            Close
          </Button>
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
}
