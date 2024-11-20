import { csrfFetch } from '../../store/csrf';

export default async function getCurrentLabels() {
  const res = await csrfFetch('/api/labels/current');
  const { data } = await res.json();
  return data;
}
