import { useLoaderData } from 'react-router-dom';
import AttributeTile from './AttributeTile';
import AttributeForm from './AttributeForm';
import { useEffect, useState } from 'react';

export default function Attributes() {
  const { attributes } = useLoaderData();
  const [create, setCreate] = useState(false);

  useEffect(() => {
    setCreate(false);
  }, [attributes.length]);

  return (
    <>
      <h1>My Attributes</h1>
      <button onClick={() => setCreate(prev => !prev)}>Make a New One</button>
      {create && <AttributeForm />}
      {attributes.map(a => (
        <AttributeTile key={a.id} attribute={a} />
      ))}
    </>
  );
}
