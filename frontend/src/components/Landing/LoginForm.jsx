import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/session';
import { Navigate, useSubmit } from 'react-router-dom';

export default function LoginForm() {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const user = useSelector(store => store.session.user);

  const submit = useSubmit();

  if (user) return <Navigate to='/' />;

  return (
    <form className='block session-form login-form'>
      <h1 className='center'>Welcome Back</h1>

      <div>
        <input
          placeholder='Username or Email'
          value={credential}
          onChange={e => setCredential(e.target.value)}
        />
        <p className='error'>{errors.credential ?? null}</p>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <p className='error'>{errors.password ?? null}</p>
      </div>
      <div>
        <button
          type='submit'
          onClick={e => {
            e.preventDefault();
            return dispatch(login({ credential, password }))
              .then(() => submit())
              .catch(async data => {
                if (data?.errors) setErrors(data.errors);
              });
          }}
        >
          Log In
        </button>
        <button
          type='button'
          className='demo-login-button'
          onClick={() => {
            return dispatch(
              login({ credential: 'demo', password: 'demopassword' })
            )
              .then(() => submit())
              .catch(async data => {
                if (data?.errors) setErrors(data.errors);
              });
          }}
        >
          Demo Login
        </button>
      </div>
    </form>
  );
}
