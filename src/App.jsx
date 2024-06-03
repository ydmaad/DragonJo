import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { clearUser, setUser } from './redux/slices/user.slice';
import router from './routes/router';
import { supabase } from './service/supabase';
import { logOutUser } from './service/user';

function App() {
  const dispatch = useDispatch();
  const timerRef = useRef(null);

  const autoLogOutHandler = useCallback(
    (refresh_token, expires_at) => {
      const expiresTime = expires_at * 1000;
      const currentTime = new Date().getTime();
      const remainingTime = expiresTime - currentTime;

      if (remainingTime < 0) {
        logOutUser();
        dispatch(clearUser());
        return;
      }

      timerRef.current = setTimeout(async () => {
        const { data, error } = await supabase.auth.refreshSession({
          refresh_token
        });
        dispatch(setUser({ userInfo: data }));
        autoLogOutHandler(refresh_token, expires_at);
      }, 3300000);
    },
    [dispatch]
  );

  const getUserInfo = useCallback(async () => {
    const data = await supabase.auth.getSession();
    const { session } = data.data;
    // const session2 = JSON.parse(localStorage.getItem(getLocalStorageKey()));
    // console.log('session', session);
    // console.log('res', res);
    if (session) {
      dispatch(setUser({ userInfo: session }));
      autoLogOutHandler(session.refresh_token, session.expires_at);
    }
  }, [dispatch, autoLogOutHandler]);

  useEffect(() => {
    getUserInfo();
    return () => clearTimeout(timerRef.current);
  }, [getUserInfo]);

  // return <Router />;
  return <RouterProvider router={router} />;
}

export default App;
