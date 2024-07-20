import { Provider } from 'react-redux';
import AppRouter from './router/router';
import { store } from './store/store';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ErrorButton from './components/ErrorBoundary/ErrorButton';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <AppRouter />
        <ErrorButton />
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
