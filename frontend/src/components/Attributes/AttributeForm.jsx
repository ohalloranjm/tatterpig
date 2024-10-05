import { useEffect, useState } from 'react';
import { useActionData, useSubmit } from 'react-router-dom';
import { useModal } from '../../context/Modal';

export default function AttributeForm() {
  const [name, setName] = useState('');
  const [dataType, setDataType] = useState('number');

  const submit = useSubmit();
  const { closeModal } = useModal();

  const { errors } = useActionData() ?? {};
  const [submitted, setSubmitted] = useState(false);

  // useEffect(() => {
  //   if (submitted && !errors) {
  //     // closeModal();
  //   }
  // });

  const post = e => {
    e.preventDefault();
    submit({ name, dataType }, { method: 'POST', encType: 'application/json' });
    // setSubmitted(true);
  };

  return (
    <>
      <h2>Create an Attribute</h2>

      <form onSubmit={post}>
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

        <button type='submit'>Create Attribute</button>
      </form>
    </>
  );
}
