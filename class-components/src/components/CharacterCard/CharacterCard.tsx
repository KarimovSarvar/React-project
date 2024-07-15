import React from 'react';
import type { CharacterCard } from '../../types/SearchResults';
import './CharacterCard.css';

interface CharacterCardAction extends CharacterCard {
  onClick: () => void;
}

const CharacterCardTemplate: React.FC<CharacterCardAction> = ({
  name,
  height,
  mass,
  hair_color,
  skin_color,
  eye_color,
  birth_year,
  gender,
  onClick,
}) => {
  return (
    <div className="card" onClick={onClick} role="button" tabIndex={0}>
      <h1>{name}</h1>
      <p>
        <span className="label">Height:</span> {height} cm
      </p>
      <p>
        <span className="label">Mass:</span> {mass} kg
      </p>
      <p>
        <span className="label">Hair Color:</span> {hair_color}
      </p>
      <p>
        <span className="label">Skin Color:</span> {skin_color}
      </p>
      <p>
        <span className="label">Eye Color:</span> {eye_color}
      </p>
      <p>
        <span className="label">Birth Year:</span> {birth_year}
      </p>
      <p>
        <span className="label">Gender:</span> {gender}
      </p>
    </div>
  );
};

export default CharacterCardTemplate;
