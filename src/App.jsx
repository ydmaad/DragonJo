import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { useAutoLogout } from './hooks/useAutoLogout';
import { setUser } from './redux/slices/user.slice';
import router from './routes/router';
import { supabase } from './service/supabase';

function App() {
  const dispatch = useDispatch();
  useAutoLogout();

  useEffect(() => {
    const getSession = async () => {
      const data = await supabase.auth.getUser();
      // console.log('APP getUser', data.data);

      if (!data.data) {
        return;
      }

      dispatch(setUser({ session: data.data }));
    };
    getSession();
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
