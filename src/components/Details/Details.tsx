import { useEffect, useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useSearchItemQuery } from '@/api';
import { useTheme } from '@/theme/ThemeContext';
import Loader from '../Loader/Loader';
import './Details.css';

export function Details() {
  const { theme } = useTheme();
  const { id } = useParams<{ id: string }>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data: item, error, isLoading } = useSearchItemQuery(id || '');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const search = searchParams.get('search') || '';

  const handleCloseButton = () => {
    navigate(`/?page=${currentPage}&search=${search}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      handleCloseButton();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="close_handler" onClick={() => handleClickOutside} />
      <section ref={wrapperRef} className={`wrapper ${theme}`}>
        {isLoading ? (
          <Loader />
        ) : item ? (
          <>
            <h2 className="title">{item.name}</h2>
            <p>Height: {item.height}</p>
            <p>Mass: {item.mass}</p>
            <p>Hair color: {item.hair_color}</p>
            <p>Skin color: {item.skin_color}</p>
            <p>Eye color: {item.eye_color}</p>
            <p>Birth year: {item.birth_year}</p>
            <p>Gender: {item.gender}</p>
            <button onClick={handleCloseButton} className="button">
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
