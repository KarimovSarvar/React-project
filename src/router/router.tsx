import HomePage from '../pages/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Details } from '../components/Details/Details';
import { ErrorPage } from '../components/ErrorPage/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'details/:id',
        element: <Details />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
