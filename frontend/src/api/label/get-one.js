import { csrfFetch } from '../../store/csrf';

export default async function getLabelDetails({ params }) {
  const { labelId } = params;
  const res = await csrfFetch(`/api/labels/${labelId}`);
  return await res.json();
}
