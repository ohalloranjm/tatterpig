import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useActionData, useSubmit } from 'react-router-dom';

export default function SheetForm() {
  const user = useSelector(store => store.session.user);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [makePublic, setMakePublic] = useState(false);

  const submit = useSubmit();
  const { errors } = useActionData() ?? {};

  if (!user) throw Error('Only logged-in users may access this page.');

  const handleSubmit = e => {
    e.preventDefault();
    const body = { name, public: makePublic };
    if (description) body.description = description;
    submit(body, { method: 'post', encType: 'application/json' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder='Sheet Name'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <p className='error'>{errors?.name}</p>

      <textarea
        placeholder='Description'
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <p className='error'>{errors?.description}</p>

      <label>
        <input
          type='checkbox'
          checked={makePublic}
          onChange={() => setMakePublic(prev => !prev)}
        />
        Public
      </label>
      <p className='error'>{errors?.public}</p>

      <button type='submit'>Create Sheet</button>
    </form>
  );
}
