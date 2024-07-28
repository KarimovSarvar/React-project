import { useTheme } from '@/theme/ThemeContext';
import './Search.css';

interface Props {
  onClick: () => void;
}

const SearchButton: React.FC<Props> = ({ onClick }) => {
  const { theme } = useTheme();
  return (
    <button onClick={onClick} className={`search-btn ${theme}`}>
      Search
    </button>
  );
};

export default SearchButton;
