import { redirect } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { parseQuery } from '../utils';

export default async function putValue({ request }) {
  const sheetId = parseQuery(request.url, 'id');
  const attributeId = parseQuery(request.url, 'attributeId');
  const data = await request.json();
  await csrfFetch(`/api/sheets/${sheetId}/attributes/${attributeId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return redirect(`/sheets?id=${sheetId}`);
}
