import { redirect } from 'react-router-dom';
import { csrfFetch } from '../store/csrf';

export default async function putSheet({ request, params }) {
  const data = await request.json();
  const { sheetId } = params;
  const res = await csrfFetch(`/api/sheets/${sheetId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  const { sheet } = await res.json();
  return redirect(`/sheets/${sheet.id}`);
}
