import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
} from 'react-router-dom';

export default function AttributeForm({ edit }) {
  const user = useSelector(store => store.session.user);

  const [name, setName] = useState('');
  const [dataType, setDataType] = useState('number');

  const submit = useSubmit();
  const navigate = useNavigate();
  const { errors } = useActionData() ?? {};
  const { attribute } = useLoaderData() ?? {};

  useEffect(() => {
    if (attribute) {
      setName(attribute.name);
      setDataType(attribute.dataType);
    }
  }, [attribute]);

  if (!user) throw Error('You must be logged in to access this page.');
  if (edit && attribute?.ownerId !== user.id) {
    throw Error('You do not have permission to edit this attribute.');
  }

  const post = e => {
    e.preventDefault();
    submit({ name, dataType }, { method: 'POST', encType: 'application/json' });
  };

  const put = e => {
    e.preventDefault();

    if (dataType !== attribute.dataType) {
      const confirmChange = window.confirm(
        "Are you sure you want to change the data type of this attribute? Doing so will erase reset the attribute's value on every associated sheet."
      );
      if (!confirmChange) return setDataType(attribute.dataType);
    }

    submit({ name, dataType }, { method: 'PUT', encType: 'application/json' });
  };

  return (
    <>
      <h1>{edit ? 'Update' : 'Create a New'} Attribute</h1>
      <form onSubmit={edit ? put : post}>
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
        <button type='submit'>{edit ? 'Update' : 'Create'} Attribute</button>
        {edit ? (
          <button
            type='button'
            onClick={() => navigate(`/attributes/${attribute.id}`)}
          >
            Cancel
          </button>
        ) : null}
      </form>
    </>
  );
}
