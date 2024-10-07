import { redirect } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { parseQuery } from '../utils';

export default async function deleteSheet({ request }) {
  const sheetId = parseQuery(request.url, 'id');
  await csrfFetch(`/api/sheets/${sheetId}`, { method: 'DELETE' });
  return redirect('/sheets');
}
