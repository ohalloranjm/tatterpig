import { useState } from 'react';
import { Link, useSubmit } from 'react-router-dom';

export default function SheetAttributeTile({ attribute }) {
  const submit = useSubmit();
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(attribute.value ?? '');

  const action = `/sheets/${attribute.sheetId}/attributes/${attribute.attributeId}`;

  const removeAttribute = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to remove the ${attribute.name} attribute from this sheet?`
    );
    if (confirmDelete) submit(null, { action, method: 'DELETE' });
  };

  const editValue = e => {
    e.preventDefault();
    submit({ value: value || null }, { action, method: 'POST' });
    setEdit(false);
  };

  const { dataType } = attribute;
  const inputLookup = {
    number: (
      <input
        type='number'
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    ),
  };

  return (
    <div>
      <p>
        <Link to={`/attributes/${attribute.attributeId}`}>
          {attribute.name}
        </Link>
      </p>
      {edit ? (
        <form onSubmit={editValue}>
          <input
            type={dataType === 'number' ? 'number' : 'text'}
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button type='submit'>Confirm</button>
          <button type='button' onClick={() => setEdit(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <p>{attribute.value}</p>
          <button type='button' onClick={() => setEdit(true)}>
            Edit
          </button>
        </>
      )}
      <button type='button' onClick={removeAttribute}>
        Remove Attribute
      </button>
    </div>
  );
}
