import { csrfFetch } from '../store/csrf';

export default async function getCurrentSheets() {
  const res = await csrfFetch('/api/sheets/current');
  if (res.ok) return await res.json();
  return false;
}
