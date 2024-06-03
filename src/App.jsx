import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { clearUser, setUser } from './redux/slices/user.slice';
import router from './routes/router';
import { supabase } from './service/supabase';
import { logOutUser } from './service/user';
import { getLocalStorageKey } from './utils/localStorage';

function App() {
  const dispatch = useDispatch();

  const autoLogOutHandler = useCallback(
    (refresh_token, expires_at) => {
      const expiresTime = expires_at * 1000;
      const currentTime = new Date().getTime();
      const remainingTime = expiresTime - currentTime;

      // console.log(expiresTime, currentTime, remainingTime);

      if (remainingTime < 0) {
        // 토큰 만료?
        logOutUser();
        dispatch(clearUser());
        return;
      }

      // 55분 마다 세션 새로 받아와서 로그인 유지
      // 제대로 테스트 안해봄..
      setTimeout(async () => {
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
    // const {
    //   data: { session },
    //   error
    // } = await supabase.auth.getSession();
    const session = JSON.parse(localStorage.getItem(getLocalStorageKey()));
    if (session) {
      dispatch(setUser({ userInfo: session }));
      autoLogOutHandler(session.refresh_token, session.expires_at);
    }
  }, [dispatch, autoLogOutHandler]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  // return <Router />;
  return <RouterProvider router={router} />;
}

export default App;
