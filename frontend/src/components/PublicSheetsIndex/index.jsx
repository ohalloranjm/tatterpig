import { useLoaderData } from 'react-router-dom';
import SheetTile from './SheetTile';
import './PublicSheetsIndex.css';

export default function PublicSheetsIndex() {
  const { sheets } = useLoaderData();
  return (
    <div className='browse-sheets'>
      {sheets.map(s => (
        <SheetTile key={s.id} sheet={s} />
      ))}
    </div>
  );
}
