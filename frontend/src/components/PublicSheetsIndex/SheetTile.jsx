import { Link } from 'react-router-dom';

export default function PublicSheetTile({ sheet }) {
  return (
    <Link to={`${sheet.id}`}>
      <div>
        <h2>{sheet.name}</h2>
        <p>{sheet.description}</p>
      </div>
    </Link>
  );
}
