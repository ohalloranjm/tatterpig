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

  // filter out labels already attached to the sheet
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
      {!selectedLabel && (
        <>
          <div className='sdal-name-line'>
            <input
              placeholder='Label name'
              value={labelName}
              onChange={e => setLabelName(e.target.value)}
            />
            <button type='button'>New Label</button>
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
                  onClick={() => setSelectedLabel(l.id)}
                  key={l.id}
                >
                  {l.name}
                </button>
              ))}
          </div>
        </>
      )}

      {!!selectedLabel && (
        <>
          <div className='sdal-locked-name-line'>
            <button
              type='button'
              className='icon'
              onClick={() => setSelectedLabel('')}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <p>{validChoices.find(vc => vc.id === selectedLabel).name}</p>
          </div>
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
