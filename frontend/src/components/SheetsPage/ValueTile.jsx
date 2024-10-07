import { useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useSearchParams,
  useSubmit,
} from 'react-router-dom';

export default function SheetLabelTile({ label }) {
  const submit = useSubmit();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(label.value ?? '');
  const [searchParams] = useSearchParams();

  const { sheetId, labelId } = label;

  useEffect(() => {
    if (
      searchParams.get('edit') === 'label' &&
      Number(searchParams.get('labelId')) === labelId
    ) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [labelId, searchParams]);

  const action = `/sheets?id=${sheetId}&labelId=${labelId}`;
  const { dataType } = label;
  const isBoolean = dataType === 'boolean';

  const removeLabel = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to remove the ${label.name} label from this sheet?`
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
    const newValue = label.value === 'true' ? false : true;
    submit(
      { value: newValue },
      { action, method: 'PUT', encType: 'application/json' }
    );
  };

  return (
    <div>
      <p>
        <Link to={`/labels?id=${label.labelId}`}>{label.name}</Link>
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
          <p>{label.value}</p>
          <button type='button' onClick={changeBooleanValue}>
            change
          </button>
        </>
      )}

      {!edit && !isBoolean && (
        <>
          <p>{label.value}</p>
          <button
            type='button'
            onClick={() =>
              navigate(`/sheets?id=${sheetId}&edit=label&labelId=${labelId}`)
            }
          >
            Edit
          </button>
        </>
      )}

      <button type='button' onClick={removeLabel}>
        Remove Label
      </button>
    </div>
  );
}
