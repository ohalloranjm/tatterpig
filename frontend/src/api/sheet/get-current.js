import { csrfFetch } from '../../store/csrf';

export default async function getCurrentSheets() {
  const res = await csrfFetch('/api/sheets/current');
  const { data } = await res.json();
  return data;
}
