import { useLoaderData } from 'react-router-dom';
import SheetAttributeTile from './SheetAttributeTile';

export default function SheetDetailsPage() {
  const { sheet } = useLoaderData();
  return (
    <>
      <h1>{sheet.name}</h1>
      <p>{sheet.description}</p>
      {sheet.SheetAttributes.map(a => (
        <SheetAttributeTile key={a.id} attribute={a} />
      ))}
    </>
  );
}
