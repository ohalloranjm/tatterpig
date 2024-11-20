import { csrfFetch } from '../../store/csrf';

export default async function getSheetDetails({ params }) {
  const { sheetId } = params;
  const res = await csrfFetch(`/api/sheets/${sheetId}`);
  const { data } = await res.json();
  return data;
}
