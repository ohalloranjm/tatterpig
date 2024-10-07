import { Link, useLoaderData } from 'react-router-dom';
import ValueTile from './ValueTile';
import { useSelector } from 'react-redux';

export default function PublicSheetDetailsPage() {
  const { sheet } = useLoaderData();
  const { user } = useSelector(store => store.session);

  const isOwner = user?.id === sheet.ownerId;

  return (
    <>
      <h1>{sheet.name}</h1>
      <p>{sheet.description}</p>
      {sheet.SheetAttributes.map(val => (
        <ValueTile key={val.attributeId} value={val} />
      ))}
      {isOwner && (
        <Link to={`/sheets?id=${sheet.id}`}>View & Edit on My Dashboard</Link>
      )}
      <Link to='/sheets/public'>Back to Browse</Link>
    </>
  );
}
