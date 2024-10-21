import { Link, useLoaderData } from 'react-router-dom';
import ValueTile from './ValueTile';
import { useSelector } from 'react-redux';
import './PublicSheetDetailsPage.css';

export default function PublicSheetDetailsPage() {
  const { sheet } = useLoaderData();
  const { user } = useSelector(store => store.session);

  sheet.SheetLabels.sort((a, b) => a.index - b.index);

  const isOwner = user?.id === sheet.ownerId;

  return (
    <>
      <div className='block public-sheet'>
        <h1 className='ps-title'>{sheet.name}</h1>
        <p>{sheet.description}</p>

        {sheet.SheetLabels.map(val => (
          <ValueTile key={val.labelId} value={val} />
        ))}

        {isOwner && (
          <Link
            to={`/sheets?id=${sheet.id}`}
            className='view-and-edit-on-dashboard'
          >
            View & Edit on My Dashboard
          </Link>
        )}
      </div>

      <Link to='/public' className='back-to-browse '>
        Back to Browse
      </Link>
    </>
  );
}
