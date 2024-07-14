import AppRouter from './router/router';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ErrorButton from './components/ErrorBoundary/ErrorButton';
import './App.css';

const App = () => {
  return (
    <ErrorBoundary>
      <AppRouter />
      <ErrorButton />
    </ErrorBoundary>
  );
};

export default App;
