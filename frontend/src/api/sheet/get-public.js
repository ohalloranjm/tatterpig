import { csrfFetch } from '../../store/csrf';

export default async function getPublicSheets() {
  const res = await csrfFetch('/api/sheets');
  const { data } = await res.json();
  return data;
}
