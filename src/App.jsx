import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { useAutoLogout } from './hooks/useAutoLogout';
import { clearUser, setUser } from './redux/slices/user.slice';
import router from './routes/router';
import { logOutUser } from './service/user';
import { getLocalStorageKey } from './utils/localStorage';

function App() {
  const dispatch = useDispatch();
  useAutoLogout();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(getLocalStorageKey()));
    // console.log('userInfo', data);
    if (!data) return;
    const session = {
      access_token: data.access_token,
      expires_at: data.expires_at,
      expires_in: data.expires_in,
      refresh_token: data.refresh_token,
      token_type: data.token_type
    };

    const user = {
      id: data.user.id,
      email: data.user.email,
      user_metadata: {
        avatar_url: data.user.user_metadata.avatar_url,
        user_name: data.user.user_metadata.user_name
      }
    };

    const userInfo = { session, user };

    if (!data) {
      // console.log('데이터 없음');
      logOutUser();
      dispatch(clearUser());
      return;
    }

    dispatch(setUser({ userInfo }));
  }, [dispatch]);

  // return <Router />;
  return <RouterProvider router={router} />;
}

export default App;
