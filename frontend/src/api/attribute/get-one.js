import { csrfFetch } from '../../store/csrf';

export default async function getAttributeDetails({ params }) {
  const { attributeId } = params;
  const res = await csrfFetch(`/api/attributes/${attributeId}`);
  return await res.json();
}
