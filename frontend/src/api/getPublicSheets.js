import { csrfFetch } from '../store/csrf';

export default async function getPublicSheets() {
  const res = await csrfFetch('/api/sheets');
  if (res.ok) return await res.json();
  throw res;
}
