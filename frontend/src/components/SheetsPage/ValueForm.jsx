import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { useActionData, useLoaderData, useSubmit } from 'react-router-dom';

export default function ValueForm({ sheet }) {
  const { labels } = useLoaderData()[1];
  const submit = useSubmit();
  const { errors } = useActionData() ?? {};

  const [selectedLabel, setSelectedLabel] = useState('');
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

  const { SheetLabels: invalidChoices } = sheet;
  const validChoices = labels.filter(
    a => !invalidChoices.some(ic => ic.labelId === a.id)
  );

  const dataType = validChoices.find(vc => vc.id === +selectedLabel)?.dataType;

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
      <select
        value={selectedLabel}
        ref={labelInputRef}
        onChange={e => {
          setSelectedLabel(e.target.value);
          setNumberValue('');
          setStringValue('');
        }}
        onKeyDown={e => {
          e.preventDefault();
          if (
            ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)
          ) {
            e.target.showPicker();
          }
        }}
      >
        <option value={0}>-</option>
        {validChoices.map(vc => (
          <option key={vc.id} value={vc.id}>
            {vc.name}
          </option>
        ))}
      </select>

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
