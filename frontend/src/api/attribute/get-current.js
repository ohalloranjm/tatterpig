import { csrfFetch } from '../../store/csrf';

export default async function getCurrentAttributes() {
  const res = await csrfFetch('/api/attributes/current');
  return await res.json();
}
