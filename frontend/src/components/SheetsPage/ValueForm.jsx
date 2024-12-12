import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useActionData, useLoaderData, useSubmit } from 'react-router-dom';
import dictionary from './dictionary';

export default function ValueForm({ sheet }) {
  const submit = useSubmit();

  // extant labels loaded from backend
  const { labels } = useLoaderData()[1];

  // errors returned by backend
  const { errors } = useActionData() ?? {};

  // true to create a new label, not just use an existing one
  const [newLabel, setNewLabel] = useState(false);

  // controlled inputs
  const [labelName, setLabelName] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');
  const [newDataType, setNewDataType] = useState(null);
  const [numberValue, setNumberValue] = useState('');
  const [stringValue, setStringValue] = useState('');

  // auto-focus
  const labelInputRef = useRef(null);
  const valueInputRef = useRef(null);
  useEffect(() => {
    let toFocus;
    if (selectedLabel && valueInputRef.current) toFocus = valueInputRef;
    else if (!selectedLabel && labelInputRef.current) toFocus = labelInputRef;
    if (toFocus) toFocus.current.focus();
  }, [selectedLabel]);

  // filter out labels already associated with the sheet
  const { SheetLabels: invalidChoices } = sheet;
  const validChoices = labels.filter(
    a => !invalidChoices.some(ic => ic.labelId === a.id)
  );

  // identify data type of selected label, if any
  const dataType =
    (newLabel && newDataType) ||
    validChoices.find(vc => vc.id === +selectedLabel)?.dataType;

  // runs when form is submitted
  const handleSubmit = e => {
    e.preventDefault();

    // construct body
    const value = {
      string: stringValue || null,
      number: numberValue === '' ? null : numberValue,
      boolean: true,
    }[dataType];
    const body = value === null ? {} : { value };
    if (newLabel) {
      body.name = labelName;
      body.dataType = dataType;
    } else {
      body.labelId = +selectedLabel;
    }

    // construct frontend api route
    let action = `/sheets?id=${sheet.id}&add=label&newLabel=${newLabel}`;

    // submit
    submit(body, {
      method: 'post',
      encType: 'application/json',
      action,
    });
  };

  // configure name and value fields for the first line of the form
  const nameField = selectedLabel ? (
    <div>{validChoices.find(vc => vc.id === selectedLabel)}</div>
  ) : (
    <input
      placeholder='Label name'
      className='sdal-name-field'
      value={labelName}
      onChange={e => setLabelName(e.target.value)}
    />
  );

  let valueField = <input placeholder='Value' disabled={true} />;
  if (dataType === 'boolean') {
    valueField = <div>Defaults to boolean</div>;
  } else if (newLabel || selectedLabel) {
    valueField = (
      <input
        placeholder={dataType === 'number' ? 'Number Value' : 'Text Value'}
        type={dataType === 'number' ? 'number' : 'text'}
        value={dataType === 'number' ? numberValue : stringValue}
        onChange={e =>
          (dataType === 'number' ? setNumberValue : setStringValue)(
            e.target.value
          )
        }
        className='sdal-value'
        ref={valueInputRef}
      />
    );
  }

  return (
    <form className='sd-add-label' onSubmit={handleSubmit}>
      <div className='sdal-name-line'>
        <div>
          {/* display back button for newLabel view */}
          {newLabel && (
            <button
              type='button'
              className='icon'
              onClick={() => {
                setSelectedLabel('');
                setNewLabel(false);
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          )}

          {nameField}

          {valueField}
        </div>

        {/* New Label button, if clicked opens options for creating a new label */}
        {/* {newLabel && ? (
          <>
            <select
              value={newDataType}
              onChange={e => setNewDataType(e.target.value)}
            >
              {['number', 'string', 'boolean'].map(dt => (
                <option key={dt} value={dt}>
                  {dt.slice(0, 1).toUpperCase() + dt.slice(1)}
                </option>
              ))}
            </select>
          </>
        ) : (
          <button
            type='button'
            onClick={() => {
              setNewLabel(true);
              setNewDataType('number');
            }}
            disabled={!!selectedLabel}
          >
            New Label
          </button>
        )} */}
      </div>

      {/* if New Label is not clicked, display filtered list of labels */}
      {!newLabel && !selectedLabel && (
        <div className='sdal-name-prompts'>
          {validChoices
            .filter(vc =>
              vc.name.toLowerCase().includes(labelName.toLowerCase())
            )
            .map(l => (
              <button
                type='button'
                className='sdal-name-prompt'
                onClick={() => {
                  setSelectedLabel(l.id);
                  setLabelName(validChoices.find(vc => vc.id === l.id).name);
                }}
                key={l.id}
              >
                {l.name}
              </button>
            ))}
        </div>
      )}

      {/* special display for confirming an existing label */}
      {/* {!!selectedLabel && (
        <>
          <div className='sdal-locked-name-line'>
            <button
              type='button'
              className='icon'
              onClick={() => {
                setSelectedLabel('');
                setNewLabel(false);
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <p>{labelName}</p>
          </div>
          {dataType === 'boolean' && (
            <p className='sdal-value sdal-value-boolean'>(boolean)</p>
          )}

          <p className='error sdal-errors'>{errors?.value}</p>
        </>
      )} */}

      {/* value input fields and submit button, show up if existing label or New Label is clicked */}
      {(!!selectedLabel || newLabel) && (
        <>
          <button type='submit' className='sdal-submit'>
            Submit
          </button>
        </>
      )}

      {newLabel && (
        <div className='sdal-dictionary'>{dictionary[dataType]}</div>
      )}
    </form>
  );
}
