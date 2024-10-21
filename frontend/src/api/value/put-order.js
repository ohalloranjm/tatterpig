import { redirect } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { parseQuery } from '../utils';

export default async function putValueOrder({ request }) {
  const sheetId = parseQuery(request.url, 'sheetId');
  const data = await request.json();
  await csrfFetch(`/api/sheets/${sheetId}/labels`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return redirect(`/sheets?id=${sheetId}`);
}
