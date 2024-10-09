import { redirect } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { parseQuery } from '../utils';

export default async function deleteValue({ request }) {
  const sheetId = parseQuery(request.url, 'id');
  const labelId = parseQuery(request.url, 'labelId');
  await csrfFetch(`/api/sheets/${sheetId}/labels/${labelId}`, {
    method: 'DELETE',
  });
  return redirect(`/sheets?id=${sheetId}`);
}
