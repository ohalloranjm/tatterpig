import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../store/session';
import { Navigate } from 'react-router-dom';

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const user = useSelector(store => store.session.user);

  if (user) return <Navigate to='/' />;

  const handleSubmit = e => {
    e.preventDefault();
    return dispatch(signup({ username, email, password })).catch(async res => {
      const data = await res.json();
      if (data?.errors) setErrors(data.errors);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder='Email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <p>{errors.email ?? null}</p>
      <input
        placeholder='Username'
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <p>{errors.username ?? null}</p>

      <input
        placeholder='Password'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <p>{errors.password ?? null}</p>

      <button type='submit'>Sign Up</button>
    </form>
  );
}
