import { useNavigate, useSubmit } from 'react-router-dom';
import ValueTile from './ValueTile';

export default function LabelDetailView({ label }) {
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
      <div className='label-details-header'>
        <h1 className='ldh-title'>{label.name}</h1>
        <p className='ldh-datatype'>{subtitle}</p>
      </div>
      {label.SheetLabels.length ? (
        <>
          <h2>Associated Sheets</h2>
          {label.SheetLabels.map(sa => (
            <ValueTile key={sa.id} sheet={sa} />
          ))}
        </>
      ) : null}

      <button
        type='button'
        onClick={() => navigate(`/labels?id=${label.id}&edit=true`)}
      >
        Edit
      </button>
      <button
        type='button'
        onClick={e => {
          e.stopPropagation();
          deleteLabel();
        }}
      >
        Delete
      </button>
    </>
  );
}
