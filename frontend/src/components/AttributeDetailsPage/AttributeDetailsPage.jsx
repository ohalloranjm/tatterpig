import { useLoaderData } from 'react-router-dom';
import AttributeSheetTile from './AttributeSheetTile';

export default function AttributeDetailsPage() {
  const { attribute } = useLoaderData();
  console.log(attribute);
  return (
    <>
      <h1>{attribute.name}</h1>
      <p>Type: {attribute.dataType}</p>
      {attribute.SheetAttributes.length ? (
        <>
          <h2>Associated Sheets</h2>
          {attribute.SheetAttributes.map(sa => (
            <AttributeSheetTile key={sa.id} sheet={sa} />
          ))}
        </>
      ) : null}
    </>
  );
}
