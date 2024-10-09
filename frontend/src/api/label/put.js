import { redirect } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';

export default async function putLabel({ request }) {
  const labelId = request.url
    .split('?')[1]
    .split('&')
    .find(q => q.startsWith('id='))
    .split('=')[1];
  const data = await request.json();
  const res = await csrfFetch(`/api/labels/${labelId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  const { label } = await res.json();
  return redirect(`/labels?id=${label.id}`);
}
