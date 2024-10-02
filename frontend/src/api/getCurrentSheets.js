import { csrfFetch } from '../store/csrf';

export default async function getCurrentSheets() {
  const res = await csrfFetch('/api/sheets/current');
  return await res.json();
}
