import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useActionData, useLoaderData, useSubmit } from 'react-router-dom';

export default function ValueForm() {
  const [{ sheet }, { attributes }] = useLoaderData();
  const submit = useSubmit();
  const { errors } = useActionData() ?? {};

  const [selectedAttribute, setSelectedAttribute] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [stringValue, setStringValue] = useState('');
  const [booleanValue, setBooleanValue] = useState(true);

  const user = useSelector(store => store.session.user);
  if (user.id !== sheet.ownerId) {
    throw Error('You do not have access to this page.');
  }

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

    submit(body, { method: 'post', encType: 'application/json' });
  };

  return (
    <>
      <h1>Add an Attribute to {sheet.name}</h1>
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
      </form>
    </>
  );
}
