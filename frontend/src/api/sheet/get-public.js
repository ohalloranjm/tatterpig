import { csrfFetch } from '../../store/csrf';

export default async function getPublicSheets() {
  const res = await csrfFetch('/api/sheets');
  return await res.json();
}
