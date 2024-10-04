import { redirect } from 'react-router-dom';
import { csrfFetch } from '../store/csrf';

export default async function deleteValue({ params }) {
  const { sheetId, attributeId } = params;
  await csrfFetch(`/api/sheets/${sheetId}/attributes/${attributeId}`, {
    method: 'DELETE',
  });
  return redirect(`/sheets/${sheetId}`);
}
