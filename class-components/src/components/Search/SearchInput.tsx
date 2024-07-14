import React, { ChangeEvent } from 'react';
import './Search.css';

interface Props {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="input"
      value={value}
      onChange={onChange}
      placeholder="Search..."
    />
  );
};

export default SearchInput;
