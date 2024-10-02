import { Link } from 'react-router-dom';

export default function SheetTile({ sheet }) {
  return (
    <Link to={`/sheets/${sheet.id}`}>
      <div>
        <h3>{sheet.name}</h3>
        <p>{sheet.description || '—'}</p>
      </div>
    </Link>
  );
}
