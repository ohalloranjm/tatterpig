import { redirect } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { parseQuery } from '../utils';

export default async function postValue({ request }) {
  let { value, name, dataType, labelId } = await request.json();
  const sheetId = parseQuery(request.url, 'id');
  const newLabel = parseQuery(request.url, 'newLabel') === 'true';

  if (newLabel) {
    const res = await csrfFetch(`/api/labels`, {
      method: 'POST',
      body: JSON.stringify({ name, dataType }),
    });
    const { data } = await res.json();
    labelId = data.label.id;
  }

  try {
    await csrfFetch(`/api/sheets/${sheetId}/labels`, {
      method: 'POST',
      body: JSON.stringify({ labelId, value }),
    });
    return redirect(`/sheets?id=${sheetId}`);
  } catch (err) {
    // if the label is new and an error is thrown at this stage, delete the label in addition to deleting the error
    if (newLabel) {
      await csrfFetch(`/api/labels/${labelId}`, { method: 'DELETE' });
    }
    throw err;
  }
}
