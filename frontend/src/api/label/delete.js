import { redirect } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { parseQuery } from '../utils';

export default async function deleteLabel({ request }) {
  const labelId = parseQuery(request.url, 'id');
  await csrfFetch(`/api/labels/${labelId}`, {
    method: 'DELETE',
  });
  return redirect('/labels');
}
