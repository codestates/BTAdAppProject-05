import {useRoutes} from 'react-router-dom';
import NotFoundPage from '@/pages/NotFoundPage';
import Home from '@/pages/Home';

const Router = () => {
  return useRoutes([
    {
      path: '/',
      children: [
        {
          path: '/home',
          element: <Home />
        }
      ]
    },
    {
      path: '*',
      element: <NotFoundPage />
    }
  ])
}

export default Router;

