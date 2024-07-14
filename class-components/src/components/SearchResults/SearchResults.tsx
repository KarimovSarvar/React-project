import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { CharacterCard } from '../../types/SearchResults';
import CharacterCardTemplate from '../CharacterCard/CharacterCard';
import './SearchResults.css';

interface Props {
  results: CharacterCard[];
}

const SearchResults: React.FC<Props> = ({ results }) => {
  const navigate = useNavigate();

  const handleClick = (url: string) => {
    const id = url.split('/').slice(-2, -1)[0];
    console.log(id);
    navigate(`/details/${id}`);
  };

  return (
    <div className="results">
      {results.map((result) => (
        <CharacterCardTemplate
          key={result.url}
          name={result.name}
          height={result.height}
          mass={result.mass}
          hair_color={result.hair_color}
          skin_color={result.skin_color}
          eye_color={result.eye_color}
          birth_year={result.birth_year}
          gender={result.gender}
          onClick={() => handleClick(result.url)}
          url={''}
        />
      ))}
    </div>
  );
};

export default SearchResults;
