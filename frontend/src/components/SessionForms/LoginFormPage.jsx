import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/session';
import { Navigate } from 'react-router-dom';

export default function LoginForm() {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const user = useSelector(store => store.session.user);

  if (user) return <Navigate to='/' />;

  return (
    <form>
      <input
        placeholder='Username or Email'
        value={credential}
        onChange={e => setCredential(e.target.value)}
      />
      <p>{errors.credential ?? null}</p>
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <p>{errors.password ?? null}</p>
      <button
        type='submit'
        onClick={e => {
          e.preventDefault();
          return dispatch(login({ credential, password })).catch(async data => {
            if (data?.errors) setErrors(data.errors);
          });
        }}
      >
        Log In
      </button>
    </form>
  );
}
