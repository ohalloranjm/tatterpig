import { redirect } from 'react-router-dom';
import { csrfFetch } from '../store/csrf';

export default async function deleteAttribute({ params }) {
  const { attributeId } = params;
  await csrfFetch(`/api/attributes/${attributeId}`, {
    method: 'DELETE',
  });
  return redirect('/attributes');
}
