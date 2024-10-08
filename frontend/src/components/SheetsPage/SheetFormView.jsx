import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import {
  useActionData,
  useNavigate,
  useSearchParams,
  useSubmit,
} from 'react-router-dom';

export default function SheetFormView({ sheet }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const submit = useSubmit();
  const data = useActionData();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [searchParams] = useSearchParams();
  const nameInputRef = useRef(null);
  const descriptionInputRef = useRef(null);

  useEffect(() => {
    const paramsName = searchParams.has('name');
    const paramsDescription = searchParams.has('description');

    if (paramsName || paramsDescription) {
      if (paramsName) setName(searchParams.get('name'));
      if (paramsDescription) setDescription(searchParams.get('description'));
    } else if (sheet) {
      setName(sheet.name);
      setDescription(sheet.description ?? '');
    } else {
      setName('');
      setDescription('');
    }
  }, [sheet, searchParams]);

  const errors = submitted ? data?.errors : {};

  useEffect(() => {
    if (sheet) descriptionInputRef.current.focus();
    else nameInputRef.current.focus();
  }, [sheet]);

  const post = e => {
    e.preventDefault();
    const body = { name };
    if (description) body.description = description;
    submit(body, { method: 'POST', encType: 'application/json' });
    setSubmitted(true);
  };

  const put = e => {
    e.preventDefault();
    const body = {
      name,
      public: sheet.public,
      description: description || null,
    };
    submit(body, {
      method: 'PUT',
      encType: 'application/json',
      action: `/sheets?id=${
        sheet.id
      }&edit=${true}&name=${name}&description=${description}`,
    });
    setSubmitted(true);
  };

  return (
    <div>
      <form
        className={sheet ? 'sheet-details-header' : 'create-sheet-form'}
        onSubmit={sheet ? put : post}
      >
        {!sheet && <h1 className='create-sheet-title'>Create a New Sheet</h1>}

        <div className='sdh-title'>
          <input
            placeholder='Sheet Name'
            value={name}
            ref={nameInputRef}
            className={sheet ? 'sdh-edit-name' : null}
            onChange={e => setName(e.target.value)}
          />
          <p className='error sheet-detail-error'>{errors?.name}</p>
        </div>

        <div className='sdh-description'>
          <textarea
            placeholder='Description'
            value={description}
            ref={descriptionInputRef}
            onChange={e => setDescription(e.target.value)}
          />
          <p className='error sheet-detail-error'>{errors?.description}</p>
        </div>
        {sheet ? (
          <>
            <button type='submit' className='icon sdh-confirm-edit'>
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button
              type='button'
              className='icon sdh-cancel-edit'
              onClick={() => navigate(`/sheets?id=${sheet.id}`)}
            >
              <FontAwesomeIcon icon={faX} />
            </button>
          </>
        ) : (
          <>
            <button className='create-sheet-submit-button' type='submit'>
              Create Sheet
            </button>
            <button
              type='button'
              className='grayed-out'
              onClick={() => navigate(`/sheets`)}
            >
              Cancel
            </button>
          </>
        )}
      </form>
    </div>
  );
}
