import { useNavigate, useSubmit } from 'react-router-dom';
import ValueTile from './ValueTile';

export default function SheetDetailsView({ sheet }) {
  const submit = useSubmit();
  const navigate = useNavigate();

  const deleteSheet = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this sheet?'
    );
    //todo: fix delete
    if (confirmDelete) submit(null, { method: 'delete' });
  };

  return (
    <>
      <h1>{sheet.name}</h1>
      <p>{sheet.description}</p>
      {sheet.SheetAttributes.map(a => (
        <ValueTile key={a.id} attribute={a} />
      ))}
      <button type='button' onClick={() => navigate('attributes/add')}>
        Add an Attribute
      </button>
      <button type='button' onClick={() => navigate('edit')}>
        Edit Sheet
      </button>
      <button type='button' onClick={deleteSheet}>
        Delete Sheet
      </button>
    </>
  );
}
