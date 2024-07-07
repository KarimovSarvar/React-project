import { Component } from 'react';
import type { CharacterCard } from '../../types/SearchResults';
import CharacterCardTemplate from '../CharacterCard/CharacterCard';
import './SearchResults.css';

interface Props {
  results: CharacterCard[];
}

class SearchResults extends Component<Props> {
  render() {
    return (
      <div className="results">
        {this.props.results.map((result, index) => (
          <CharacterCardTemplate
            key={index}
            name={result.name}
            height={result.height}
            mass={result.mass}
            hair_color={result.hair_color}
            skin_color={result.skin_color}
            eye_color={result.eye_color}
            birth_year={result.birth_year}
            gender={result.gender}
          />
        ))}
      </div>
    );
  }
}

export default SearchResults;
