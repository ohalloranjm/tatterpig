import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGear } from '@fortawesome/free-solid-svg-icons';

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
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/sheets'>Sheets</NavLink>
      <NavLink to='/labels'>Labels</NavLink>
    </>
  ) : (
    <>
      <NavLink to='/'>Start Here</NavLink>
    </>
  );

  return (
    <div id='navigation'>
      <div className='nav-tabs'>
        {isLoaded && tabs}
        <NavLink to='/publicsheets'>Browse</NavLink>
      </div>
      {isLoaded && sessionUser && (
        <div>
          <button
            className='icon user-settings-button'
            onClick={() => navigate('/account')}
          >
            <FontAwesomeIcon icon={faUserGear} />
          </button>
          <button className='logout-button' onClick={logout}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default Navigation;
