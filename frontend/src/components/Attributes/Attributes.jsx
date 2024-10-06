import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import AttributeTile from './AttributeTile';
import AttributeForm from './AttributeForm';
import { useEffect, useState } from 'react';
import './Attributes.css';
import AttributeDetailsPage from './AttributeDetails';

export default function Landing() {
  const { attributes } = useLoaderData();
  const [searchParams] = useSearchParams();
  const [mainContent, setMainContent] = useState(null);

  // context to track which element is open
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.has('id')) {
      const attributeId = Number(searchParams.get('id'));
      const attribute = attributes.find(a => a.id === attributeId);
      if (searchParams.get('edit') === 'true') {
        setMainContent(<AttributeForm attribute={attribute} />);
      } else {
        setMainContent(<AttributeDetailsPage attribute={attribute} />);
      }
    } else if (searchParams.get('new') === 'true') {
      setMainContent(<AttributeForm />);
    } else {
      setMainContent(null);
    }
  }, [searchParams, attributes]);

  return (
    <div className='attributes'>
      <h1 className='attributes-title'>My Attributes</h1>

      <div className='attributes-list'>
        <button
          onClick={() => {
            if (searchParams.get('new') === 'true') {
              navigate('/attributes');
            } else {
              navigate('/attributes?new=true');
            }
          }}
        >
          {searchParams.get('new') === 'true'
            ? 'Cancel'
            : 'Create a New Attribute'}
        </button>
        {attributes.map(a => (
          <AttributeTile key={a.id} attribute={a} />
        ))}
      </div>
      <div className='attributes-panel'>{mainContent}</div>
    </div>
  );
}
