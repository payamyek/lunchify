import { createBrowserRouter } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout';
import Home from '../pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [{ path: '', element: <Home /> }],
  },
]);
