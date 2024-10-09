import { useEffect, useRef, useState } from 'react';
import { useActionData, useSubmit } from 'react-router-dom';
import dictionary from '../SheetsPage/dictionary';

export default function LabelFormView() {
  const [name, setName] = useState('');
  const [dataType, setDataType] = useState('number');

  const submit = useSubmit();
  const data = useActionData();
  const [submitted, setSubmitted] = useState(false);

  const nameInputRef = useRef();

  useEffect(() => {
    nameInputRef.current.focus();
  }, [data]);

  const errors = submitted ? data?.errors : {};

  const handleSubmit = e => {
    e.preventDefault();
    submit({ name, dataType }, { method: 'POST', encType: 'application/json' });
    setSubmitted(true);
  };

  return (
    <form className='create-label-form' onSubmit={handleSubmit}>
      <h1>Create a Label</h1>

      <div className='clf-inputs'>
        <input
          placeholder='Label Name'
          value={name}
          onChange={e => setName(e.target.value)}
          ref={nameInputRef}
        />
        <select value={dataType} onChange={e => setDataType(e.target.value)}>
          <option value='number'>Number</option>
          <option value='string'>String</option>
          <option value='boolean'>Boolean</option>
        </select>
      </div>
      <p className='error'>{submit && errors?.name}</p>

      <div className='clf-dictionary'>{dictionary[dataType]}</div>

      <button type='submit' className='clf-submit'>
        Create Label
      </button>
    </form>
  );
}
