import { Component } from 'react';

interface Props {
  results: any[];
}

class SearchResults extends Component<Props> {
  render() {
    return (
      <div>
        {this.props.results.map((result, index) => (
          <div key={index}>
            <h3>{result.name}</h3>
            <p>{result.description || 'No description available'}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default SearchResults;
