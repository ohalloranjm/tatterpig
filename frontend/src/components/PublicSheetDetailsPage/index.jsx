import { useLoaderData } from 'react-router-dom';
import ValueTile from './ValueTile';

export default function PublicSheetDetailsPage() {
  const { sheet } = useLoaderData();
  console.log(sheet);
  return (
    <>
      <h1>{sheet.name}</h1>
      <p>{sheet.description}</p>
      {sheet.SheetAttributes.map(val => (
        <ValueTile key={val.attributeId} value={val} />
      ))}
    </>
  );
}
