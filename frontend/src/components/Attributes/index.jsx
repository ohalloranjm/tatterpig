import { useLoaderData } from 'react-router-dom';
import AttributeTile from './AttributeTile';
import AttributeForm from './AttributeForm';
import { useState } from 'react';
import OpenModalButton from '../OpenModalButton';

export default function Attributes() {
  const { attributes } = useLoaderData();
  const [create, setCreate] = useState(false);

  return (
    <>
      <h1>My Attributes</h1>
      {
        <OpenModalButton
          modalComponent={<AttributeForm />}
          buttonText={'clickAButton'}
        />
      }
      {attributes.map(a => (
        <AttributeTile key={a.id} attribute={a} />
      ))}
    </>
  );
}
