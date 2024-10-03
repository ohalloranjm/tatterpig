import { Link } from 'react-router-dom';

export default function AttributeSheetTile({ sheet }) {
  return (
    <div>
      <p>
        <Link to={`/sheets/${sheet.sheetId}`}>{sheet.name}</Link>
      </p>
      <p>{sheet.value}</p>
    </div>
  );
}
