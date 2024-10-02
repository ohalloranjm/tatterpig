import { redirect } from 'react-router-dom';
import { csrfFetch } from '../store/csrf';

export default async function postSheet({ request }) {
  const data = await request.json();
  const res = await csrfFetch('/api/sheets', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const { sheet } = await res.json();
  return redirect(`/sheets/${sheet.id}`);
}
