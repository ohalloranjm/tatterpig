import { useEffect, useState } from 'react';
import { useActionData, useSearchParams, useSubmit } from 'react-router-dom';

export default function AttributeFormView({ attribute }) {
  const [name, setName] = useState('');
  const [dataType, setDataType] = useState('number');

  const submit = useSubmit();
  const data = useActionData();
  const [submitted, setSubmitted] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const paramsName = searchParams.has('name');
    const paramsDataType = searchParams.has('datatype');
    if (paramsName || paramsDataType) {
      if (paramsName) setName(searchParams.get('name'));
      if (paramsDataType) setDataType(searchParams.get('datatype'));
    } else if (attribute) {
      setName(attribute.name);
      setDataType(attribute.dataType);
    } else {
      setName('');
      setDataType('number');
    }
  }, [attribute, searchParams]);

  const errors = submitted ? data?.errors : {};

  const post = e => {
    e.preventDefault();
    submit({ name, dataType }, { method: 'POST', encType: 'application/json' });
    setSubmitted(true);
  };

  const put = e => {
    e.preventDefault();

    if (dataType !== attribute.dataType) {
      const confirmChange = window.confirm(
        "Are you sure you want to change the data type of this attribute? Doing so will reset the attribute's value on every associated sheet."
      );
      if (!confirmChange) return setDataType(attribute.dataType);
    }
    submit(
      { name, dataType },
      {
        method: 'PUT',
        encType: 'application/json',
        action: `/attributes?id=${attribute.id}&edit=true&name=${name}&datatype=${dataType}`,
      }
    );
    setSubmitted(true);
  };

  return (
    <div>
      <h2>{attribute ? `Editing ${attribute.name}` : 'Create an Attribute'}</h2>

      <form onSubmit={attribute ? put : post}>
        <input
          placeholder='Attribute Name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <p className='error'>{submit && errors?.name}</p>

        <select value={dataType} onChange={e => setDataType(e.target.value)}>
          <option value='number'>Number</option>
          <option value='string'>String</option>
          <option value='boolean'>Boolean</option>
        </select>

        <button type='submit'>
          {attribute ? 'Confirm Changes' : 'Create Attribute'}
        </button>
      </form>
    </div>
  );
}
