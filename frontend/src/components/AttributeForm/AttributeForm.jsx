import { useState } from 'react';

export default function AttributeForm() {
  const [name, setName] = useState('');
  const [type, setType] = useState('number');

  const post = e => {
    e.preventDefault();
    console.log(name, type);
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
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value='number'>Number</option>
          <option value='string'>String</option>
          <option value='boolean'>Boolean</option>
        </select>
        <button type='submit'>Create Attribute</button>
      </form>
    </>
  );
}
