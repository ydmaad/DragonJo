import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthPage from '../pages/AuthPage/AuthPage';
import ForgotPage from '../pages/ForgotPage/ForgotPage';

export default function ProtectedRoute({ isLoggedInRequired, children }) {
  const { isLoggedIn } = useSelector((state) => state.user.userInfo);

  if (isLoggedInRequired && !isLoggedIn) {
    Swal.fire({
      icon: 'error',
      title: '로그인이 필요합니다'
    });
    return <Navigate to="/auth" replace />;
  }

  if (!isLoggedInRequired && isLoggedIn) {
    if (children.type === AuthPage || children.type === ForgotPage) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
