import { useEffect, useState } from 'react';
import { useActionData, useSearchParams, useSubmit } from 'react-router-dom';

export default function LabelFormView({ label }) {
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
    } else if (label) {
      setName(label.name);
      setDataType(label.dataType);
    } else {
      setName('');
      setDataType('number');
    }
  }, [label, searchParams]);

  const errors = submitted ? data?.errors : {};

  const post = e => {
    e.preventDefault();
    submit({ name, dataType }, { method: 'POST', encType: 'application/json' });
    setSubmitted(true);
  };

  const put = e => {
    e.preventDefault();

    if (dataType !== label.dataType) {
      const confirmChange = window.confirm(
        "Are you sure you want to change the data type of this label? Doing so will reset the label's value on every associated sheet."
      );
      if (!confirmChange) return setDataType(label.dataType);
    }
    submit(
      { name, dataType },
      {
        method: 'PUT',
        encType: 'application/json',
        action: `/labels?id=${label.id}&edit=true&name=${name}&datatype=${dataType}`,
      }
    );
    setSubmitted(true);
  };

  return (
    <div>
      <h2>{label ? `Editing ${label.name}` : 'Create an Label'}</h2>

      <form onSubmit={label ? put : post}>
        <input
          placeholder='Label Name'
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
          {label ? 'Confirm Changes' : 'Create Label'}
        </button>
      </form>
    </div>
  );
}
