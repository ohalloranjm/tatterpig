import { useNavigate, useSearchParams, useSubmit } from 'react-router-dom';
import ValueTile from './ValueTile';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquarePlus,
  faPencil,
  faSquareMinus,
} from '@fortawesome/free-solid-svg-icons';
import ValueForm from './ValueForm';
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

  sheet.SheetLabels.sort((a, b) => a.index - b.index);
  const order = sheet.SheetLabels.map(sl => sl.labelId);

  const deleteSheet = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this sheet?'
    );
    if (confirmDelete)
      submit(null, { method: 'delete', action: `/sheets?id=${sheet.id}` });
  };

  const changePublic = newValue => {
    const message = newValue
      ? 'Are you sure you want to publish this sheet? Other users will be able to discover and view it. Only you will be able to edit it.'
      : 'Are you sure you want to make this sheet private? Other users will no longer be able to discover and view it.';

    const confirmChange = window.confirm(message);
    if (confirmChange) {
      const { name, description } = sheet;
      const body = { name, description, public: newValue };
      submit(body, {
        method: 'PUT',
        action: `/sheets?id=${sheet.id}`,
        encType: 'application/json',
      });
    }
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

      {/* populate the labels and values, passing the order */}
      <div className='sheet-details-values'>
        {sheet.SheetLabels.map((a, i) => {
          const aboveId = order[i - 1] ?? null;
          const belowId = order[i + 1] ?? null;
          return (
            <ValueTile
              key={a.id}
              label={a}
              aboveId={aboveId}
              belowId={belowId}
              order={order}
            />
          );
        })}
      </div>

      <button
        type='button'
        className='sd-add-attribute-button'
        onClick={() =>
          navigate(
            `/sheets?id=${sheet.id}${
              searchParams.get('add') === 'label' ? '' : '&add=label'
            }`
          )
        }
      >
        <FontAwesomeIcon
          icon={
            searchParams.get('add') === 'label' ? faSquareMinus : faSquarePlus
          }
        />{' '}
        Add Label
      </button>
      {addValue && <ValueForm sheet={sheet} />}

      <div className='sd-bottom-buttons'>
        {sheet.public ? (
          <button type='button' onClick={() => changePublic(false)}>
            Make Private
          </button>
        ) : (
          <button type='button' onClick={() => changePublic(true)}>
            Publish
          </button>
        )}
        <button type='button' className='grayed-out' onClick={deleteSheet}>
          Delete Sheet
        </button>
      </div>
    </div>
  );
}
