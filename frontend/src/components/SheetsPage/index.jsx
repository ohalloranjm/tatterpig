import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import './Sheets.css';
import SheetFormView from './SheetFormView';
import DetailsView from './DetailsView';
import SheetTile from './SheetTile';

export default function SheetsPage() {
  const [{ sheets }] = useLoaderData();
  const [searchParams] = useSearchParams();
  const [mainContent, setMainContent] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.has('id')) {
      const sheetId = Number(searchParams.get('id'));
      const sheet = sheets.find(s => s.id === sheetId);
      if (sheet) {
        setMainContent(
          <DetailsView
            sheet={sheet}
            edit={searchParams.get('edit') === 'true'}
          />
        );
      } else {
        setMainContent(
          <p>
            <strong>Sheets</strong> can be used to represent characters,
            monsters, locations, or just about anything else you need.
          </p>
        );
      }
    } else if (searchParams.get('new') === 'true') {
      setMainContent(<SheetFormView />);
    } else {
      setMainContent(
        <p>
          <strong>Sheets</strong> can be used to represent characters, monsters,
          locations, or just about anything else you need.
        </p>
      );
    }
  }, [searchParams, sheets]);

  return (
    <div className='sheets'>
      <div className='sheets-col1 block'>
        <button
          onClick={() => {
            if (searchParams.get('new') === 'true') navigate('/sheets');
            else navigate('/sheets?new=true');
          }}
        >
          {searchParams.get('new') === 'true' ? 'Cancel' : 'New Sheet'}
        </button>

        <div className='sheets-list'>
          {sheets.map(s => (
            <SheetTile key={s.id} sheet={s} />
          ))}
        </div>
      </div>

      <div className='sheets-view block'>{mainContent}</div>
    </div>
  );
}
