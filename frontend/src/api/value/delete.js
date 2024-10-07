import { redirect } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { parseQuery } from '../utils';

export default async function deleteValue({ request }) {
  const sheetId = parseQuery(request.url, 'id');
  const attributeId = parseQuery(request.url, 'attributeId');
  await csrfFetch(`/api/sheets/${sheetId}/attributes/${attributeId}`, {
    method: 'DELETE',
  });
  return redirect(`/sheets?id=${sheetId}`);
}
