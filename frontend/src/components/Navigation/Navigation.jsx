import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const logout = e => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const userTabs = sessionUser && (
    <>
      <NavLink to='/sheets'>Sheets</NavLink>
      <NavLink to='/attributes'>Attributes</NavLink>
    </>
  );

  const sessionLinks = sessionUser ? (
    <>
      <button onClick={logout}>Log Out</button>
    </>
  ) : (
    <>
      <NavLink to='/login'>Log In</NavLink>
      <NavLink to='/signup'>Sign Up</NavLink>
    </>
  );

  return (
    <div id='navigation'>
      <div className='nav-tabs'>
        <NavLink to='/'>Home</NavLink>
        {isLoaded && userTabs}
        <NavLink to='/public'>Browse</NavLink>
      </div>
      <div className='nav-session'>{isLoaded && sessionLinks}</div>
    </div>
  );
}

export default Navigation;
