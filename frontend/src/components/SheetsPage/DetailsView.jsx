import { useNavigate, useSearchParams, useSubmit } from 'react-router-dom';
import ValueTile from './ValueTile';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus, faPencil } from '@fortawesome/free-solid-svg-icons';
import ValueForm from './ValueForm';
import FormView from './SheetFormView';
import SheetFormView from './SheetFormView';

export default function SheetDetailsView({ sheet, edit }) {
  const [searchParams] = useSearchParams();
  const [addValue, setAddValue] = useState(false);
  const submit = useSubmit();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('add') === 'label') {
      setAddValue(true);
    } else {
      setAddValue(false);
    }
  }, [searchParams]);

  const deleteSheet = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this sheet?'
    );
    if (confirmDelete)
      submit(null, { method: 'delete', action: `/sheets?id=${sheet.id}` });
  };

  return (
    <div className='sheet-view-details'>
      {edit ? (
        <SheetFormView sheet={sheet} />
      ) : (
        <div className='sheet-details-header'>
          <h1 className='sdh-title'>{sheet.name}</h1>
          <p className='sdh-description'>{sheet.description}</p>
          <button
            type='button'
            className='icon sdh-edit'
            onClick={() => navigate(`/sheets?id=${sheet.id}&edit=true`)}
          >
            <FontAwesomeIcon icon={faPencil} />
          </button>
        </div>
      )}

      <div className='sheet-details-values'>
        {sheet.SheetLabels.map(a => (
          <ValueTile key={a.id} label={a} />
        ))}
      </div>

      <button
        type='button'
        onClick={() => navigate(`/sheets?id=${sheet.id}&add=label`)}
      >
        <FontAwesomeIcon icon={faSquarePlus} /> Add a Label
      </button>
      <button type='button' onClick={deleteSheet}>
        Delete Sheet
      </button>
      {addValue && <ValueForm sheet={sheet} />}
    </div>
  );
}
