import { redirect } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';

export default async function putAttribute({ request }) {
  const attributeId = request.url
    .split('?')[1]
    .split('&')
    .find(q => q.startsWith('id='))
    .split('=')[1];
  const data = await request.json();
  const res = await csrfFetch(`/api/attributes/${attributeId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  const { attribute } = await res.json();
  return redirect(`/attributes?id=${attribute.id}`);
}
