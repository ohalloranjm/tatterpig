import { Link } from 'react-router-dom';

export default function SheetTile({ sheet }) {
  return (
    <Link to={`/sheets?id=${sheet.id}`}>
      <div>{sheet.name}</div>
    </Link>
  );
}
