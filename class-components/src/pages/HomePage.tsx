import { useState, useEffect, ChangeEvent } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
import { searchItems } from '../api';
import SearchInput from '../components/Search/SearchInput';
import SearchButton from '../components/Search/SearchButton';
import SearchResults from '../components/SearchResults/SearchResults';
import Loader from '../components/Loader/Loader';
import Pagination from '../components/Pagination/Pagination';
import useLocalStorage from '../hooks/useLocalStorage';
import './HomePage.css';
import type { CharacterCard } from '../types/SearchResults';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [results, setResults] = useState<CharacterCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    performSearch();
  }, [currentPage, searchTerm]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    setSearchParams({ page: '1', search: searchTerm });
  };

  const performSearch = async () => {
    setLoading(true);
    console.log(currentPage, searchTerm);
    try {
      const data = await searchItems(searchTerm.trim(), currentPage);
      if (data) {
        setResults(data.results);
      }
    } catch (error) {
      console.error('Search failed', error);
    } finally {
      setLoading(false);
    }
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
        <SearchInput value={searchTerm} onChange={handleInputChange} />
        <SearchButton onClick={handleSearchClick} />
      </div>
      <div>{loading ? <Loader /> : <SearchResults results={results} />}</div>
      <Pagination
        currentPage={currentPage}
        toThePrevPage={toThePrevPage}
        toTheNextPage={toTheNextPage}
      />
      <Outlet /> {}
    </div>
  );
};

export default HomePage;
