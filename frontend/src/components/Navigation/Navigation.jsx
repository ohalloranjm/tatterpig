import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = e => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    navigate('/');
  };

  const tabs = sessionUser ? (
    <>
      <NavLink to='/sheets'>Sheets</NavLink>
      <NavLink to='/labels'>Labels</NavLink>
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
        {isLoaded && tabs}
        <NavLink to='/public'>Browse</NavLink>
      </div>
      {isLoaded && sessionUser && (
        <button className='logout-button' onClick={logout}>
          Log Out
        </button>
      )}
    </div>
  );
}

export default Navigation;
