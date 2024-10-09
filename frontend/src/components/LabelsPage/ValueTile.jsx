import { Link } from 'react-router-dom';

export default function LabelSheetValueTile({ sheet }) {
  return (
    <div className='label-value-tile'>
      <p className='lvt-name'>
        <Link to={`/sheets?id=${sheet.sheetId}`}>{sheet.name}</Link>
      </p>

      <p className='lvt-value'>{sheet.value}</p>
    </div>
  );
}
