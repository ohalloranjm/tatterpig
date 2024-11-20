import { csrfFetch } from '../../store/csrf';

export default async function getLabelDetails({ params }) {
  const { labelId } = params;
  const res = await csrfFetch(`/api/labels/${labelId}`);
  const { data } = await res.json();
  return data;
}
