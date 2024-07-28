import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { toggleItem } from '@/slices/SelectedItemsSlice';
import type { CharacterCard } from '../../types/SearchResults';
import CharacterCardTemplate from '../CharacterCard/CharacterCard';
import './SearchResults.css';

interface Props {
  results: CharacterCard[];
}

const SearchResults: React.FC<Props> = ({ results }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const currentPage = useAppSelector((state) => state.page);
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(
    (state) => state.selectedItems.selectedItems,
  );

  const handleClick = (url: string) => {
    const id = url.split('/').slice(-2, -1)[0];
    navigate(`/details/${id}?page=${currentPage}&search=${search}`);
  };

  const handleCheckboxChange = (item: CharacterCard) => {
    dispatch(toggleItem(item));
  };

  return (
    <div className="results">
      {results.length > 0 &&
        results.map((result) => (
          <div key={result.url}>
            <CharacterCardTemplate
              name={result.name}
              height={result.height}
              mass={result.mass}
              hair_color={result.hair_color}
              skin_color={result.skin_color}
              eye_color={result.eye_color}
              birth_year={result.birth_year}
              gender={result.gender}
              onClick={() => handleClick(result.url)}
            />
            <label htmlFor={`cardCheck-${result.url}`}>
              <input
                type="checkbox"
                id={`cardCheck-${result.url}`}
                checked={!!selectedItems[result.url]}
                onChange={() => handleCheckboxChange(result)}
              />
              Select
            </label>
          </div>
        ))}
    </div>
  );
};

export default SearchResults;
