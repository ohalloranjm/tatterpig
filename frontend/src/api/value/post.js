import { redirect } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { parseQuery } from '../utils';

export default async function postValue({ request }) {
  const data = await request.json();
  const sheetId = parseQuery(request.url, 'id');
  await csrfFetch(`/api/sheets/${sheetId}/attributes`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return redirect(`/sheets?id=${sheetId}`);
}
