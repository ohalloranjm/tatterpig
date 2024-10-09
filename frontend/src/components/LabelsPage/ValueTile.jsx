import { useNavigate } from 'react-router-dom';

export default function LabelSheetValueTile({ sheet }) {
  const navigate = useNavigate();

  return (
    <div
      className='label-value-tile'
      onClick={() => navigate(`/sheets?id=${sheet.sheetId}`)}
    >
      <p className='lvt-name'>{sheet.name}</p>

      <p className='lvt-value'>{sheet.value}</p>
    </div>
  );
}
