import { useLoaderData } from 'react-router-dom';
import AttributeTile from './AttributeTile';
import AttributeForm from './AttributeForm';
import { useEffect, useState } from 'react';

export default function Attributes() {
  const { attributes } = useLoaderData();

  // state to determine whether Create New Attribute form is open
  const [create, setCreate] = useState(false);
  // close form whenever a new attribute is successfully added
  useEffect(() => {
    setCreate(false);
  }, [attributes.length]);

  return (
    <>
      <h1>My Attributes</h1>
      <button onClick={() => setCreate(prev => !prev)}>
        {create ? 'Cancel' : 'Create a New Attribute'}
      </button>
      {create && <AttributeForm />}
      {attributes.map(a => (
        <AttributeTile key={a.id} attribute={a} />
      ))}
    </>
  );
}
