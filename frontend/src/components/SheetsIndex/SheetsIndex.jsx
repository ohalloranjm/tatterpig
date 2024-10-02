import { useLoaderData } from 'react-router-dom';
import SheetTile from './SheetTile';

export default function SheetsIndex() {
  const data = useLoaderData();
  let [currentSheets, { sheets: publicSheets }] = data;

  if (currentSheets) {
    currentSheets = currentSheets.sheets;
    publicSheets = publicSheets.filter(
      s => !currentSheets.some(c => c.id === s.id)
    );
  }
  return (
    <>
      {currentSheets ? (
        <>
          <h2>Your Sheets</h2>
          {currentSheets.map(s => (
            <SheetTile key={s.id} sheet={s} />
          ))}
        </>
      ) : null}

      <h2>Public Sheets</h2>
      {publicSheets.map(s => (
        <SheetTile key={s.id} sheet={s} />
      ))}
    </>
  );
}
