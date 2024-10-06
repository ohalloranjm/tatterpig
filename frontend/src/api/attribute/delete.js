import { redirect } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import { parseQuery } from '../utils';

export default async function deleteAttribute({ request }) {
  const attributeId = parseQuery(request.url, 'id');
  await csrfFetch(`/api/attributes/${attributeId}`, {
    method: 'DELETE',
  });
  return redirect('/attributes');
}
