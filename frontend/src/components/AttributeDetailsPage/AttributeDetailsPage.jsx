import { useLoaderData } from 'react-router-dom';

export default function AttributeDetailsPage() {
  const attribute = useLoaderData();
  console.log(attribute);
  return (
    <>
      <h1>attribute.name</h1>
      <p>Type: attribute.type</p>
      <h2>Associated Sheets</h2>
    </>
  );
}
