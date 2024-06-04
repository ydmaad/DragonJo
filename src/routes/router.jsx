import { createBrowserRouter } from 'react-router-dom/dist';
import Layout from '../layouts/Layout';
import AuthPage from '../pages/AuthPage/AuthPage';
import DetailPage from '../pages/DetailPage/DetailPage';
import EditPostPage from '../pages/EditPostPage/EditPostPage';
import ForgotPage from '../pages/ForgotPage/ForgotPage';
import HomePage from '../pages/HomePage/HomePage';
import Mypage from '../pages/Mypage/Mypage';
import ResetPage from '../pages/ResetPage/ResetPage';
import WritePostPage from '../pages/WritePostPage/WritePostPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/auth',
        element: <AuthPage />
      },
      {
        path: '/forgot-password',
        element: <ForgotPage />
      },
      {
        path: '/reset-password',
        element: <ResetPage />
      },
      {
        path: '/write',
        element: <WritePostPage />
      },
      {
        path: '/edit/:id',
        element: <EditPostPage />
      },
      {
        path: '/mypage',
        element: <Mypage />
      },
      {
        path: '/detail/:id',
        element: <DetailPage />
      }
    ]
  }
]);

export default router;
