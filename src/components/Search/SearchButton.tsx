import React from 'react';
import './Search.css';

interface Props {
  onClick: () => void;
}

const SearchButton: React.FC<Props> = ({ onClick }) => {
  return <button onClick={onClick}>Search</button>;
};

export default SearchButton;
