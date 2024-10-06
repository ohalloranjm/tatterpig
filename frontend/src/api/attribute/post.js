import { redirect } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';

export default async function postAttribute({ request }) {
  const data = await request.json();
  const res = await csrfFetch('/api/attributes', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const { attribute } = await res.json();
  return redirect(`/attributes?id=${attribute.id}`);
}
