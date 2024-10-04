import { useState } from 'react';
import { Link, useSubmit } from 'react-router-dom';

export default function SheetAttributeTile({ attribute }) {
  const submit = useSubmit();
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(attribute.value ?? '');

  const action = `/sheets/${attribute.sheetId}/attributes/${attribute.attributeId}`;
  const { dataType } = attribute;
  const isBoolean = dataType === 'boolean';

  const removeAttribute = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to remove the ${attribute.name} attribute from this sheet?`
    );
    if (confirmDelete) submit(null, { action, method: 'DELETE' });
  };

  const editValue = e => {
    e.preventDefault();
    submit(
      { value: value || null },
      { action, method: 'PUT', encType: 'application/json' }
    );
    setEdit(false);
  };

  const changeBooleanValue = () => {
    if (!isBoolean) return;
    const newValue = attribute.value === 'true' ? false : true;
    submit(
      { value: newValue },
      { action, method: 'PUT', encType: 'application/json' }
    );
  };

  return (
    <div>
      <p>
        <Link to={`/attributes/${attribute.attributeId}`}>
          {attribute.name}
        </Link>
      </p>
      {edit && (
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
      )}

      {isBoolean && (
        <>
          <p>{attribute.value}</p>
          <button type='button' onClick={changeBooleanValue}>
            change
          </button>
        </>
      )}

      {!edit && !isBoolean && (
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
