import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { restoreUser } from '../store/session';
import Navigation from '../components/Navigation';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}
