import { redirect } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';

export default async function postLabel({ request }) {
  const data = await request.json();
  const res = await csrfFetch('/api/labels', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const { label } = await res.json();
  return redirect(`/labels?id=${label.id}`);
}
