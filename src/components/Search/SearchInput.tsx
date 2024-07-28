import { ChangeEvent } from 'react';
import './Search.css';
import { useTheme } from '@/theme/ThemeContext';

interface Props {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<Props> = ({ value, onChange }) => {
  const { theme } = useTheme();
  return (
    <input
      type="text"
      className={`input ${theme}`}
      value={value}
      onChange={onChange}
      placeholder="Search..."
    />
  );
};

export default SearchInput;
