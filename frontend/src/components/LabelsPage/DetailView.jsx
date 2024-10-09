import { useNavigate, useSubmit } from 'react-router-dom';
import ValueTile from './ValueTile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import EditLabelInline from './EditLabelInline';

export default function LabelDetailView({ label, edit }) {
  const submit = useSubmit();
  const navigate = useNavigate();

  const deleteLabel = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this label? It will be removed from all associated sheets.'
    );
    if (confirmDelete) {
      submit(null, {
        method: 'delete',
        action: `/labels?id=${label.id}`,
      });
    }
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
            <FontAwesomeIcon icon={faPencil} />
          </button>
        </div>
      )}

      {label.SheetLabels.map(sa => (
        <ValueTile key={sa.id} sheet={sa} />
      ))}

      <div className='label-detail-bottom-buttons'>
        <button
          type='button'
          className='delete-label-button grayed-out'
          onClick={e => {
            e.stopPropagation();
            deleteLabel();
          }}
        >
          Delete Label
        </button>
      </div>
    </>
  );
}
