import { redirect } from 'react-router-dom';
import { csrfFetch } from '../store/csrf';

export default async function putValue({ request, params }) {
  const { sheetId, attributeId } = params;
  const data = await request.json();
  await csrfFetch(`/api/sheets/${sheetId}/attributes/${attributeId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return redirect(`/sheets/${sheetId}`);
}
