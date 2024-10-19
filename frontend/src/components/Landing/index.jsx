import { Link } from 'react-router-dom';
import LoginForm from '../SessionForms/LoginFormPage';
import SignupForm from '../SessionForms/SignupFormPage';
import './Landing.css';

export default function Landing() {
  return (
    <div className='landing-page'>
      <img className='tatterpiggy' src='/tatterpig.jpg' alt='tatterpig' />
      <div className='landing-page-view'>
        <div className='about-tatterpig'>
          <p>
            <span className='about-tatterpig-name'>Tatterpig</span> is a
            system-agnostic tabletop roleplaying game (TTRPG) character sheet
            manager.
          </p>
          <ul className='tatterpig-whatdo'>
            <li>Create an account to get started.</li>
            <li>
              Browse <Link to='/public'>publically available sheets</Link> for
              inspiration.
            </li>
            <li>Log in as a demo user to sample the site’s features.</li>
          </ul>
        </div>
        <div className='session-forms'>
          <SignupForm />
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
