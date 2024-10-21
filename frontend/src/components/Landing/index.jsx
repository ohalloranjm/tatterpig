import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './Landing.css';
import { useSelector } from 'react-redux';
import Welcome from './WelcomeView';

export default function Landing() {
  const user = useSelector(({ session }) => session.user);

  return (
    <div className='landing-page'>
      <img className='tatterpiggy' src='/tatterpig.jpg' alt='tatterpig' />
      <div className='landing-page-view'>
        {user ? (
          <Welcome />
        ) : (
          <>
            <div className='about-tatterpig'>
              <p>
                <span className='about-tatterpig-name'>Tatterpig</span> is a
                system-agnostic tabletop roleplaying game (TTRPG) character
                sheet manager.
              </p>
              <ul className='tatterpig-whatdo'>
                <li>Create an account to get started.</li>
                <li>
                  Browse <Link to='/public'>publically available sheets</Link>{' '}
                  for inspiration.
                </li>
                <li>Log in as a demo user to sample the site’s features.</li>
              </ul>
            </div>
            <div className='session-forms-wrapper'>
              <div className='session-forms'>
                <SignupForm />
                <LoginForm />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
