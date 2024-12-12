import { redirect } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { parseQuery } from '../utils';

export default async function postValue({ request }) {
  const data = await request.json();
  const sheetId = parseQuery(request.url, 'id');
  const newLabel = parseQuery(request.url, 'newLabel') === 'true';

  if (newLabel) {
  }

  await csrfFetch(`/api/sheets/${sheetId}/labels`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return redirect(`/sheets?id=${sheetId}`);
}
