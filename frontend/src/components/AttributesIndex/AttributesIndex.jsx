import { Link, useLoaderData } from 'react-router-dom';
import AttributeTile from './AttributeTile';
import AttributeForm from '../AttributeForm/AttributeForm';
import { useState } from 'react';

export default function AttributesIndex() {
  const { attributes } = useLoaderData();
  const [create, setCreate] = useState(false);

  return (
    <>
      <h1>My Attributes</h1>
      <button onClick={() => setCreate(prev => !prev)}>
        {create ? 'Cancel' : 'Create a New Attribute'}
      </button>
      {create && <AttributeForm edit={false} />}
      {attributes.map(a => (
        <AttributeTile key={a.id} attribute={a} />
      ))}
    </>
  );
}
