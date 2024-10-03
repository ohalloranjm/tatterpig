import { useLoaderData, useNavigate, useSubmit } from 'react-router-dom';
import SheetAttributeTile from './SheetAttributeTile';
import { useSelector } from 'react-redux';

export default function SheetDetailsPage() {
  const { sheet } = useLoaderData();
  const submit = useSubmit();
  const navigate = useNavigate();

  const user = useSelector(store => store.session.user);
  const isOwner = user?.id === sheet.ownerId;

  const deleteSheet = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this sheet?'
    );
    if (confirmDelete) submit(null, { method: 'delete' });
  };

  return (
    <>
      <h1>{sheet.name}</h1>
      <p>{sheet.description}</p>
      {sheet.SheetAttributes.map(a => (
        <SheetAttributeTile key={a.id} attribute={a} />
      ))}
      {isOwner && (
        <>
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
      )}
    </>
  );
}
