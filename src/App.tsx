import { Provider } from 'react-redux';
import AppRouter from './router/router';
import { store } from './store/store';
import { ThemeProvider } from './theme/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
