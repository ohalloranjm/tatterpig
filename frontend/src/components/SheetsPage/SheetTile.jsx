import { useNavigate } from 'react-router-dom';

export default function SheetTile({ sheet }) {
  const navigate = useNavigate();
  return (
    <div
      className='sheets-list-tile'
      onClick={() => navigate(`/sheets?id=${sheet.id}`)}
    >
      {sheet.name}
    </div>
  );
}
