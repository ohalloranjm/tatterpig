import { useState } from 'react';
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
} from 'react-router-dom';

export default function ValueForm({ sheet }) {
  const { labels } = useLoaderData()[1];
  const submit = useSubmit();
  const { errors } = useActionData() ?? {};
  const navigate = useNavigate();

  const [selectedLabel, setSelectedLabel] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [stringValue, setStringValue] = useState('');
  const [booleanValue, setBooleanValue] = useState(true);

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
      boolean: booleanValue,
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
    <>
      <h3>Add Label</h3>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedLabel}
          onChange={e => {
            setSelectedLabel(e.target.value);
            setNumberValue('');
            setStringValue('');
            setBooleanValue(true);
          }}
        >
          <option value={0}>-</option>
          {validChoices.map(vc => (
            <option key={vc.id} value={vc.id}>
              {vc.name}
            </option>
          ))}
        </select>

        {selectedLabel ? (
          <>
            <label>
              {dataType}:{' '}
              {dataType === 'number' ? (
                <input
                  placeholder='Number Value'
                  type='number'
                  value={numberValue}
                  onChange={e => setNumberValue(e.target.value)}
                />
              ) : null}
              {dataType === 'boolean' ? (
                <input
                  type='checkbox'
                  checked={booleanValue}
                  onChange={() => setBooleanValue(prev => !prev)}
                />
              ) : null}
              {dataType === 'string' ? (
                <input
                  placeholder='Text Value'
                  value={stringValue}
                  onChange={e => setStringValue(e.target.value)}
                />
              ) : null}
            </label>
            <p className='error'>{errors?.value}</p>
          </>
        ) : null}

        <button type='submit' disabled={!selectedLabel}>
          Add Label
        </button>
        <button
          type='button'
          onClick={() => navigate(`/sheets?id=${sheet.id}`)}
        >
          Cancel
        </button>
      </form>
    </>
  );
}
