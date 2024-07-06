import { Component, ChangeEvent } from 'react';

interface Props {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

class SearchInput extends Component<Props> {
  render() {
    return (
      <input
        type="text"
        value={this.props.value}
        onChange={this.props.onChange}
        placeholder="Search..."
      />
    );
  }
}

export default SearchInput;
