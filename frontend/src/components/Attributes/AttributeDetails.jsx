import { useNavigate, useSubmit } from 'react-router-dom';
import AttributeSheetTile from './AttributeSheetTile';
import { useAttributeSelection } from './context';

export default function AttributeDetailsPage({ attribute }) {
  const submit = useSubmit();
  const navigate = useNavigate();
  const { display } = useAttributeSelection();

  const deleteAttribute = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this attribute? It will be removed from all associated sheets.'
    );
    if (confirmDelete) {
      submit(null, { method: 'delete', action: `/attributes/${attribute.id}` });
      display()();
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
            <AttributeSheetTile key={sa.id} sheet={sa} />
          ))}
        </>
      ) : null}

      <button type='button' onClick={() => navigate('edit')}>
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
