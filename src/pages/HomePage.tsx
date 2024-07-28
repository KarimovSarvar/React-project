import { ChangeEvent, useState } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/hooks/hooks';
import { useSearchItemsQuery } from '../api';
import SearchInput from '../components/Search/SearchInput';
import SearchButton from '../components/Search/SearchButton';
import SearchResults from '../components/SearchResults/SearchResults';
import Loader from '../components/Loader/Loader';
import Pagination from '../components/Pagination/Pagination';
import ToggleButton from '@/components/ToggleButton/ToggleButton';
import Flyout from '@/components/Flyout/Flyout';
import useLocalStorage from '../hooks/useLocalStorage';
import { useTheme } from '@/theme/ThemeContext';
import './HomePage.css';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = useAppSelector((state) => state.page);
  const { theme, toggleTheme } = useTheme();

  const { data, isLoading } = useSearchItemsQuery({
    searchTerm: searchTerm,
    page: currentPage,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue((prev) => (prev = event.target.value));
  };

  const handleSearchClick = () => {
    setSearchTerm(searchInputValue);
    setSearchParams({ page: '1', search: searchTerm });
  };

  return (
    <div className={`home ${theme}`}>
      <header className="home-header">
        <ToggleButton />
      </header>
      <main className="home-main">
        <div className="search-bar">
          <SearchInput value={searchInputValue} onChange={handleInputChange} />
          <SearchButton onClick={handleSearchClick} />
        </div>
        <div className="results-section">
          <SearchResults results={data?.results || []} />
        </div>
        <div className="pagination-section">
          {isLoading ? <Loader /> : <Pagination />}
        </div>
        <div>
          <Flyout />
        </div>
      </main>
      <Outlet />
    </div>
  );
};

export default HomePage;
