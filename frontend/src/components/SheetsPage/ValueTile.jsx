import { useEffect, useRef, useState } from 'react';
import {
  Link,
  useNavigate,
  useSearchParams,
  useSubmit,
} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faX,
  faCheck,
  faPencil,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { faCircle, faCircleCheck } from '@fortawesome/free-regular-svg-icons';

export default function SheetLabelTile({ label }) {
  const submit = useSubmit();
  const navigate = useNavigate();
  const stringNumInputRef = useRef(null);
  const booleanInputRef = useRef(null);

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(label.value ?? '');
  const [searchParams] = useSearchParams();

  const [filledCircle, setFilledCircle] = useState(label.value === 'true');

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

  useEffect(() => {
    setFilledCircle(label.value === 'true');
  }, [setFilledCircle, label.value]);

  const booleanIcon = filledCircle ? faCircleCheck : faCircle;

  useEffect(() => {
    if (stringNumInputRef.current) stringNumInputRef.current.select();
  }, [stringNumInputRef, edit]);

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

  let svtNameClass = 'svt-name';
  if (isBoolean && label.value === 'false') svtNameClass += ' svt-name-false';

  {
    /* edit view for number and string values */
  }
  if (edit)
    return (
      <form className='sheet-value-tile' onSubmit={editValue}>
        <p className={svtNameClass}>
          <Link to={`/labels?id=${label.labelId}`}>{label.name}</Link>
        </p>

        <input
          type={dataType === 'number' ? 'number' : 'text'}
          value={value}
          className='svt-value'
          ref={stringNumInputRef}
          onChange={e => setValue(e.target.value)}
        />

        {/* confirm button */}
        <button type='submit' className='icon svt-button1'>
          <FontAwesomeIcon icon={faCheck} />
        </button>

        {/* cancel button */}
        <button
          type='button'
          onClick={() => navigate(`/sheets?id=${sheetId}`)}
          className='icon svt-button2'
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </form>
    );

  return (
    <div className='sheet-value-tile'>
      <p className={svtNameClass}>
        <Link to={`/labels?id=${label.labelId}`}>{label.name}</Link>
      </p>

      {/* static view for number and string values */}
      {!isBoolean && (
        <>
          <p
            className='svt-value'
            onDoubleClick={() =>
              navigate(`/sheets?id=${sheetId}&edit=label&labelId=${labelId}`)
            }
          >
            {label.value}
          </p>
          <button
            type='button'
            className='icon svt-button1'
            onClick={() =>
              navigate(`/sheets?id=${sheetId}&edit=label&labelId=${labelId}`)
            }
          >
            <FontAwesomeIcon icon={faPencil} />
          </button>
          <button
            type='button'
            className='icon svt-button2'
            onClick={removeLabel}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </>
      )}

      {/* dynamic view for boolean values */}
      {isBoolean && (
        <>
          <button
            type='button'
            className='boolean-icon svt-button1'
            ref={booleanInputRef}
            onClick={changeBooleanValue}
            onMouseEnter={() => setFilledCircle(label.value === 'false')}
            onMouseLeave={() => setFilledCircle(label.value === 'true')}
          >
            <FontAwesomeIcon icon={booleanIcon} />
          </button>

          <button
            type='button'
            className='icon svt-button2'
            onClick={removeLabel}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </>
      )}
    </div>
  );
}
