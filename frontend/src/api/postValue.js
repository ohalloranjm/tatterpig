import { redirect } from 'react-router-dom';
import { csrfFetch } from '../store/csrf';

export default async function postValue({ request, params }) {
  const data = await request.json();
  const { sheetId } = params;
  const res = await csrfFetch(`/api/sheets/${sheetId}/attributes`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const { sheetAttribute } = await res.json();
  return redirect(`/sheets/${sheetAttribute.sheetId}`);
}
