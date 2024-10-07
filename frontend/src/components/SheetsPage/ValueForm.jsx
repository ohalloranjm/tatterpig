import { useState } from 'react';
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
} from 'react-router-dom';

export default function ValueForm({ sheet }) {
  const { attributes } = useLoaderData()[1];
  const submit = useSubmit();
  const { errors } = useActionData() ?? {};
  const navigate = useNavigate();

  const [selectedAttribute, setSelectedAttribute] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [stringValue, setStringValue] = useState('');
  const [booleanValue, setBooleanValue] = useState(true);

  const { SheetAttributes: invalidChoices } = sheet;
  const validChoices = attributes.filter(
    a => !invalidChoices.some(ic => ic.attributeId === a.id)
  );

  const dataType = validChoices.find(
    vc => vc.id === +selectedAttribute
  )?.dataType;

  const handleSubmit = e => {
    e.preventDefault();

    const lookup = {
      string: stringValue || null,
      number: numberValue === '' ? null : numberValue,
      boolean: booleanValue,
    };

    const body = {
      attributeId: +selectedAttribute,
      value: lookup[dataType],
    };

    if (body.value === null) delete body.value;

    submit(body, {
      method: 'post',
      encType: 'application/json',
      action: `/sheets?id=${sheet.id}&add=attribute`,
    });
  };

  return (
    <>
      <h3>Add Attribute</h3>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedAttribute}
          onChange={e => {
            setSelectedAttribute(e.target.value);
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

        {selectedAttribute ? (
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

        <button type='submit' disabled={!selectedAttribute}>
          Add Attribute
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
