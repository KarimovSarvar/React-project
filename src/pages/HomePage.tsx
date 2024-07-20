import { ChangeEvent } from 'react';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const { data, isLoading } = useSearchItemsQuery({
    searchTerm: searchTerm,
    page: currentPage,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    setSearchParams({ page: '1', search: searchTerm });
  };

  const toThePrevPage = () => {
    if (currentPage > 1) {
      console.log('data:', data);
      console.log(isLoading);
      setSearchParams({
        page: (currentPage - 1).toString(),
        search: searchTerm,
      });
    }
  };

  const toTheNextPage = () => {
    console.log('data:', data);
    console.log(isLoading);
    setSearchParams({ page: (currentPage + 1).toString(), search: searchTerm });
  };

  return (
    <div className="home">
      <div>
        <SearchInput value={searchTerm} onChange={handleInputChange} />
        <SearchButton onClick={handleSearchClick} />
      </div>
      <div>
        {isLoading ? <Loader /> : <SearchResults results={data?.results} />}
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
