import { redirect } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { parseQuery } from '../utils';

export default async function putSheet({ request }) {
  const body = await request.json();
  const sheetId = parseQuery(request.url, 'id');
  const res = await csrfFetch(`/api/sheets/${sheetId}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });
  const { data } = await res.json();
  const { sheet } = data;
  return redirect(`/sheets?id=${sheet.id}`);
}
