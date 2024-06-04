import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../redux/slices/user.slice';
import { logOutUser } from '../service/user';

export const useAutoLogout = () => {
  const dispatch = useDispatch();
  const { session, isLoggedIn } = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (isLoggedIn || !session) return;

    const { expires_at } = session;
    const currentTime = new Date().getTime();
    const remainingTime = expires_at * 1000 - currentTime;

    const logoutTimer = setTimeout(() => {
      logOutUser();
      dispatch(clearUser());
    }, remainingTime);

    return () => {
      clearTimeout(logoutTimer);
    };
  }, [dispatch, isLoggedIn, session]);
};
