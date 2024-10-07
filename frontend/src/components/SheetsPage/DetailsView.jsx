import { useNavigate, useSearchParams, useSubmit } from 'react-router-dom';
import ValueTile from './ValueTile';
import { useEffect, useState } from 'react';
import ValueForm from './ValueForm';

export default function SheetDetailsView({ sheet }) {
  const [searchParams] = useSearchParams();
  const [addValue, setAddValue] = useState(false);
  const submit = useSubmit();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('add') === 'attribute') {
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
    <>
      <h2>{sheet.name}</h2>
      <p>{sheet.description}</p>
      {sheet.SheetAttributes.map(a => (
        <ValueTile key={a.id} attribute={a} />
      ))}
      <button
        type='button'
        onClick={() => navigate(`/sheets?id=${sheet.id}&add=attribute`)}
      >
        Add an Attribute
      </button>
      <button
        type='button'
        onClick={() => navigate(`/sheets?id=${sheet.id}&edit=true`)}
      >
        Edit Sheet
      </button>
      <button type='button' onClick={deleteSheet}>
        Delete Sheet
      </button>
      {addValue && <ValueForm sheet={sheet} />}
    </>
  );
}
