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
  faArrowUp,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';
import { faCircle, faCircleCheck } from '@fortawesome/free-regular-svg-icons';

export default function SheetLabelTile({ label, order, aboveId, belowId }) {
  const submit = useSubmit();
  const navigate = useNavigate();
  const stringNumInputRef = useRef(null);
  const booleanInputRef = useRef(null);

  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState(label.value ?? '');
  const [searchParams] = useSearchParams();
  const [divClass, setDivClass] = useState('sheet-value-tile');

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

  const handleDragStart = e => {
    e.dataTransfer.setData('text/plain', `${labelId}`);
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragOver = e => {
    e.preventDefault();
    setDivClass('sheet-value-tile svt-dragover');
  };

  const handleDragLeave = e => {
    e.preventDefault();
    setDivClass('sheet-value-tile');
  };

  const handleDrop = e => {
    const movedId = Number(e.dataTransfer.getData('text/plain'));
    console.log(movedId);
    const newOrder = [];
    order.forEach(id => {
      if (id === labelId) newOrder.push(movedId);
      if (id !== movedId) newOrder.push(id);
    });
    submit(
      { order: newOrder },
      {
        action: `/sheets?sheetId=${sheetId}&reorder=true`,
        method: 'PUT',
        encType: 'application/json',
      }
    );

    setDivClass('sheet-value-tile');
  };

  const shiftUp = () => {
    if (aboveId === null) return;
    const newOrder = [...order];
    const i = order.indexOf(labelId);
    newOrder[i] = aboveId;
    newOrder[i - 1] = labelId;
    submit(
      { order: newOrder },
      {
        action: `/sheets?sheetId=${sheetId}&reorder=true`,
        method: 'PUT',
        encType: 'application/json',
      }
    );
  };

  const shiftDown = () => {
    if (belowId === null) return;
    const newOrder = [...order];
    const i = order.indexOf(labelId);
    newOrder[i] = belowId;
    newOrder[i + 1] = labelId;
    submit(
      { order: newOrder },
      {
        action: `/sheets?sheetId=${sheetId}&reorder=true`,
        method: 'PUT',
        encType: 'application/json',
      }
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

  const positionButtons = (
    <>
      {!!aboveId && (
        <button
          className='icon svt-button3'
          type='button'
          onClick={shiftUp}
          disabled={searchParams.has('edit')}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
      {!!belowId && (
        <button
          className='icon svt-button4'
          type='button'
          onClick={shiftDown}
          disabled={searchParams.has('edit')}
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      )}
    </>
  );

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

        {/* up and down buttons, should be disabled */}
        {positionButtons}
      </form>
    );

  return (
    <div
      className={divClass}
      draggable={true}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
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
      {positionButtons}
    </div>
  );
}
