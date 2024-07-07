import { Component, ChangeEvent } from 'react';
import { fetchItems } from '../api';
import SearchInput from '../components/Search/SearchInput';
import SearchButton from '../components/Search/SearchButton';
import SearchResults from '../components/SearchResults/SearchResults';
import './HomePage.css';

class HomePage extends Component {
  savedSearchTerm = localStorage.getItem('searchTerm') || '';
  state = {
    searchTerm: this.savedSearchTerm,
    results: [],
    currentPage: 1,
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
    const { searchTerm } = this.state;
    try {
      const data = await fetchItems(searchTerm.trim());
      this.setState({ results: data.results });
      localStorage.setItem('searchTerm', searchTerm.trim());
    } catch (error) {
      console.error('Search failed', error);
    }
  };

  render() {
    const { searchTerm, results } = this.state;
    return (
      <div className="home">
        <div>
          <SearchInput value={searchTerm} onChange={this.handleInputChange} />
          <SearchButton onClick={this.handleSearchClick} />
        </div>
        <div>
          <SearchResults results={results} />
        </div>
      </div>
    );
  }
}

export default HomePage;
