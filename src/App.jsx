import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/slices/user.slice';
import Router from './routes/router';
import { supabase } from './service/supabase';
import { getLocalStorageKey } from './utils/localStorage';

function App() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const getUserInfo = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();
      // console.log('SESSION', session);
      if (session) {
        const userInfo = JSON.parse(localStorage.getItem(getLocalStorageKey()));
        dispatch(setUser({ userInfo }));
      }
    };
    getUserInfo();
  }, [dispatch]);

  return <Router />;
}

export default App;
