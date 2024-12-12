import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useActionData, useLoaderData, useSubmit } from 'react-router-dom';

export default function ValueForm({ sheet }) {
  const { labels } = useLoaderData()[1];
  const submit = useSubmit();
  const { errors } = useActionData() ?? {};

  // controlled label name input
  const [labelName, setLabelName] = useState('');

  const [selectedLabel, setSelectedLabel] = useState('');
  const [newLabel, setNewLabel] = useState(false);
  const [newDataType, setNewDataType] = useState(null);

  const [numberValue, setNumberValue] = useState('');
  const [stringValue, setStringValue] = useState('');

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
    newDataType || validChoices.find(vc => vc.id === +selectedLabel)?.dataType;

  const handleSubmit = e => {
    e.preventDefault();

    const lookup = {
      string: stringValue || null,
      number: numberValue === '' ? null : numberValue,
      boolean: true,
    };

    const body = {
      labelId: +selectedLabel,
      value: lookup[dataType],
    };

    if (body.value === null) delete body.value;

    submit(body, {
      method: 'post',
      encType: 'application/json',
      action: `/sheets?id=${sheet.id}&add=label`,
    });
  };

  return (
    <form className='sd-add-label' onSubmit={handleSubmit}>
      {(!selectedLabel && !newLabel && (
        <>
          <div className='sdal-name-line'>
            <input
              placeholder='Label name'
              value={labelName}
              onChange={e => setLabelName(e.target.value)}
            />
            <button
              type='button'
              onClick={() => {
                setNewLabel(true);
                setNewDataType('number');
              }}
            >
              New Label
            </button>
          </div>
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
        </>
      )) || (
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
      )}

      {newLabel && (
        <>
          <div className='sdal-select-data-type'>
            <select
              value={newDataType}
              onChange={e => setNewDataType(e.target.value)}
            >
              {['number', 'string', 'boolean'].map(dt => (
                <option key={dt} value={dt}>
                  {dt}
                </option>
              ))}
            </select>
          </div>
        </>
      )}

      {!!selectedLabel && (
        <>
          {dataType === 'number' && (
            <input
              placeholder='Number Value'
              type='number'
              value={numberValue}
              onChange={e => setNumberValue(e.target.value)}
              className='sdal-value'
              ref={valueInputRef}
            />
          )}
          {dataType === 'string' && (
            <input
              placeholder='Text Value'
              value={stringValue}
              onChange={e => setStringValue(e.target.value)}
              className='sdal-value'
              ref={valueInputRef}
            />
          )}
          {dataType === 'boolean' && (
            <p className='sdal-value sdal-value-boolean'>(boolean)</p>
          )}

          <button
            type='submit'
            className='icon sdal-submit'
            disabled={!selectedLabel}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>

          <p className='error sdal-errors'>{errors?.value}</p>
        </>
      )}
    </form>
  );
}
