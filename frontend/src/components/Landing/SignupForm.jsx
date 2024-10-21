import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../store/session';
import { Navigate, useSubmit } from 'react-router-dom';
import './SessionForms.css';

export default function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const dispatch = useDispatch();
  const user = useSelector(store => store.session.user);

  const submit = useSubmit();

  if (user) return <Navigate to='/' />;

  const handleSubmit = e => {
    e.preventDefault();
    return dispatch(signup({ username, email, password }))
      .then(() => submit())
      .catch(async data => {
        if (data?.errors) setErrors(data.errors);
      });
  };

  return (
    <form className='block session-form signup-form' onSubmit={handleSubmit}>
      <h1 className='center'>Get Started</h1>

      <input
        placeholder='Email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        ref={inputRef}
      />
      <p className='error'>{errors.email ?? null}</p>
      <input
        placeholder='Username'
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <p className='error'>{errors.username ?? null}</p>

      <input
        placeholder='Password'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <p className='error'>{errors.password ?? null}</p>

      <button type='submit'>Sign Up</button>
    </form>
  );
}
