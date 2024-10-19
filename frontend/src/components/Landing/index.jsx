import { Link } from 'react-router-dom';
import LoginForm from '../SessionForms/LoginFormPage';
import SignupForm from '../SessionForms/SignupFormPage';
import './Landing.css';

export default function Landing() {
  return (
    <div className='landing-page'>
      <img className='tatterpiggy' src='/tatterpig.jpg' alt='tatterpig' />
      <div className='landing-page-view'>
        <p className='about-tatterpig'>
          <span className='about-tatterpig-name'>Tatterpig</span> is a
          system-agnostic tabletop roleplaying game (TTRPG) character sheet
          manager. Create an account to get started, browse{' '}
          <Link to='/public'>publically available sheets</Link> for inspiration,
          or use the demo account to sample the site’s features.
        </p>
        <div className='session-forms'>
          <SignupForm />
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
