import { redirect } from 'react-router-dom';
import { csrfFetch } from '../store/csrf';

export default async function putAttribute({ request, params }) {
  const data = await request.json();
  const { attributeId } = params;
  const res = await csrfFetch(`/api/attributes/${attributeId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  const { attribute } = await res.json();
  return redirect(`/attributes/${attribute.id}`);
}
