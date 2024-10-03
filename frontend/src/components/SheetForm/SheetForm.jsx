import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActionData, useLoaderData, useSubmit } from 'react-router-dom';

export default function SheetForm(params) {
  const user = useSelector(store => store.session.user);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [makePublic, setMakePublic] = useState(false);

  const submit = useSubmit();
  const { errors } = useActionData() ?? {};
  const { sheet } = useLoaderData() ?? {};

  useEffect(() => {
    if (sheet) {
      setName(sheet.name);
      setDescription(sheet.description ?? '');
      setMakePublic(sheet.public);
    }
  }, []);

  const { edit } = params;

  if (!user) throw Error('You must be logged in to access this page.');
  if (edit && sheet?.ownerId !== user.id)
    throw Error('You do not have permission to edit this sheet.');

  const post = e => {
    e.preventDefault();
    const body = { name, public: makePublic };
    if (description) body.description = description;
    submit(body, { method: 'post', encType: 'application/json' });
  };

  const put = e => {
    e.preventDefault();
    const body = { name, public: makePublic, description: description || null };
    submit(body, { method: 'put', encType: 'application/json' });
  };

  return (
    <form onSubmit={edit ? put : post}>
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

      <button type='submit'>{edit ? 'Update' : 'Create'} Sheet</button>
    </form>
  );
}
