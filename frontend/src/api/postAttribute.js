import { csrfFetch } from '../store/csrf';

export default async function postAttribute({ request }) {
  const data = await request.json();
  const res = await csrfFetch('/api/attributes', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return await res.json();
}
