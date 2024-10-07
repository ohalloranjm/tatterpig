import { Link } from 'react-router-dom';

export default function AttributeSheetValueTile({ sheet }) {
  return (
    <div>
      <p>
        <Link to={`/sheets?id=${sheet.sheetId}`}>{sheet.name}</Link>
      </p>
      <p>{sheet.value}</p>
    </div>
  );
}
