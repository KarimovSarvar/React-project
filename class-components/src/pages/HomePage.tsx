import { Component, ChangeEvent } from 'react';
import { fetchItems } from '../api';
import SearchInput from '../components/Search/SearchInput';
import SearchButton from '../components/Search/SearchButton';
import SearchResults from '../components/SearchResults/SearchResults';
import type { CharacterCard } from '../types/SearchResults';

interface State {
  searchTerm: string;
  results: CharacterCard[];
}

class HomePage extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.state = {
      searchTerm: savedSearchTerm,
      results: [],
    };
  }

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
      <div>
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
