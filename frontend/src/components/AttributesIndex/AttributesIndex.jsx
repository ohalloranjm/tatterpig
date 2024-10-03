import { useLoaderData } from 'react-router-dom';
import AttributeTile from './AttributeTile';

export default function AttributesIndex() {
  const { attributes } = useLoaderData();
  return (
    <>
      <h1>My Attributes</h1>
      {attributes.map(a => (
        <AttributeTile key={a.id} attribute={a} />
      ))}
    </>
  );
}
