import { redirect } from 'react-router-dom';
import { csrfFetch } from '../store/csrf';

export default async function deleteSheet({ params }) {
  const { sheetId } = params;
  await csrfFetch(`/api/sheets/${sheetId}`, { method: 'DELETE' });
  return redirect('/sheets');
}
