import { useEffect, useState } from 'react';
import { useActionData, useSearchParams, useSubmit } from 'react-router-dom';

export default function SheetFormView({ sheet }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [makePublic, setMakePublic] = useState(false);

  const submit = useSubmit();
  const data = useActionData();
  const [submitted, setSubmitted] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const paramsName = searchParams.has('name');
    const paramsDescription = searchParams.has('description');
    const paramsPublic = searchParams.has('public');

    if (paramsName || paramsDescription || paramsPublic) {
      if (paramsName) setName(searchParams.get('name'));
      if (paramsDescription) setDescription(searchParams.get('description'));
      if (paramsPublic) setMakePublic(searchParams.get('public') === 'true');
    } else if (sheet) {
      setName(sheet.name);
      setDescription(sheet.description ?? '');
      setMakePublic(sheet.public);
    } else {
      setName('');
      setDescription('');
      setMakePublic(false);
    }
  }, [sheet, searchParams]);

  const errors = submitted ? data?.errors : {};

  const post = e => {
    e.preventDefault();
    const body = { name, public: makePublic };
    if (description) body.description = description;
    submit(body, { method: 'POST', encType: 'application/json' });
    setSubmitted(true);
  };

  const put = e => {
    e.preventDefault();
    const body = { name, public: makePublic, description: description || null };
    submit(body, {
      method: 'PUT',
      encType: 'application/json',
      action: `/sheets?id=${
        sheet.id
      }&edit=${true}&name=${name}&description=${description}&public=${makePublic}`,
    });
    setSubmitted(true);
  };

  return (
    <div>
      <h2>{sheet ? `Editing ${sheet.name}` : 'Create a New Sheet'}</h2>
      <form onSubmit={sheet ? put : post}>
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

        <button type='submit'>
          {sheet ? 'Confirm Changes' : 'Create Sheet'}
        </button>
      </form>
    </div>
  );
}
