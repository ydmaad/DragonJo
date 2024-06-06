import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../redux/slices/user.slice';
import { logOutUser } from '../service/user';
import { getLocalStorageKey } from '../utils/localStorage';

export const useAutoLogout = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (!isLoggedIn) return;

    const data = JSON.parse(localStorage.getItem(getLocalStorageKey()));
    const { expires_at } = data;
    const currentTime = new Date().getTime();
    const remainingTime = expires_at * 1000 - currentTime;

    const logoutTimer = setTimeout(() => {
      logOutUser();
      dispatch(clearUser());
    }, remainingTime);

    return () => {
      clearTimeout(logoutTimer);
    };
  }, [dispatch, isLoggedIn]);
};
