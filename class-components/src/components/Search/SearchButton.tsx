import { Component } from 'react';

interface Props {
  onClick: () => void;
}

class SearchButton extends Component<Props> {
  render() {
    return <button onClick={this.props.onClick}>Search</button>;
  }
}

export default SearchButton;
