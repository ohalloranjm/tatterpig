import { redirect } from 'react-router-dom';
import { csrfFetch } from '../store/csrf';

export default async function deleteSheet({ params }) {
  console.log('to grandmother1s house we goOOOO');
  const { sheetId } = params;
  const res = await csrfFetch(`/api/sheets/${sheetId}`, { method: 'DELETE' });
  console.log(res);
  console.log(await res.json());
  return redirect('/sheets');
}
