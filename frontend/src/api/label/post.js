import { redirect } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';

export default async function postLabel({ request }) {
  const body = await request.json();
  const res = await csrfFetch('/api/labels', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  const { data } = await res.json();
  const { label } = data;
  return redirect(`/labels?id=${label.id}`);
}
