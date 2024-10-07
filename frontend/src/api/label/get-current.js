import { csrfFetch } from '../../store/csrf';

export default async function getCurrentLabels() {
  const res = await csrfFetch('/api/labels/current');
  return await res.json();
}
