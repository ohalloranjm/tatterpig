import { redirect } from 'react-router-dom';
import { csrfFetch } from '../store/csrf';

export default async function postSheet({ request }) {
  const data = await request.json();

  try {
    const res = await csrfFetch('/api/sheets', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return redirect('/');
  } catch (err) {
    return await err;
  }
}
