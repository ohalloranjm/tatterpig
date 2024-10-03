import { useLoaderData } from 'react-router-dom';

export default function ValueForm() {
  const { sheet } = useLoaderData();
  return <h1>Add an Attribute to {sheet.name}</h1>;
}
