import { ChangeEvent, useState } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
import { useSearchItemsQuery } from '../api';
import SearchInput from '../components/Search/SearchInput';
import SearchButton from '../components/Search/SearchButton';
import SearchResults from '../components/SearchResults/SearchResults';
import Loader from '../components/Loader/Loader';
import Pagination from '../components/Pagination/Pagination';
import useLocalStorage from '../hooks/useLocalStorage';
import './HomePage.css';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

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

  const toThePrevPage = () => {
    if (currentPage > 1) {
      setSearchParams({
        page: (currentPage - 1).toString(),
        search: searchTerm,
      });
    }
  };

  const toTheNextPage = () => {
    setSearchParams({ page: (currentPage + 1).toString(), search: searchTerm });
  };

  return (
    <div className="home">
      <div>
        <SearchInput value={searchInputValue} onChange={handleInputChange} />
        <SearchButton onClick={handleSearchClick} />
      </div>
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <SearchResults results={data?.results || []} />
        )}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <Pagination
          currentPage={currentPage}
          toThePrevPage={toThePrevPage}
          toTheNextPage={toTheNextPage}
        />
      )}
      <Outlet />
    </div>
  );
};

export default HomePage;
