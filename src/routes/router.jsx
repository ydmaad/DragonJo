import { createBrowserRouter } from 'react-router-dom/dist';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../layouts/Layout';
import AuthPage from '../pages/AuthPage/AuthPage';
import DetailPage from '../pages/DetailPage/DetailPage';
import EditPostPage from '../pages/EditPostPage/EditPostPage';
import ForgotPage from '../pages/ForgotPage/ForgotPage';
import HomePage from '../pages/HomePage/HomePage';
import Mypage from '../pages/Mypage/Mypage';
import ResetPage from '../pages/ResetPage/ResetPage';
import WritePostPage from '../pages/WritePostPage/WritePostPage';

const pages = [
  {
    path: '/',
    element: <HomePage />,
    isLoggedInRequired: false
  },
  {
    path: '/auth',
    element: <AuthPage />,
    isLoggedInRequired: false
  },
  {
    path: '/forgot-password',
    element: <ForgotPage />,
    isLoggedInRequired: false
  },
  {
    path: '/reset-password',
    element: <ResetPage />,
    isLoggedInRequired: false
  },
  {
    path: '/detail/:id',
    element: <DetailPage />,
    isLoggedInRequired: false
  },
  {
    path: '/write',
    element: <WritePostPage />,
    isLoggedInRequired: true
  },
  {
    path: '/edit/:id',
    element: <EditPostPage />,
    isLoggedInRequired: true
  },
  {
    path: '/mypage',
    element: <Mypage />,
    isLoggedInRequired: true
  }
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: pages.map((page) => ({
      path: page.path,
      element: <ProtectedRoute isLoggedInRequired={page.isLoggedInRequired}>{page.element}</ProtectedRoute>
    }))
  }
]);
export default router;
