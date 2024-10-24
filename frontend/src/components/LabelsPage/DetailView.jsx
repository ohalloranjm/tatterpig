import { useNavigate, useSearchParams, useSubmit } from 'react-router-dom';
import ValueTile from './ValueTile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import EditLabelInline from './EditLabelInline';
import { useEffect, useState } from 'react';

export default function LabelDetailView({ label, edit }) {
  const submit = useSubmit();
  const navigate = useNavigate();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [searchParams] = useSearchParams();
  useEffect(() => setConfirmDelete(false), [searchParams]);

  const deleteLabel = () => {
    submit(null, {
      method: 'delete',
      action: `/labels?id=${label.id}`,
    });
  };

  const subtitle =
    label.dataType.slice(0, 1).toUpperCase() +
    label.dataType.slice(1) +
    ' label';

  return (
    <>
      {edit ? (
        <EditLabelInline label={label} />
      ) : (
        <div className='label-details-header'>
          <h1 className='ldh-title'>{label.name}</h1>
          <p className='ldh-datatype'>{subtitle}</p>

          <button
            type='button'
            className='icon ldh-edit-toggle'
            onClick={() => navigate(`/labels?id=${label.id}&edit=true`)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </div>
      )}

      {label.SheetLabels.map(sa => (
        <ValueTile key={sa.id} sheet={sa} />
      ))}

      <div className='label-detail-bottom'>
        {confirmDelete ? (
          <>
            <p>
              Are you sure you want to delete this label? It will be removed
              from all associated sheets.
            </p>
            <div>
              <button
                onClick={e => {
                  e.stopPropagation();
                  deleteLabel();
                }}
                className='delete-label-button grayed-out'
              >
                Confirm Delete
              </button>
              <button onClick={() => setConfirmDelete(false)}>
                Never Mind
              </button>
            </div>
          </>
        ) : (
          <button
            type='button'
            onClick={() => setConfirmDelete(true)}
            className='delete-label-button grayed-out'
          >
            Delete Label
          </button>
        )}
      </div>
    </>
  );
}
