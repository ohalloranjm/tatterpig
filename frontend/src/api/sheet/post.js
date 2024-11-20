import { redirect } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';

export default async function postSheet({ request }) {
  const body = await request.json();
  const res = await csrfFetch('/api/sheets', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const { data } = await res.json();
  const { sheet } = data;
  return redirect(`/sheets?id=${sheet.id}`);
}
