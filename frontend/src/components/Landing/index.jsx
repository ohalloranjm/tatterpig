import LoginForm from '../SessionForms/LoginFormPage';
import SignupForm from '../SessionForms/SignupFormPage';
import './Landing.css';

export default function Landing() {
  return (
    <div className='landing-page'>
      <img className='tatterpiggy' src='/tatterpig.jpg' alt='tatterpig' />
      <LoginForm />
      <SignupForm />
    </div>
  );
}
