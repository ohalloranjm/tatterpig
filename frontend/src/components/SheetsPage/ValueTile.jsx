import { useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useSearchParams,
  useSubmit,
} from 'react-router-dom';

export default function SheetAttributeTile({ attribute }) {
  const submit = useSubmit();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(attribute.value ?? '');
  const [searchParams] = useSearchParams();

  const { sheetId, attributeId } = attribute;

  useEffect(() => {
    if (
      searchParams.get('edit') === 'attribute' &&
      Number(searchParams.get('attributeId')) === attributeId
    ) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [attributeId, searchParams]);

  const action = `/sheets?id=${sheetId}&attributeId=${attributeId}`;
  const { dataType } = attribute;
  const isBoolean = dataType === 'boolean';

  const removeAttribute = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to remove the ${attribute.name} attribute from this sheet?`
    );
    if (confirmDelete) submit(null, { method: 'DELETE', action });
  };

  const editValue = e => {
    e.preventDefault();
    if (isBoolean) return;
    submit(
      { value: value || null },
      { action, method: 'PUT', encType: 'application/json' }
    );
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
        <Link to={`/attributes?id=${attribute.attributeId}`}>
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
          <button
            type='button'
            onClick={() => navigate(`/sheets?id=${sheetId}`)}
          >
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
          <button
            type='button'
            onClick={() =>
              navigate(
                `/sheets?id=${sheetId}&edit=attribute&attributeId=${attributeId}`
              )
            }
          >
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
