import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import './Sheets.css';
import SheetFormView from './SheetFormView';
import DetailsView from './DetailsView';
import SheetTile from './SheetTile';

export default function SheetsPage() {
  const { sheets } = useLoaderData();
  const [searchParams] = useSearchParams();
  const [mainContent, setMainContent] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.has('id')) {
      const sheetId = Number(searchParams.get('id'));
      const sheet = sheets.find(s => s.id === sheetId);
      if (sheet && searchParams.get('edit') === 'true') {
        setMainContent(<p>Placeholder: Edit a Sheet</p>);
      } else if (sheet) {
        setMainContent(<DetailsView sheet={sheet} />);
      } else {
        setMainContent(<p>Placeholder: Default</p>);
      }
    } else if (searchParams.get('new') === 'true') {
      setMainContent(<SheetFormView />);
    } else {
      setMainContent(<p>Placeholder: Default</p>);
    }
  }, [searchParams, sheets]);

  return (
    <div className='sheets'>
      <h1 className='sheets-title'>My Sheets</h1>

      <div className='sheets-list'>
        <button
          onClick={() => {
            if (searchParams.get('new') === 'true') navigate('/sheets');
            else navigate('/sheets?new=true');
          }}
        >
          {searchParams.get('new') === 'true' ? 'Cancel' : 'Create a New Sheet'}
        </button>

        {sheets.map(s => (
          <SheetTile key={s.id} sheet={s} />
        ))}
      </div>

      <div className='sheets-view'>{mainContent}</div>
    </div>
  );
}
