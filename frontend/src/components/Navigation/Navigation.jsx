import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const logout = e => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  const sessionLinks = sessionUser ? (
    <>
      <li>
        <NavLink to='/sheets'>Sheets</NavLink>
      </li>
      <li>
        <NavLink to='/attributes'>Attributes</NavLink>
      </li>
      <li>
        <NavLink to='/sheets/public'>Public Sheets</NavLink>
      </li>
      <li>
        <button onClick={logout}>Log Out!</button>
      </li>
    </>
  ) : (
    <>
      <li>
        <NavLink to='/sheets/public'>Public Sheets</NavLink>
      </li>
      <li>
        <NavLink to='/login'>Log In</NavLink>
      </li>
      <li>
        <NavLink to='/signup'>Sign Up</NavLink>
      </li>
    </>
  );

  return (
    <ul>
      <li>
        <NavLink to='/'>Home</NavLink>
      </li>
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
