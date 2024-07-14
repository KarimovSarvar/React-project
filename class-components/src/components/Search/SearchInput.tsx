import { Component, ChangeEvent } from 'react';
import './Search.css';

interface Props {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

class SearchInput extends Component<Props> {
  render() {
    return (
      <input
        className="input"
        type="text"
        value={this.props.value}
        onChange={this.props.onChange}
        placeholder="Search..."
      />
    );
  }
}

export default SearchInput;
