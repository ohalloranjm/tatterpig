import { useLoaderData } from 'react-router-dom';
import SheetTile from './SheetTile';

export default function PublicSheetsIndex() {
  const { sheets } = useLoaderData();
  return (
    <>
      <h1>Public Sheets</h1>
      {sheets.map(s => (
        <SheetTile key={s.id} sheet={s} />
      ))}
    </>
  );
}
