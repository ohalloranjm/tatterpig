import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SheetTile({ sheet }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const className = `sheets-list-tile${
    Number(searchParams.get('id')) === sheet.id
      ? ' sheets-list-tile-active'
      : ''
  }`;

  return (
    <div
      className={className}
      onClick={() => navigate(`/sheets?id=${sheet.id}`)}
    >
      {sheet.name}
    </div>
  );
}
