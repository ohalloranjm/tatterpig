import { useNavigate, useSubmit } from 'react-router-dom';
import ValueTile from './ValueTile';

export default function AttributeDetailView({ attribute }) {
  const submit = useSubmit();
  const navigate = useNavigate();

  const deleteAttribute = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this attribute? It will be removed from all associated sheets.'
    );
    if (confirmDelete) {
      submit(null, {
        method: 'delete',
        action: `/attributes?id=${attribute.id}`,
      });
    }
  };

  return (
    <>
      <h1>{attribute.name}</h1>
      <p>Type: {attribute.dataType}</p>
      {attribute.SheetAttributes.length ? (
        <>
          <h2>Associated Sheets</h2>
          {attribute.SheetAttributes.map(sa => (
            <ValueTile key={sa.id} sheet={sa} />
          ))}
        </>
      ) : null}

      <button
        type='button'
        onClick={() => navigate(`/attributes?id=${attribute.id}&edit=true`)}
      >
        Edit
      </button>
      <button
        type='button'
        onClick={e => {
          e.stopPropagation();
          deleteAttribute();
        }}
      >
        Delete
      </button>
    </>
  );
}
