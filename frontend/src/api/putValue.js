import { csrfFetch } from '../store/csrf';

export default async function putValue({ request, params }) {
  const { sheetId, attributeId } = params;
  const data = await request.json();
  const res = await csrfFetch(
    `/api/sheets/${sheetId}/attributes/${attributeId}`,
    { method: 'POST', body: JSON.stringify(data) }
  );
  return await res.json();
}
