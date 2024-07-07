import { Component } from 'react';
import HomePage from './pages/HomePage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ErrorButton from './components/ErrorBoundary/ErrorButton';
import './App.css';

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <HomePage />
        <ErrorButton />
      </ErrorBoundary>
    );
  }
}

export default App;
