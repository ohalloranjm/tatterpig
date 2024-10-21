import { useNavigate } from 'react-router-dom';

export default function PublicSheetTile({ sheet }) {
  const navigate = useNavigate();

  return (
    <div className='block big-link' onClick={() => navigate(`${sheet.id}`)}>
      <h2 className='bt-name'>{sheet.name}</h2>
      <div className='bt-description-wrapper'>
        <p className='bt-description'>
          <span>{sheet.description}</span>
        </p>
      </div>
    </div>
  );
}
