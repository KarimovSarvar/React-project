import { Component, ChangeEvent } from 'react';
import { fetchItems } from '../api';
import SearchInput from '../components/Search/SearchInput';
import SearchButton from '../components/Search/SearchButton';
import SearchResults from '../components/SearchResults/SearchResults';
import Loader from '../components/Loader/Loader';
import './HomePage.css';

class HomePage extends Component {
  savedSearchTerm = localStorage.getItem('searchTerm') || '';
  state = {
    searchTerm: this.savedSearchTerm,
    results: [],
    loading: false,
  };

  componentDidMount() {
    this.performSearch();
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearchClick = () => {
    this.performSearch();
  };

  performSearch = async () => {
    this.setState({ loading: true });
    const { searchTerm } = this.state;
    try {
      const data = await fetchItems(searchTerm.trim());
      this.setState({ results: data.results, loading: false });
      localStorage.setItem('searchTerm', searchTerm.trim());
    } catch (error) {
      console.error('Search failed', error);
      this.setState({ loading: false });
    }
  };

  render() {
    const { searchTerm, results, loading } = this.state;
    return (
      <div className="home">
        <div>
          <SearchInput value={searchTerm} onChange={this.handleInputChange} />
          <SearchButton onClick={this.handleSearchClick} />
        </div>
        <div>{loading ? <Loader /> : <SearchResults results={results} />}</div>
      </div>
    );
  }
}

export default HomePage;
