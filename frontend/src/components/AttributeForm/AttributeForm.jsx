import { useState } from 'react';
import { useActionData, useSubmit } from 'react-router-dom';

export default function AttributeForm() {
  const [name, setName] = useState('');
  const [dataType, setDataType] = useState('number');

  const submit = useSubmit();
  const { errors } = useActionData() ?? {};

  const post = e => {
    e.preventDefault();
    console.log(name, dataType);
    submit({ name, dataType }, { method: 'post', encType: 'application/json' });
  };

  return (
    <>
      <h1>Create a New Attribute</h1>
      <form onSubmit={post}>
        <input
          placeholder='Attribute Name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <p className='error'>{errors?.name}</p>
        <select value={dataType} onChange={e => setDataType(e.target.value)}>
          <option value='number'>Number</option>
          <option value='string'>String</option>
          <option value='boolean'>Boolean</option>
        </select>
        <button type='submit'>Create Attribute</button>
      </form>
    </>
  );
}
