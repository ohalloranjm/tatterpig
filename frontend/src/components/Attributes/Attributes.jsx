import { useLoaderData } from 'react-router-dom';
import AttributeTile from './AttributeTile';
import AttributeForm from './AttributeForm';
import { useEffect } from 'react';
import { useAttributeSelection } from './context';
import './Attributes.css';

export default function Landing() {
  const { attributes } = useLoaderData();

  // context to track which element is open
  const { content, contentId, display, toggle } = useAttributeSelection();

  // state to track whether the Create New Attribute form is open
  // close the form whenever a new attribute is successfully created
  useEffect(() => {
    if (contentId === 'create') display()();
  }, [attributes]);

  return (
    <div className='attributes'>
      <h1 className='attributes-title'>My Attributes</h1>

      <div className='attributes-list'>
        <button onClick={toggle(<AttributeForm />, 'create')}>
          {contentId === 'create' ? 'Cancel' : 'Create a New Attribute'}
        </button>
        {attributes.map(a => (
          <AttributeTile key={a.id} attribute={a} />
        ))}
      </div>
      <div className='attributes-panel'>{content}</div>
    </div>
  );
}
