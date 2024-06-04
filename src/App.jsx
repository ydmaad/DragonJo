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
      const sessionData = await supabase.auth.getSession();
      const session = sessionData.data.session;

      if (!session) {
        return;
      }

      dispatch(setUser({ session }));
    };
    getSession();
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
