import { useLoaderData } from 'react-router-dom';

export default function SheetDetailsPage() {
  const { sheet } = useLoaderData();
  return (
    <>
      <h1>{sheet.name}</h1>
      <p>{sheet.description}</p>
    </>
  );
}
